// src/modules/shared/hooks/usePagination.js
import { useState, useMemo } from 'react';

export function usePagination(items, itemsPerPage = 9) {
  const [page, setPage] = useState(1);
  
  const totalPages = useMemo(() => Math.ceil(items.length / itemsPerPage), [items.length, itemsPerPage]);
  
  const paginatedItems = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return items.slice(start, end);
  }, [items, page, itemsPerPage]);

  return {
    page,
    setPage,
    totalPages,
    paginatedItems,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1
  };
}
