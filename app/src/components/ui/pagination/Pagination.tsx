import ArrowLeft from "@/shared/ui/icons/ArrowLeft";
import ArrowRight from "@/shared/ui/icons/ArrowRight";
import React, { useEffect, useMemo, useRef, useState } from "react";
import PaginationButton from "./PaginationButton";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useInView } from "react-intersection-observer";

const breakpoints = {
    md: 1200,
    sm: 740,
}

type ItemsPerPage = {
    lg: number;
    md: number;
    sm: number;
}

type Props<T> = {
  items: T[];
  itemsPerPage: ItemsPerPage;
  renderItem: (item: T) => React.ReactNode;
  className?: string;
};

const Pagination = <T,>(props: Props<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { innerWidth } = useWindowSize();

  const itemsPerPage = useMemo(() => {
    if (innerWidth <= breakpoints.sm) return props.itemsPerPage.sm;
    if (innerWidth <= breakpoints.md) return props.itemsPerPage.md;
    return props.itemsPerPage.lg;
  }, [innerWidth, props.itemsPerPage]);


  const totalPages = useMemo(() => {
    return Math.ceil(props.items.length / itemsPerPage);
  }, [props.items, itemsPerPage]);

  const itemsToShow = useMemo(() => {
    return props.items.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [props.items, itemsPerPage, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage, props.items]);

  const { ref: viewRef, inView, entry } = useInView({
    /* options */
    threshold: 0.5, // например, 50% видимости
  });

  const containerRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (!inView && containerRef.current) {
      window.scrollTo({
        top: containerRef.current.getBoundingClientRect().top + window.scrollY - 200,
        behavior: "smooth",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handlelPrevButtonClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const handlelNextButtonClick = () => {            
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }

  }

  if (props.items.length === 0) {
    return null;
  }
  
  return (
    <div ref={containerRef} className="container">
        <div ref={viewRef}></div>
      <div  className={props.className}>
        {itemsToShow.map((item) => props.renderItem(item))}
      </div>
    {totalPages > 1 &&  <div className="flex items-center gap-[57px] mt-[20px] sm:justify-center">
        <PaginationButton
          disabled={currentPage === 1}
          onClick={handlelPrevButtonClick}
        >
          <ArrowLeft />
        </PaginationButton>
        <PaginationButton
          disabled={currentPage === totalPages}
          onClick={handlelNextButtonClick}
        >
          <ArrowRight />
        </PaginationButton>
      </div>}
    </div>
  );
};

export default Pagination;
