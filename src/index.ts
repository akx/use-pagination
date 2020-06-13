import React from "react";

interface PaginatedInterface<T> {
  firstPage: () => void;
  lastPage: () => void;
  nextPage: () => void;
  previousPage: () => void;
  setPage: (n: number) => void;
  paginated: ReadonlyArray<T>;
  page: number;
  perPage: number;
  totalPages: number;
}

function getTotalPages(perPage: number, data: readonly any[]) {
  return Math.ceil(data.length / perPage) - 1;
}

function clampPageNumber(
  pageNumber: number,
  perPage: number,
  data: readonly any[]
) {
  const totalPages = getTotalPages(perPage, data);
  return Math.min(totalPages, Math.max(0, pageNumber));
}

function getNextPage(
  pageNumber: number,
  perPage: number,
  data: readonly any[]
) {
  return clampPageNumber(pageNumber + 1, perPage, data);
}

function getPreviousPage(pageNumber: number) {
  return Math.max(0, pageNumber - 1);
}

function extractPage<T>(page: number, perPage: number, data: readonly T[]) {
  const from = page * perPage;
  const to = (page + 1) * perPage;
  return data.slice(from, to);
}

function usePagination<T>(
  data: readonly T[],
  perPage = 50,
  initialPage = 0
): PaginatedInterface<T> {
  const [pageNumber, setPageNumber] = React.useState(initialPage || 0);
  const totalPages = getTotalPages(perPage, data);
  const realPageNumber = clampPageNumber(pageNumber, perPage, data);
  const firstPage = React.useCallback(() => setPageNumber(0), []);
  const lastPage = React.useCallback(() => setPageNumber(totalPages - 1), [
    totalPages,
  ]);
  const nextPage = React.useCallback(
    () => setPageNumber(getNextPage(pageNumber, perPage, data)),
    [data, pageNumber, perPage]
  );
  const previousPage = React.useCallback(
    () => setPageNumber(getPreviousPage(pageNumber)),
    [pageNumber]
  );
  const setPage = React.useCallback(
    (page) => setPageNumber(clampPageNumber(page, perPage, data)),
    [data, perPage]
  );
  const paginated = React.useMemo(
    () => extractPage(realPageNumber, perPage, data),
    [realPageNumber, perPage, data]
  );
  return {
    firstPage,
    lastPage,
    nextPage,
    previousPage,
    setPage,
    totalPages: totalPages + 1,
    paginated,
    page: realPageNumber + 1,
    perPage,
  };
}

export default usePagination;
