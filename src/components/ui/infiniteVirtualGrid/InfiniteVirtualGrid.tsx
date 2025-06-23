import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";

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
  renderItem: (item: T, index: number) => React.ReactNode;
  getItemKey: (item: T, index: number) => string;
  itemsPerPage?: number;
  itemHeight?: number | ResponsiveHeight;
  aspectRatio?: number | ResponsiveAspectRatio; // Если указано, то itemHeight игнорируется
  gap?: number | ResponsiveGap;
  className?: string;
  emptyMessage?: string;
  columns?: GridColumns;
  loadMoreText?: string;
  containerPadding?: number;
  loadThreshold?: number;
  viewportBuffer?: number;
}

function InfiniteVirtualGrid<T>({
  items,
  renderItem,
  getItemKey,
  itemsPerPage = 20,
  itemHeight = 280,
  aspectRatio,
  gap = 20,
  className = "",
  emptyMessage = "Элементы не найдены",
  columns = { sm: 1, md: 2, lg: 2 },
  loadMoreText = "Показать ещё",
  containerPadding = 40,
  loadThreshold = 1000,
  viewportBuffer = 3
}: InfiniteVirtualGridProps<T>) {
  const [visibleCount, setVisibleCount] = useState(itemsPerPage);
  const [isClientMounted, setIsClientMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 740
  );
  const [visibleRange, setVisibleRange] = useState<{ start: number; end: number }>({
    start: 0,
    end: itemsPerPage
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

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
    if (typeof gap === 'number') {
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

  // Вычисляем ширину одного элемента
  const itemWidth = useMemo(() => {
    const availableWidth = windowWidth - containerPadding * 2;
    const totalGapWidth = currentGap * (columnCount - 1);
    return Math.floor((availableWidth - totalGapWidth) / columnCount);
  }, [windowWidth, containerPadding, currentGap, columnCount]);

  // Определяем высоту элемента для текущего размера экрана
  const currentItemHeight = useMemo(() => {
    // Если указан aspect ratio, используем его
    if (aspectRatio) {
      let currentAspectRatio: number;
      
      if (typeof aspectRatio === 'number') {
        currentAspectRatio = aspectRatio;
      } else {
        if (windowWidth <= 740) {
          currentAspectRatio = aspectRatio.sm || 16/9;
        } else if (windowWidth <= 1200) {
          currentAspectRatio = aspectRatio.md || 16/9;
        } else {
          currentAspectRatio = aspectRatio.lg || 16/9;
        }
      }
      
      return Math.floor(itemWidth / currentAspectRatio);
    }
    
    // Иначе используем itemHeight
    if (typeof itemHeight === 'number') {
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

  // Получаем загруженные элементы
  const loadedItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  // Вычисляем общую высоту контейнера
  const containerHeight = useMemo(() => {
    const rowHeight = currentItemHeight + currentGap;
    const totalRows = Math.ceil(loadedItems.length / columnCount);
    return totalRows * rowHeight;
  }, [loadedItems.length, columnCount, currentItemHeight, currentGap]);

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
    const startRow = Math.max(0, Math.floor((visibleTop - containerTop) / rowHeight));
    const endRow = Math.min(
      Math.ceil(loadedItems.length / columnCount),
      Math.ceil((visibleBottom - containerTop) / rowHeight)
    );

    const start = startRow * columnCount;
    const end = Math.min(loadedItems.length, (endRow + 1) * columnCount);

    setVisibleRange({ start, end });
  }, [loadedItems.length, columnCount, currentItemHeight, currentGap, viewportBuffer]);

  // Функция загрузки дополнительных элементов
  const loadMore = useCallback(() => {
    setVisibleCount(prev => Math.min(prev + itemsPerPage, items.length));
  }, [itemsPerPage, items.length]);

  // Обработчик скролла страницы
  useEffect(() => {
    const handleScroll = () => {
      // Обновляем видимый диапазон
      updateVisibleRange();

      // Проверяем необходимость загрузки новых элементов
      if (hasMore) {
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        if (scrollTop + windowHeight >= documentHeight - loadThreshold) {
          loadMore();
        }
      }
    };

    // Инициализируем видимый диапазон
    updateVisibleRange();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, loadThreshold, updateVisibleRange, loadMore]);

  // Обновляем видимый диапазон при изменении размеров
  useEffect(() => {
    updateVisibleRange();
  }, [updateVisibleRange]);

  // Сброс при изменении элементов
  useEffect(() => {
    setVisibleCount(itemsPerPage);
    setVisibleRange({ start: 0, end: itemsPerPage });
  }, [items, itemsPerPage]);

  if (items.length === 0) {
    return (
      <div className={`text-center py-10 ${className}`}>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  // Показываем загрузку до правильной инициализации на клиенте
  if (!isClientMounted) {
    return (
      <div className={`text-center py-10 ${className}`}>
        <p>Загрузка...</p>
      </div>
    );
  }

  // CSS для сетки
  const gridStyle = {
    position: 'relative' as const,
    height: `${containerHeight}px`,
    display: 'grid',
    gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
    gap: `${currentGap}px`,
  };

  return (
    <div className={className}>
      <div ref={containerRef} style={gridStyle}>
        {/* Рендерим только видимые элементы */}
        {loadedItems.slice(visibleRange.start, visibleRange.end).map((item, relativeIndex) => {
          const actualIndex = visibleRange.start + relativeIndex;
          const rowIndex = Math.floor(actualIndex / columnCount);
          const columnIndex = actualIndex % columnCount;
          
          return (
            <div
              key={getItemKey(item, actualIndex)}
              style={{
                position: 'absolute',
                top: `${rowIndex * (currentItemHeight + currentGap)}px`,
                left: `${(100 / columnCount) * columnIndex}%`,
                width: `calc(${100 / columnCount}% - ${currentGap * (columnCount - 1) / columnCount}px)`,
                height: `${currentItemHeight}px`,
              }}
            >
              {renderItem(item, actualIndex)}
            </div>
          );
        })}
      </div>
      
      {hasMore && (
        <div className="text-center mt-8">
          <button
            onClick={loadMore}
            className="px-6 py-3 bg-purple-main text-white rounded-lg hover:bg-purple-light transition-colors"
          >
            {loadMoreText}
          </button>
          <p className="text-sm text-grey-dark mt-2">
            Показано {visibleCount} из {items.length}
          </p>
        </div>
      )}
    </div>
  );
}

export default InfiniteVirtualGrid; 