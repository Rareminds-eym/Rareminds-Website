import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export default function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange,
  isLoading = false 
}: PaginationProps) {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 7; // Maximum visible page numbers

    if (totalPages <= maxVisible) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage <= 3) {
        // Near the beginning: 1 2 3 4 ... 11
        pages.push(2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near the end: 1 ... 8 9 10 11
        pages.push('...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        // In the middle: 1 ... 5 6 7 ... 11
        pages.push('...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  const handlePrevious = () => {
    if (!isFirstPage && !isLoading) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (!isLastPage && !isLoading) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number | string) => {
    if (typeof page === 'number' && page !== currentPage && !isLoading) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex items-center justify-center gap-2 flex-wrap">
      {/* Previous Button */}
      <motion.button
        whileHover={!isFirstPage && !isLoading ? { scale: 1.02 } : {}}
        whileTap={!isFirstPage && !isLoading ? { scale: 0.98 } : {}}
        onClick={handlePrevious}
        disabled={isFirstPage || isLoading}
        className={`
          flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm
          transition-all duration-200 shadow-sm
          ${
            isFirstPage || isLoading
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
              : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-300 hover:text-blue-700 hover:shadow-md'
          }
        `}
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Previous</span>
      </motion.button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1.5">
        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-3 py-2 text-slate-400 font-medium text-sm"
              >
                …
              </span>
            );
          }

          const isActive = page === currentPage;

          return (
            <motion.button
              key={page}
              whileHover={!isActive && !isLoading ? { scale: 1.05 } : {}}
              whileTap={!isActive && !isLoading ? { scale: 0.95 } : {}}
              onClick={() => handlePageClick(page)}
              disabled={isActive || isLoading}
              className={`
                min-w-[40px] h-10 px-3 rounded-full font-semibold text-sm
                transition-all duration-200
                ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-300 hover:text-blue-700 hover:shadow-md'
                }
                ${isLoading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
              `}
            >
              {page}
            </motion.button>
          );
        })}
      </div>

      {/* Next Button */}
      <motion.button
        whileHover={!isLastPage && !isLoading ? { scale: 1.02 } : {}}
        whileTap={!isLastPage && !isLoading ? { scale: 0.98 } : {}}
        onClick={handleNext}
        disabled={isLastPage || isLoading}
        className={`
          flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm
          transition-all duration-200 shadow-sm
          ${
            isLastPage || isLoading
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/20 hover:shadow-xl hover:from-blue-700 hover:to-blue-800'
          }
        `}
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="w-4 h-4" />
      </motion.button>
    </div>
  );
}
