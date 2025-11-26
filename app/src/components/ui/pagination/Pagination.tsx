import ArrowLeft from "@/shared/ui/icons/ArrowLeft";
import ArrowRight from "@/shared/ui/icons/ArrowRight";
import React, { useEffect, useMemo, useRef, useState } from "react";
import PaginationButton from "./PaginationButton";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useInView } from "react-intersection-observer";
import clsx from "clsx";

const breakpoints = {
  md: 1200,
  sm: 740,
};

export type ItemsPerPage = {
  lg: number;
  md: number;
  sm: number;
};

type Props<T> = {
  initPage?: number;
  items: T[];
  itemsPerPage: ItemsPerPage;
  renderItem: (item: T) => React.ReactNode;
  className?: string;
};

const Pagination = <T,>({
  initPage,
  items,
  itemsPerPage,
  renderItem,
  className,
}: Props<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [hasInitPageSet, setHasInitPageSet] = useState(false);
  const [isInitRenderPassed, setIsInitRenderPassed] = useState(false);

  const { innerWidth } = useWindowSize();

  const itemsPerPageActual = useMemo(() => {
    if (innerWidth <= breakpoints.sm) return itemsPerPage.sm;
    if (innerWidth <= breakpoints.md) return itemsPerPage.md;
    return itemsPerPage.lg;
  }, [innerWidth, itemsPerPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(items.length / itemsPerPageActual);
  }, [items, itemsPerPageActual]);

  const itemsToShow = useMemo(() => {
    return items.slice(
      (currentPage - 1) * itemsPerPageActual,
      currentPage * itemsPerPageActual
    );
  }, [items, itemsPerPageActual, currentPage]);

  useEffect(() => {
    if (!initPage || hasInitPageSet) {
      console.log("setCurrentPage");
      setCurrentPage(1);
    }
  }, [itemsPerPage, items]);

  useEffect(() => {
    console.log("1", initPage);
    if (!hasInitPageSet && initPage) {
      console.log("2", initPage);
      console.log("setCurrentPage");
      setCurrentPage(initPage);
      setTimeout(() => {
        setHasInitPageSet(true);
      }, 800)
      
    }
  }, [initPage]);

  const {
    ref: viewRef,
    inView,
    entry,
  } = useInView({
    /* options */
    threshold: 0.5, // например, 50% видимости
  });

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(currentPage);
    if (isInitRenderPassed && (!initPage || hasInitPageSet)) {
      if (!inView && containerRef.current) {
        console.log("scroll");
        containerRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start", // или "center", "nearest"
          inline: "nearest",
        });
      }
    } else {
      setIsInitRenderPassed(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handlelPrevButtonClick = () => {
    if (currentPage > 1) {
            console.log("setCurrentPage");

      setCurrentPage(currentPage - 1);
    }
  };

  const handlelNextButtonClick = () => {
    if (currentPage < totalPages) {
            console.log("setCurrentPage");

      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageButtonClick = (str: string) => {
    console.log(str, Number.isInteger(Number(str)));
    if (Number.isInteger(Number(str))) {
      console.log(Number(str));
      console.log("setCurrentPage");

      setCurrentPage(Number(str));
    }
  };

  if (items.length === 0) {
    return null;
  }

  const paginationButtons: {
    text: string;
    isActive: boolean;
    disabled: boolean;
  }[] = useMemo(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => ({
        text: String(i + 1),
        isActive: currentPage === i + 1,
        disabled: false,
      }));
    } else {
      const pageBeforePrevious = currentPage - 2;
      const pagePrevious = currentPage - 1;
      const pageNext = currentPage + 1;
      const pageAfterNext = currentPage + 2;

      let array: {
        text: string;
        isActive: boolean;
        disabled: boolean;
      }[] = [];

      if (pageBeforePrevious > 2) {
        array = [
          { text: "1", isActive: false, disabled: false },
          { text: "...", isActive: false, disabled: true },
          {
            text: String(pageBeforePrevious),
            isActive: false,
            disabled: false,
          },
          { text: String(pagePrevious), isActive: false, disabled: false },
          { text: String(currentPage), isActive: true, disabled: false },
        ];
      }

      if (pageBeforePrevious === 2) {
        array = [
          { text: "1", isActive: false, disabled: false },
          {
            text: String(pageBeforePrevious),
            isActive: false,
            disabled: false,
          },
          { text: String(pagePrevious), isActive: false, disabled: false },
          { text: String(currentPage), isActive: true, disabled: false },
        ];
      }

      if (pageBeforePrevious === 1) {
        array = [
          {
            text: String(pageBeforePrevious),
            isActive: false,
            disabled: false,
          },
          { text: String(pagePrevious), isActive: false, disabled: false },
          { text: String(currentPage), isActive: true, disabled: false },
        ];
      }

      if (pagePrevious === 1) {
        array = [
          { text: String(pagePrevious), isActive: false, disabled: false },
          { text: String(currentPage), isActive: true, disabled: false },
        ];
      }

      if (totalPages - pageAfterNext > 1) {
        array.push({
          text: String(pageNext),
          isActive: false,
          disabled: false,
        });
        array.push({
          text: String(pageAfterNext),
          isActive: false,
          disabled: false,
        });
        array.push({ text: "...", isActive: false, disabled: true });
        array.push({
          text: String(totalPages),
          isActive: false,
          disabled: false,
        });
      }

      if (totalPages - pageAfterNext === 1) {
        array.push({
          text: String(pageNext),
          isActive: false,
          disabled: false,
        });
        array.push({
          text: String(pageAfterNext),
          isActive: false,
          disabled: false,
        });
        array.push({
          text: String(totalPages),
          isActive: false,
          disabled: false,
        });
      }

      if (totalPages === pageAfterNext) {
        array.push({
          text: String(pageNext),
          isActive: false,
          disabled: false,
        });
        array.push({
          text: String(pageAfterNext),
          isActive: false,
          disabled: false,
        });
      }

      if (totalPages === pageNext) {
        array.push({
          text: String(pageNext),
          isActive: false,
          disabled: false,
        });
      }

      if (currentPage === 1) {
        array = [
          { text: String(currentPage), isActive: true, disabled: false },
          { text: "2", isActive: false, disabled: false },
          { text: "3", isActive: false, disabled: false },
          { text: "4", isActive: false, disabled: false },
          { text: "...", isActive: false, disabled: true },
          { text: String(totalPages), isActive: false, disabled: false },
        ];
      }

      if (currentPage === totalPages) {
        array = [
          { text: "1", isActive: false, disabled: false },
          { text: "...", isActive: false, disabled: true },
          { text: String(currentPage - 3), isActive: false, disabled: false },
          {
            text: String(pageBeforePrevious),
            isActive: false,
            disabled: false,
          },
          { text: String(pagePrevious), isActive: false, disabled: false },
          { text: String(currentPage), isActive: true, disabled: false },
        ];
      }

      return array;
    }
  }, [totalPages, currentPage]);

  return (
    <div className="container relative">
      <div
        ref={containerRef}
        className="absolute top-[-200px] md:top-[-180px] sm:top-[-150px]"
      ></div>
      <div ref={viewRef}></div>
      <div className={className}>
        {itemsToShow.map((item) => renderItem(item))}
      </div>
      {totalPages > 1 && (
        <div className="flex items-center gap-[16px] mt-[20px] sm:justify-center">
          <PaginationButton
            disabled={currentPage === 1}
            onClick={handlelPrevButtonClick}
          >
            <ArrowLeft />
          </PaginationButton>
          <div className=" flex items-center gap-[0px]">
            {paginationButtons.map(({ isActive, disabled, text }, index) => (
              <button
                onClick={() => handlePageButtonClick(text)}
                key={text + index}
                className={clsx(
                  "text-[18px] leading-[100%] transition-colors hover:text-[#7A66D5] p-[4px]",
                  {
                    "text-[#000000] pointer-events-none": isActive,
                    "text-[#CACACA]": !isActive,
                    "pointer-events-none": disabled,
                  }
                )}
              >
                {text}
              </button>
            ))}
          </div>

          <PaginationButton
            disabled={currentPage === totalPages}
            onClick={handlelNextButtonClick}
          >
            <ArrowRight />
          </PaginationButton>
        </div>
      )}
    </div>
  );
};

export default Pagination;
