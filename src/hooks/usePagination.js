import { useMemo } from "react";

export const DOTS = "...";

function usePagination({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage
}) {

  function range(start,end){
    let length = end - start + 1;
    return Array.from({length}, (_, i) => i + start);
  }

  const paginationRange =useMemo(()=>{
    const totalPageCount = Math.ceil(totalCount/pageSize);
    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPageCount){
      return range(1, totalPageCount);
    }

    const leftIndex = Math.max(currentPage - siblingCount, 1);
    const rightIndex = Math.min(currentPage + siblingCount, totalPageCount);

    const leftDots = leftIndex > 2;
    const rightDots = rightIndex < totalPageCount - 2;

    const firstIndex = 1;
    const lastIndex = totalPageCount;

    if(!leftDots && rightDots){
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);
      return [...leftRange, DOTS, totalPageCount];
    } else if (leftDots && !rightDots){
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);
      return [firstIndex, DOTS, ...rightRange];
    } else {
      let middleRange = range(leftIndex, rightIndex);
      return [firstIndex, DOTS, ...middleRange, DOTS, lastIndex];
    }

  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
}

export default usePagination;
