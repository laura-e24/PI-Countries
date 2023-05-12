import { useState } from 'react';

function usePagination(data) {
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_LIMIT = 10;

  const pages = Math.ceil(data.length / PAGE_LIMIT)

  
  function currentData() {
    const begin = (currentPage - 1) * PAGE_LIMIT;
    const end = begin + PAGE_LIMIT;
    return data.slice(begin, end);
  }

  function next() {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, pages));
  }

  function prev() {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  }

  function jump(page) {
    const pageNumber = Math.max(1, page)
    setCurrentPage((currentPage) => Math.min(pageNumber, pages));
  }

  return { next, prev, jump, currentData, setCurrentPage, currentPage, pages };
}

export default usePagination;