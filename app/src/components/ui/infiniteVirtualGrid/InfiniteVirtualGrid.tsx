import { useLocalizedStaticData } from "@/hooks/useLocalizedStaticData";
import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";

interface GridColumns {
  sm?: number; // <= 740px
  md?: number; // <= 1200px
  lg?: number; // > 1200px
}

interface ResponsiveGap {
  sm?: number; // <= 740px
  md?: number; // <= 1200px
  lg?: number; // > 1200px
}

interface ResponsiveHeight {
  sm?: number; // <= 740px
  md?: number; // <= 1200px
  lg?: number; // > 1200px
}

interface ResponsiveAspectRatio {
  sm?: number; // <= 740px (например, 16/9)
  md?: number; // <= 1200px
  lg?: number; // > 1200px
}

interface InfiniteVirtualGridProps<T> {
  items: T[];
  renderItem: (item: T, index: number, isHighlighted?: boolean) => React.ReactNode;
  getItemKey: (item: T, index: number) => string;
  itemsPerPage?: number;
  itemHeight?: number | ResponsiveHeight;
  aspectRatio?: number | ResponsiveAspectRatio; // Если указано, то itemHeight игнорируется
  gap?: number | ResponsiveGap;
  className?: string;
  columns?: GridColumns;
  loadThreshold?: number;
  viewportBuffer?: number;
  highlightedAudioId?: string; // ID аудиозаписи для подсветки и скролла
  smoothScroll?: boolean; // Плавный скролл или немедленный
  scrollDuration?: number; // Длительность плавного скролла в миллисекундах
}

const InfiniteVirtualGrid = <T,>({
  items,
  renderItem,
  getItemKey,
  itemsPerPage = 20,
  itemHeight = 280,
  aspectRatio,
  gap = 20,
  className = "",
  columns = { sm: 1, md: 2, lg: 2 },
  loadThreshold = 1000,
  viewportBuffer = 3,
  highlightedAudioId,
  smoothScroll = true,
  scrollDuration = 800,
}: InfiniteVirtualGridProps<T>) => {
  const [visibleCount, setVisibleCount] = useState(items.length < itemsPerPage ? items.length : itemsPerPage);
  const [isClientMounted, setIsClientMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 740
  );
  const [visibleRange, setVisibleRange] = useState<{
    start: number;
    end: number;
  }>({
    start: 0,
    end: itemsPerPage,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  // Инициализация на клиенте
  useEffect(() => {
    setIsClientMounted(true);
    setWindowWidth(window.innerWidth);
  }, []);

  // Отслеживаем изменения размера окна
  useEffect(() => {
    if (!isClientMounted) return;

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isClientMounted]);

  // Определяем количество колонок
  const columnCount = useMemo(() => {
    if (windowWidth <= 740) {
      return columns.sm || 1;
    } else if (windowWidth <= 1200) {
      return columns.md || 2;
    } else {
      return columns.lg || 2;
    }
  }, [windowWidth, columns]);

  // Определяем gap для текущего размера экрана
  const currentGap = useMemo(() => {
    if (typeof gap === "number") {
      return gap;
    }

    if (windowWidth <= 740) {
      return gap.sm || 20;
    } else if (windowWidth <= 1200) {
      return gap.md || 20;
    } else {
      return gap.lg || 20;
    }
  }, [windowWidth, gap]);

  const [containerWidth, setContainerWidth] = useState<number>(0);

  // Отслеживаем размеры контейнера
  useEffect(() => {
    if (!isClientMounted) return;

    const updateContainerWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        if (width > 0) {
          setContainerWidth(width);
        }
      }
    };

    // Устанавливаем начальную ширину с небольшой задержкой для гарантии рендера
    const timeoutId = setTimeout(updateContainerWidth, 0);

    // Также обновляем при изменении размера окна
    window.addEventListener("resize", updateContainerWidth);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", updateContainerWidth);
    };
  }, [isClientMounted]);

  // Вычисляем ширину одного элемента
  const itemWidth = useMemo(() => {
    // Используем ширину контейнера или fallback на основе window.innerWidth
    const availableWidth = containerWidth || Math.max(windowWidth, 300);
    const totalGapWidth = currentGap * (columnCount - 1);
    const calculatedWidth = Math.floor(
      (availableWidth - totalGapWidth) / columnCount
    );

    // Возвращаем положительное значение, минимум 100px
    return Math.max(calculatedWidth, 100);
  }, [containerWidth, windowWidth, currentGap, columnCount]);

  // Определяем высоту элемента для текущего размера экрана
  const currentItemHeight = useMemo(() => {
    // Если указан aspect ratio, используем его
    if (aspectRatio) {
      let currentAspectRatio: number;

      if (typeof aspectRatio === "number") {
        currentAspectRatio = aspectRatio;
      } else {
        if (windowWidth <= 740) {
          currentAspectRatio = aspectRatio.sm || 16 / 9;
        } else if (windowWidth <= 1200) {
          currentAspectRatio = aspectRatio.md || 16 / 9;
        } else {
          currentAspectRatio = aspectRatio.lg || 16 / 9;
        }
      }

      return Math.floor(itemWidth / currentAspectRatio);
    }

    // Иначе используем itemHeight
    if (typeof itemHeight === "number") {
      return itemHeight;
    }

    if (windowWidth <= 740) {
      return itemHeight.sm || 280;
    } else if (windowWidth <= 1200) {
      return itemHeight.md || 280;
    } else {
      return itemHeight.lg || 280;
    }
  }, [windowWidth, itemHeight, aspectRatio, itemWidth]);

    // Состояние для подсветки элемента
  const [highlightedItemId, setHighlightedItemId] = useState<string | null>(null);
  
  // Состояние для отслеживания переключения виртуализации
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Ref для отслеживания процесса скролла
  const isScrollingRef = useRef(false);
  const lastHighlightedIdRef = useRef<string | null>(null);

  // Проверяем, нужно ли отключить виртуализацию
  const shouldDisableVirtualization = !!highlightedAudioId;

  // Функция для скролла к элементу
  const scrollToItem = useCallback((targetIndex: number) => {
    // Проверяем, что мы на клиенте
    if (typeof window === 'undefined') {
      console.log('InfiniteVirtualGrid: scrollToItem skipped - not on client');
      return;
    }
    
    if (!containerRef.current) {
      console.log('InfiniteVirtualGrid: scrollToItem skipped - no container');
      return;
    }
    
    // Проверяем, что targetIndex валидный
    if (targetIndex < 0 || targetIndex >= items.length) {
      console.error('InfiniteVirtualGrid: Invalid targetIndex:', targetIndex, 'items length:', items.length);
      return;
    }
    
    // Сбрасываем флаг скролла, если прошло достаточно времени
    if (isScrollingRef.current) {
      console.log('InfiniteVirtualGrid: Resetting scroll flag');
      isScrollingRef.current = false;
    }
    
    isScrollingRef.current = true;
    console.log('InfiniteVirtualGrid: scrollToItem called with targetIndex:', targetIndex);
    console.log('InfiniteVirtualGrid: currentItemHeight:', currentItemHeight);
    console.log('InfiniteVirtualGrid: currentGap:', currentGap);
    console.log('InfiniteVirtualGrid: columnCount:', columnCount);
    
    // Вычисляем позицию элемента
    const rowHeight = currentItemHeight + currentGap;
    const targetRow = Math.floor(targetIndex / columnCount);
    const scrollPosition = targetRow * rowHeight;
    
    console.log('InfiniteVirtualGrid: rowHeight:', rowHeight);
    console.log('InfiniteVirtualGrid: targetRow:', targetRow);
    console.log('InfiniteVirtualGrid: scrollPosition:', scrollPosition);
    
    // Получаем позицию контейнера относительно страницы
    const containerRect = containerRef.current.getBoundingClientRect();
    const containerTop = containerRect.top + window.pageYOffset;
    
    console.log('InfiniteVirtualGrid: containerTop:', containerTop);
    
    // Вычисляем абсолютную позицию элемента на странице
    const absoluteScrollPosition = containerTop + scrollPosition;
    
    // Добавляем отступ для шапки
    const headerOffset = 100;
    let finalScrollPosition = Math.max(0, absoluteScrollPosition - headerOffset);
    
    // Проверяем, сколько элементов осталось после целевого
    const remainingItems = items.length - targetIndex - 1;
    const remainingRows = Math.ceil(remainingItems / columnCount);
    const remainingHeight = remainingRows * rowHeight;
    
    console.log('InfiniteVirtualGrid: Remaining items analysis:', {
      remainingItems,
      remainingRows,
      remainingHeight,
      windowHeight: window.innerHeight
    });
    
    // Проверяем, не выходим ли мы за пределы страницы
    const maxScrollPosition = Math.max(
      document.documentElement.scrollHeight - window.innerHeight,
      document.body.scrollHeight - window.innerHeight
    );
    
    // Если оставшиеся элементы помещаются на экране до футера, скроллим до футера
    if (remainingHeight < window.innerHeight * 0.8) { // 80% от высоты экрана
      console.log('InfiniteVirtualGrid: Remaining items fit on screen, scrolling to footer');
      finalScrollPosition = maxScrollPosition;
    } else {
      finalScrollPosition = Math.min(finalScrollPosition, maxScrollPosition);
    }
    
    console.log('InfiniteVirtualGrid: Scroll position calculation:', {
      absoluteScrollPosition,
      headerOffset,
      finalScrollPosition,
      maxScrollPosition,
      remainingHeight,
      documentHeight: document.documentElement.scrollHeight,
      bodyHeight: document.body.scrollHeight,
      windowHeight: window.innerHeight
    });
    
    // Проверяем, нужно ли вообще скроллить
    const currentScrollY = window.scrollY;
    const scrollDistance = Math.abs(finalScrollPosition - currentScrollY);
    
    console.log('InfiniteVirtualGrid: Scroll check:', {
      currentScrollY,
      finalScrollPosition,
      scrollDistance,
      needsScroll: scrollDistance > 50 // Скроллим только если расстояние больше 50px
    });
    
    // Если скролл не нужен, просто выходим
    if (scrollDistance < 50) {
      console.log('InfiniteVirtualGrid: No scroll needed, element is already visible');
      isScrollingRef.current = false;
      return;
    }
    
    // Добавляем небольшую задержку для загрузки элементов
    setTimeout(() => {
      // Скроллим к позиции
      try {
        console.log('InfiniteVirtualGrid: Using scroll to position:', finalScrollPosition, 'smooth:', smoothScroll);
        console.log('InfiniteVirtualGrid: Current scroll position before:', window.scrollY);
        
        // Используем window.scrollTo с behavior: 'auto' для немедленного скролла
        window.scrollTo({
          top: finalScrollPosition,
          behavior: smoothScroll ? 'smooth' : 'auto'
        });
        
        // Проверяем результат через задержку
        setTimeout(() => {
          console.log('InfiniteVirtualGrid: After scroll, position:', window.scrollY);
          
          // Если скролл не сработал, пробуем альтернативные методы
          if (Math.abs(window.scrollY - finalScrollPosition) > 10) {
            console.log('InfiniteVirtualGrid: Primary scroll failed, trying alternatives...');
            
            // Пробуем document.documentElement
            document.documentElement.scrollTop = finalScrollPosition;
            console.log('InfiniteVirtualGrid: After document.documentElement.scrollTop:', window.scrollY);
            
            // Пробуем document.body
            if (Math.abs(window.scrollY - finalScrollPosition) > 10) {
              document.body.scrollTop = finalScrollPosition;
              console.log('InfiniteVirtualGrid: After document.body.scrollTop:', window.scrollY);
            }
          }
          
          isScrollingRef.current = false;
        }, smoothScroll ? 1000 : 200);
        
      } catch (error) {
        console.error('InfiniteVirtualGrid: Scroll error:', error);
        isScrollingRef.current = false;
      }
    }, 100); // Небольшая задержка для загрузки элементов
  }, [currentItemHeight, currentGap, columnCount, visibleCount]);

  // Обработка подсветки аудиозаписи
  useEffect(() => {
    console.log('InfiniteVirtualGrid: highlightedAudioId changed:', highlightedAudioId);
    console.log('InfiniteVirtualGrid: items length:', items.length);
    
    // Если highlightedAudioId исчез, убираем подсветку с задержкой
    if (!highlightedAudioId && lastHighlightedIdRef.current) {
      console.log('InfiniteVirtualGrid: highlightedAudioId cleared, starting transition');
      setIsTransitioning(true);
      
      // Убираем подсветку через задержку
      setTimeout(() => {
        setHighlightedItemId(null);
        // Завершаем переход через дополнительную задержку
        setTimeout(() => {
          setIsTransitioning(false);
        }, 500);
      }, 1000); // Задержка 1 секунда перед убиранием подсветки
      
      lastHighlightedIdRef.current = null;
      return;
    }
    
    // Проверяем, что это новый ID
    if (highlightedAudioId && items.length > 0 && 
        highlightedAudioId !== lastHighlightedIdRef.current) {
      
      lastHighlightedIdRef.current = highlightedAudioId;
      const targetIndex = items.findIndex(item => getItemKey(item, 0) === highlightedAudioId);
      console.log('InfiniteVirtualGrid: targetIndex:', targetIndex);
      
      if (targetIndex !== -1) {
        console.log(`InfiniteVirtualGrid: Found target index ${targetIndex} for ID ${highlightedAudioId}`);
        
        // Устанавливаем подсветку
        setHighlightedItemId(highlightedAudioId);
        
        // Если виртуализация отключена, делаем простой скролл
        if (shouldDisableVirtualization) {
          console.log('InfiniteVirtualGrid: Virtualization disabled, doing simple scroll');
          
          // Простой скролл к элементу
          setTimeout(() => {
            const element = document.querySelector(`[data-item-key="${highlightedAudioId}"]`);
            if (element) {
              element.scrollIntoView({ 
                behavior: smoothScroll ? 'smooth' : 'auto',
                block: 'center'
              });
              console.log('InfiniteVirtualGrid: Simple scroll completed');
            } else {
              console.log('InfiniteVirtualGrid: Element not found in DOM, using fallback scroll');
              scrollToItem(targetIndex);
            }
          }, 100);
        } else {
          // Виртуализация включена, используем старую логику
          console.log('InfiniteVirtualGrid: Virtualization enabled, using complex scroll logic');
          
          // Шаг 1: Загружаем все элементы до нужного индекса
          const requiredCount = Math.min(targetIndex + 10, items.length);
          if (requiredCount > visibleCount) {
            console.log(`InfiniteVirtualGrid: Loading items from ${visibleCount} to ${requiredCount}`);
            setVisibleCount(requiredCount);
            
            // Ждем, пока элементы загрузятся, затем скроллим
            const checkAndScroll = () => {
              setVisibleCount(currentCount => {
                if (currentCount >= requiredCount) {
                  console.log('InfiniteVirtualGrid: All items loaded, scrolling to target');
                  setTimeout(() => {
                    scrollToItem(targetIndex);
                  }, 50);
                  return currentCount;
                } else {
                  console.log('InfiniteVirtualGrid: Items not yet loaded, retrying...');
                  setTimeout(checkAndScroll, 100);
                  return requiredCount;
                }
              });
            };
            
            setTimeout(checkAndScroll, 200);
          } else {
            console.log('InfiniteVirtualGrid: Items already loaded, scrolling immediately');
            setTimeout(() => {
              scrollToItem(targetIndex);
            }, 50);
          }
        }
        
        // Убираем подсветку через 5 секунд
        setTimeout(() => {
          setHighlightedItemId(null);
        }, 5000);
      } else {
        console.log('InfiniteVirtualGrid: Audio item not found in items array');
      }
    }
  }, [highlightedAudioId, items, getItemKey, scrollToItem, shouldDisableVirtualization, smoothScroll]);

  // Получаем элементы для рендеринга
  // Всегда рендерим все элементы, чтобы избежать исчезновения
  const itemsToRender = items;
  const hasMore = false; // Отключаем бесконечную загрузку, так как рендерим все элементы

  // Вычисляем общую высоту контейнера
  const containerHeight = useMemo(() => {
    // Всегда вычисляем высоту для всех элементов, чтобы избежать проблем с размером
    const rowHeight = currentItemHeight + currentGap;
    const totalRows = Math.ceil(items.length / columnCount);
    const calculatedHeight = totalRows * rowHeight;
    
    console.log('InfiniteVirtualGrid: Height calculation:', {
      itemsLength: items.length,
      columnCount,
      totalRows,
      rowHeight,
      calculatedHeight,
      shouldDisableVirtualization,
      isTransitioning
    });
    
    return calculatedHeight;
  }, [items.length, columnCount, currentItemHeight, currentGap, shouldDisableVirtualization, isTransitioning]);

  // Функция для обновления видимого диапазона
  const updateVisibleRange = useCallback(() => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const containerTop = containerRect.top + window.pageYOffset;
    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;

    // Вычисляем видимую область с буфером
    const visibleTop = scrollTop - viewportBuffer * currentItemHeight;
    const visibleBottom = scrollTop + windowHeight + viewportBuffer * currentItemHeight;

    // Находим первый и последний видимый элемент
    const rowHeight = currentItemHeight + currentGap;
    
    // Вычисляем начальную и конечную строки относительно контейнера
    const startRow = Math.max(0, Math.floor((visibleTop - containerTop) / rowHeight));
    const endRow = Math.ceil((visibleBottom - containerTop) / rowHeight);

    // Преобразуем в индексы элементов
    const start = Math.max(0, startRow * columnCount);
    const end = Math.min(visibleCount, endRow * columnCount);

    // Убеждаемся, что диапазон не пустой
    const finalStart = Math.min(start, visibleCount - 1);
    const finalEnd = Math.max(finalStart + 1, end);

    setVisibleRange({ start: finalStart, end: finalEnd });
    console.log(`Virtualization: scrollTop=${Math.round(scrollTop)}, containerTop=${Math.round(containerTop)}, visibleTop=${Math.round(visibleTop)}, visibleBottom=${Math.round(visibleBottom)}, startRow=${startRow}, endRow=${endRow}, visibleRange=${finalStart}-${finalEnd}, visibleCount=${visibleCount}`);
  }, [
    visibleCount,
    columnCount,
    currentItemHeight,
    currentGap,
    viewportBuffer,
  ]);

  // Функция загрузки дополнительных элементов
  const loadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + itemsPerPage, items.length));
  }, [itemsPerPage, items.length]);

  // Обработчик скролла страницы
  useEffect(() => {
    // Если виртуализация отключена или идет переход, не устанавливаем обработчик скролла
    if (shouldDisableVirtualization || isTransitioning) {
      console.log('InfiniteVirtualGrid: Scroll handler disabled - virtualization is off or transitioning');
      return;
    }
    
    const handleScroll = () => {
      // Обновляем видимый диапазон
      updateVisibleRange();

      // Проверяем необходимость загрузки новых элементов
      if (hasMore) {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        if (scrollTop + windowHeight >= documentHeight - loadThreshold) {
          loadMore();
        }
      }
    };

    // Инициализируем видимый диапазон
    updateVisibleRange();

    document.body.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      document.body.removeEventListener("scroll", handleScroll);
    };
  }, [shouldDisableVirtualization, isTransitioning, hasMore, loadThreshold, updateVisibleRange, loadMore]);

  // Обновляем видимый диапазон при изменении размеров
  useEffect(() => {
    updateVisibleRange();
  }, [updateVisibleRange]);

  // Сброс при изменении элементов или переключении виртуализации
  useEffect(() => {
    if (shouldDisableVirtualization || isTransitioning) {
      // Если виртуализация отключена или идет переход, загружаем все элементы
      setVisibleCount(items.length);
      setVisibleRange({ start: 0, end: items.length });
    } else {
      // Если виртуализация включена, загружаем все элементы, чтобы избежать исчезновения
      setVisibleCount(items.length);
      setVisibleRange({ start: 0, end: items.length });
      
      // Принудительно обновляем видимый диапазон через небольшую задержку
      setTimeout(() => {
        updateVisibleRange();
      }, 100);
    }
  }, [items, itemsPerPage, shouldDisableVirtualization, isTransitioning, updateVisibleRange]);

  const localizedData = useLocalizedStaticData();

  if (items.length === 0) {
    return null;
  }

  // Показываем загрузку до правильной инициализации на клиенте
  if (!isClientMounted) {
    return (
      <div className={`text-center py-10 ${className}`}>
        <p>{localizedData?.section.catalog.loadingMessage}</p>
      </div>
    );
  }

  // CSS для сетки
  const gridStyle = {
    position: "relative" as const,
    height: `${containerHeight}px`,
    display: "grid",
    gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
  };

  return (
    <div className={className}>
      <style jsx>{`
        .highlighted-item {
          border: 4px solid #b6a9f1;
          border-top: none;
          border-radius: 12px;
        }
      `}</style>
      <div ref={containerRef} style={gridStyle}>
        {shouldDisableVirtualization ? (
          // Рендерим все элементы без виртуализации
          itemsToRender.map((item, index) => {
            const rowIndex = Math.floor(index / columnCount);
            const columnIndex = index % columnCount;
            
            // Вычисляем позицию с учетом gap
            const leftPosition = columnIndex * (itemWidth + currentGap);

            const isHighlighted = getItemKey(item, index) === highlightedItemId;
            
            return (
              <div
                key={getItemKey(item, index)}
                data-item-key={getItemKey(item, index)}
                style={{
                  position: "absolute",
                  top: `${rowIndex * (currentItemHeight + currentGap)}px`,
                  left: `${leftPosition}px`,
                  width: `${itemWidth}px`,
                  height: `${currentItemHeight}px`,
                  transition: 'all 0.3s ease-in-out',
                  opacity: 1, // Гарантируем, что элемент видим
                }}
                className={isHighlighted ? 'highlighted-item' : ''}
              >
                {renderItem(item, index, isHighlighted)}
              </div>
            );
          })
        ) : (
          // Рендерим все элементы, но с виртуализацией позиционирования
          itemsToRender.map((item, index) => {
            const actualIndex = index;
              const rowIndex = Math.floor(actualIndex / columnCount);
              const columnIndex = actualIndex % columnCount;
              
              // Вычисляем позицию с учетом gap
              const leftPosition = columnIndex * (itemWidth + currentGap);

              const isHighlighted = getItemKey(item, actualIndex) === highlightedItemId;
              
              return (
                <div
                  key={getItemKey(item, actualIndex)}
                  data-item-key={getItemKey(item, actualIndex)}
                  style={{
                    position: "absolute",
                    top: `${rowIndex * (currentItemHeight + currentGap)}px`,
                    left: `${leftPosition}px`,
                    width: `${itemWidth}px`,
                    height: `${currentItemHeight}px`,
                    transition: 'all 0.3s ease-in-out',
                    opacity: 1, // Гарантируем, что элемент видим
                  }}
                  className={isHighlighted ? 'highlighted-item' : ''}
                >
                  {renderItem(item, actualIndex, isHighlighted)}
                </div>
              );
            })
        )}
      </div>
    </div>
  );
}

export default InfiniteVirtualGrid;
