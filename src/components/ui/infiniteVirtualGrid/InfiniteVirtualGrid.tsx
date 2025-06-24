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
  renderItem: (item: T, index: number) => React.ReactNode;
  getItemKey: (item: T, index: number) => string;
  itemsPerPage?: number;
  itemHeight?: number | ResponsiveHeight;
  aspectRatio?: number | ResponsiveAspectRatio; // Если указано, то itemHeight игнорируется
  gap?: number | ResponsiveGap;
  className?: string;
  columns?: GridColumns;
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
  columns = { sm: 1, md: 2, lg: 2 },
  containerPadding = 40,
  loadThreshold = 1000,
  viewportBuffer = 3,
}: InfiniteVirtualGridProps<T>) {
  const [visibleCount, setVisibleCount] = useState(itemsPerPage);
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
    // Если containerWidth еще не установлен, используем fallback расчет
    const availableWidth =
      containerWidth || Math.max(windowWidth - containerPadding * 2, 300);
    const totalGapWidth = currentGap * (columnCount - 1);
    const calculatedWidth = Math.floor(
      (availableWidth - totalGapWidth) / columnCount
    );

    // Возвращаем положительное значение, минимум 100px
    return Math.max(calculatedWidth, 100);
  }, [containerWidth, windowWidth, containerPadding, currentGap, columnCount]);

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
    const visibleBottom =
      scrollTop + windowHeight + viewportBuffer * currentItemHeight;

    // Находим первый и последний видимый элемент
    const rowHeight = currentItemHeight + currentGap;
    const startRow = Math.max(
      0,
      Math.floor((visibleTop - containerTop) / rowHeight)
    );
    const endRow = Math.min(
      Math.ceil(loadedItems.length / columnCount),
      Math.ceil((visibleBottom - containerTop) / rowHeight)
    );

    const start = startRow * columnCount;
    const end = Math.min(loadedItems.length, (endRow + 1) * columnCount);

    setVisibleRange({ start, end });
  }, [
    loadedItems.length,
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

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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

  const localizedData = useLocalizedStaticData();

  if (items.length === 0) {
    return (
      <div
        className={`text-center py-10 section-heading text-grey-middle ${className}`}
      >
        <p>{localizedData?.section.catalog.emptyMessage}</p>
      </div>
    );
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
      <div ref={containerRef} style={gridStyle}>
        {/* Рендерим только видимые элементы */}
        {loadedItems
          .slice(visibleRange.start, visibleRange.end)
          .map((item, relativeIndex) => {
            const actualIndex = visibleRange.start + relativeIndex;
            const rowIndex = Math.floor(actualIndex / columnCount);
            const columnIndex = actualIndex % columnCount;
            
            // Вычисляем позицию с учетом gap
            const leftPosition = columnIndex * (itemWidth + currentGap);

            return (
              <div
                key={getItemKey(item, actualIndex)}
                style={{
                  position: "absolute",
                  top: `${rowIndex * (currentItemHeight + currentGap)}px`,
                  left: `${leftPosition}px`,
                  width: `${itemWidth}px`,
                  height: `${currentItemHeight}px`,
                }}
              >
                {renderItem(item, actualIndex)}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default InfiniteVirtualGrid;
