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
  
  // Ref для отслеживания процесса скролла
  const isScrollingRef = useRef(false);
  const lastHighlightedIdRef = useRef<string | null>(null);

  // Функция для скролла к элементу
  const scrollToItem = useCallback((targetIndex: number) => {
    if (!containerRef.current || isScrollingRef.current) {
      console.log('InfiniteVirtualGrid: scrollToItem skipped - already scrolling or no container');
      return;
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
    const finalScrollPosition = Math.max(0, absoluteScrollPosition - headerOffset);
    
    console.log('InfiniteVirtualGrid: absoluteScrollPosition:', absoluteScrollPosition);
    console.log('InfiniteVirtualGrid: finalScrollPosition:', finalScrollPosition);
    
    // Проверяем, какой элемент является скроллируемым
    console.log('InfiniteVirtualGrid: document.documentElement.scrollHeight:', document.documentElement.scrollHeight);
    console.log('InfiniteVirtualGrid: document.body.scrollHeight:', document.body.scrollHeight);
    console.log('InfiniteVirtualGrid: window.innerHeight:', window.innerHeight);
    console.log('InfiniteVirtualGrid: Current scroll position:', window.scrollY);
    
    // Сначала обновляем видимый диапазон, чтобы элементы были в DOM
    const startRow = Math.max(0, targetRow - 2); // 2 строки выше
    const endRow = targetRow + 3; // 3 строки ниже
    
    const newStart = Math.max(0, startRow * columnCount);
    const newEnd = Math.min(visibleCount, endRow * columnCount);
    
    console.log('InfiniteVirtualGrid: Updating visible range before scroll to:', newStart, '-', newEnd);
    setVisibleRange({ start: newStart, end: newEnd });
    
    // Ждем обновления DOM, затем скроллим
    setTimeout(() => {
      console.log('InfiniteVirtualGrid: DOM updated, now scrolling to:', finalScrollPosition);
      
      // Скроллим к позиции
      try {
        console.log('InfiniteVirtualGrid: Using scroll to position:', finalScrollPosition, 'smooth:', smoothScroll);
        console.log('InfiniteVirtualGrid: Current scroll position before:', window.scrollY);
        
        // Используем стандартный window.scrollTo
        window.scrollTo({
          top: finalScrollPosition,
          behavior: smoothScroll ? 'smooth' : 'auto'
        });
        
        // Проверяем результат сразу и через задержку
        console.log('InfiniteVirtualGrid: Scroll command executed');
        
        setTimeout(() => {
          console.log('InfiniteVirtualGrid: After scroll, position:', window.scrollY);
          console.log('InfiniteVirtualGrid: Expected position:', finalScrollPosition);
          
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
    }, 100); // Ждем обновления DOM
  }, [currentItemHeight, currentGap, columnCount, visibleCount]);

  // Обработка подсветки аудиозаписи
  useEffect(() => {
    console.log('InfiniteVirtualGrid: highlightedAudioId changed:', highlightedAudioId);
    console.log('InfiniteVirtualGrid: items length:', items.length);
    
    // Проверяем, что это новый ID и не идет скролл
    if (highlightedAudioId && items.length > 0 && 
        highlightedAudioId !== lastHighlightedIdRef.current && 
        !isScrollingRef.current) {
      
      lastHighlightedIdRef.current = highlightedAudioId;
      const targetIndex = items.findIndex(item => getItemKey(item, 0) === highlightedAudioId);
      console.log('InfiniteVirtualGrid: targetIndex:', targetIndex);
      console.log('InfiniteVirtualGrid: available item keys:', items.slice(0, 5).map(item => getItemKey(item, 0)));
      
      if (targetIndex !== -1) {
        console.log(`InfiniteVirtualGrid: Found target index ${targetIndex} for ID ${highlightedAudioId}`);
        
        // Шаг 1: Загружаем все элементы до нужного индекса
        const requiredCount = Math.min(targetIndex + 10, items.length); // +10 для буфера
        if (requiredCount > visibleCount) {
          console.log(`InfiniteVirtualGrid: Loading items from ${visibleCount} to ${requiredCount}`);
          setVisibleCount(requiredCount);
          
          // Ждем, пока элементы загрузятся, затем скроллим
          const checkAndScroll = () => {
            // Проверяем актуальное состояние visibleCount
            setVisibleCount(currentCount => {
              if (currentCount >= requiredCount) {
                console.log('InfiniteVirtualGrid: All items loaded, scrolling to target');
                setHighlightedItemId(highlightedAudioId);
                scrollToItem(targetIndex);
                
                // Убираем подсветку через 5 секунд
                setTimeout(() => {
                  setHighlightedItemId(null);
                }, 5000);
                
                return currentCount;
              } else {
                console.log('InfiniteVirtualGrid: Items not yet loaded, retrying...');
                setTimeout(checkAndScroll, 100);
                return requiredCount;
              }
            });
          };
          
          // Начинаем проверку через небольшую задержку
          setTimeout(checkAndScroll, 200);
        } else {
          // Элементы уже загружены, сразу скроллим
          console.log('InfiniteVirtualGrid: Items already loaded, scrolling immediately');
          setHighlightedItemId(highlightedAudioId);
          scrollToItem(targetIndex);
          
          // Убираем подсветку через 5 секунд
          setTimeout(() => {
            setHighlightedItemId(null);
          }, 5000);
        }
      } else {
        console.log('InfiniteVirtualGrid: Audio item not found in items array');
      }
    }
  }, [highlightedAudioId, items, getItemKey, scrollToItem]);

  // Получаем загруженные элементы
  const loadedItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  // Вычисляем общую высоту контейнера (для всех загруженных элементов)
  const containerHeight = useMemo(() => {
    const rowHeight = currentItemHeight + currentGap;
    const totalRows = Math.ceil(visibleCount / columnCount);
    return totalRows * rowHeight;
  }, [visibleCount, columnCount, currentItemHeight, currentGap]);

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
  }, [hasMore, loadThreshold, updateVisibleRange, loadMore]);

  // Обновляем видимый диапазон при изменении размеров
  useEffect(() => {
    updateVisibleRange();
  }, [updateVisibleRange]);

  // Сброс при изменении элементов
  useEffect(() => {
    const visibleCount = items.length < itemsPerPage ? items.length : itemsPerPage
    setVisibleCount(visibleCount);
    setVisibleRange({ start: 0, end: visibleCount });
  }, [items, itemsPerPage]);

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
        {/* Рендерим только видимые элементы из видимого диапазона */}
        {items
          .slice(visibleRange.start, visibleRange.end)
          .map((item, relativeIndex) => {
            const actualIndex = visibleRange.start + relativeIndex;
            const rowIndex = Math.floor(actualIndex / columnCount);
            const columnIndex = actualIndex % columnCount;
            
            // Вычисляем позицию с учетом gap
            const leftPosition = columnIndex * (itemWidth + currentGap);

            const isHighlighted = getItemKey(item, actualIndex) === highlightedItemId;
            
            return (
              <div
                key={getItemKey(item, actualIndex)}
                style={{
                  position: "absolute",
                  top: `${rowIndex * (currentItemHeight + currentGap)}px`,
                  left: `${leftPosition}px`,
                  width: `${itemWidth}px`,
                  height: `${currentItemHeight}px`,
                  transition: 'all 0.3s ease-in-out',
                }}
                className={isHighlighted ? 'highlighted-item' : ''}
              >
                {renderItem(item, actualIndex, isHighlighted)}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default InfiniteVirtualGrid;
