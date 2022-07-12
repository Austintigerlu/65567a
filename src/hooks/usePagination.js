import { useMemo } from "react";

export const DOTS = "...";

function usePagination({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage
}) {

  // Function to get the length and set start and end values
  function range(start,end){
    let length = end - start + 1;
    return Array.from({length}, (_, i) => i + start);
  }

  const paginationRange = useMemo(()=>{
    // calculates total pages
    const totalPageCount = Math.ceil(totalCount/pageSize);
    const totalPageNumbers = siblingCount + 5;

    // If number of pages is less than page numbers return range [1...page count]
    if (totalPageNumbers >= totalPageCount){
      return range(1, totalPageCount);
    }

    // left and right index calulation
    const leftIndex = Math.max(currentPage - siblingCount, 1);
    console.log("leftIndex", leftIndex)
    const rightIndex = Math.min(currentPage + siblingCount, totalPageCount);
    console.log("rightIndex", rightIndex)

    // Do we need DOTS?
    const leftDots = leftIndex > 1;
    const rightDots = rightIndex < totalPageCount;

    const firstIndex = 1;
    const lastIndex = totalPageCount;

    // Logic for pagination
    if(!leftDots && rightDots){
      const leftItemCount = 3 * siblingCount;
      const leftIndexRange = range(1, leftItemCount);
      return [...leftIndexRange, DOTS, totalPageCount];
    } else if (leftDots && !rightDots){
      const rightItemCount =  3 * siblingCount;
      const rightIndexRange = range(totalPageCount - rightItemCount + 1, totalPageCount);
      return [firstIndex, DOTS, ...rightIndexRange];
    } else {
      const middleIndexRange = range(leftIndex, rightIndex);
      return [firstIndex, DOTS, ...middleIndexRange, DOTS, lastIndex];
    }

  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
}

export default usePagination;
