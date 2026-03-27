// // import React from 'react';

// // interface PaginationProps {
// //   currentPage: number;
// //   totalPages: number;
// //   onPageChange: (page: number) => void;
// // }

// // export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
// //   const getVisiblePages = () => {
// //     const pages = [];
// //     const maxVisible = 7;
    
// //     if (totalPages <= maxVisible) {
// //       // Show all pages if total is less than max visible
// //       for (let i = 1; i <= totalPages; i++) {
// //         pages.push(i);
// //       }
// //     } else {
// //       // Always show first page
// //       pages.push(1);
      
// //       if (currentPage > 4) {
// //         pages.push('...');
// //       }
      
// //       // Show pages around current page
// //       const start = Math.max(2, currentPage - 1);
// //       const end = Math.min(totalPages - 1, currentPage + 1);
      
// //       for (let i = start; i <= end; i++) {
// //         if (i !== 1 && i !== totalPages) {
// //           pages.push(i);
// //         }
// //       }
      
// //       if (currentPage < totalPages - 3) {
// //         pages.push('...');
// //       }
      
// //       // Always show last page
// //       if (totalPages > 1) {
// //         pages.push(totalPages);
// //       }
// //     }
    
// //     return pages;
// //   };

// //   const visiblePages = getVisiblePages();

// //   return (
// //     <div className="flex items-center justify-center gap-4 py-8">
// //       {/* Previous Button */}
// //       <button
// //         onClick={() => onPageChange(currentPage - 1)}
// //         disabled={currentPage === 1}
// //         className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
// //           currentPage === 1
// //             ? 'border-gray-200 text-gray-400 cursor-not-allowed'
// //             : 'border-blue-200 text-blue-600 hover:bg-blue-50'
// //         }`}
// //       >
// //         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
// //         </svg>
// //         Previous
// //       </button>

// //       {/* Page Numbers */}
// //       <div className="flex items-center bg-gray-100 rounded-full px-2 py-1">
// //         {visiblePages.map((page, index) => (
// //           <React.Fragment key={index}>
// //             {page === '...' ? (
// //               <span className="px-3 py-2 text-gray-500">...</span>
// //             ) : (
// //               <button
// //                 onClick={() => onPageChange(page as number)}
// //                 className={`min-w-[40px] h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
// //                   currentPage === page
// //                     ? 'bg-blue-600 text-white'
// //                     : 'text-gray-600 hover:bg-gray-200'
// //                 }`}
// //               >
// //                 {page}
// //               </button>
// //             )}
// //           </React.Fragment>
// //         ))}
// //       </div>

// //       {/* Next Button */}
// //       <button
// //         onClick={() => onPageChange(currentPage + 1)}
// //         disabled={currentPage === totalPages}
// //         className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
// //           currentPage === totalPages
// //             ? 'border-gray-200 text-gray-400 cursor-not-allowed'
// //             : 'border-blue-200 text-blue-600 hover:bg-blue-50'
// //         }`}
// //       >
// //         Next
// //         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
// //         </svg>
// //       </button>
// //     </div>
// //   );
// // };

// import React from 'react';

// interface PaginationProps {
//   currentPage: number;
//   totalPages: number;
//   onPageChange: (page: number) => void;
// }

// export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
//   const getVisiblePages = () => {
//     const pages = [];
//     const maxVisible = 7;

//     if (totalPages <= maxVisible) {
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(i);
//       }
//     } else {
//       pages.push(1);

//       if (currentPage > 4) {
//         pages.push('...');
//       }

//       const start = Math.max(2, currentPage - 1);
//       const end = Math.min(totalPages - 1, currentPage + 1);

//       for (let i = start; i <= end; i++) {
//         if (i !== 1 && i !== totalPages) {
//           pages.push(i);
//         }
//       }

//       if (currentPage < totalPages - 3) {
//         pages.push('....');
//       }

//       if (totalPages > 1) {
//         pages.push(totalPages);
//       }
//     }

//     return pages;
//   };

//   const visiblePages = getVisiblePages();

//   return (
//     <div className="flex items-center justify-center gap-52 px-8 py-8 mt-12">

//       {/* Previous Button */}
//       <button
//         onClick={() => onPageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//         className={`flex items-center gap-2 px-5 py-2.5 rounded-full border-2 text-sm font-semibold transition-colors ${
//           currentPage === 1
//             ? 'border-gray-200 text-gray-400 cursor-not-allowed'
//             : 'border-blue-400 text-blue-500 hover:bg-blue-50'
//         }`}
//       >
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//         </svg>
//         Previous
//       </button>

//       {/* Page Numbers Container */}
//       <div className="flex items-center border-2 border-blue-300 rounded-full px-3 py-1.5 gap-1">
//         {visiblePages.map((page, index) => (
//           <React.Fragment key={index}>
//             {page === '....' ? (
//               <span className="px-2 py-1 text-gray-500 text-sm tracking-widest">. . . .</span>
//             ) : (
//               <button
//                 onClick={() => onPageChange(page as number)}
//                 className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
//                   currentPage === page
//                     ? 'bg-blue-500 text-white'
//                     : 'text-gray-600 hover:bg-blue-50'
//                 }`}
//               >
//                 {page}
//               </button>
//             )}
//           </React.Fragment>
//         ))}
//       </div>

//       {/* Next Button */}
//       <button
//         onClick={() => onPageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//         className={`flex items-center gap-2 px-5 py-2.5 rounded-full border-2 text-sm font-semibold transition-colors ${
//           currentPage === totalPages
//             ? 'border-gray-200 text-gray-400 cursor-not-allowed'
//             : 'border-blue-400 text-blue-500 hover:bg-blue-50'
//         }`}
//       >
//         Next
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//         </svg>
//       </button>

//     </div>
//   );
// };

import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const getVisiblePages = () => {
    const pages = [];
    const maxVisible = 7;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 4) {
        pages.push('...');
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 3) {
        pages.push('....');
      }

      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center gap-4 lg:gap-52 px-8 py-8 mt-12">

      {/* Previous Button — arrow only on mobile, full text on desktop */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center gap-2 px-3 lg:px-5 py-2.5 rounded-full border-2 text-sm font-semibold transition-colors ${
          currentPage === 1
            ? 'border-gray-200 text-gray-400 cursor-not-allowed'
            : 'border-blue-400 text-blue-500 hover:bg-blue-50'
        }`}
      >
        <ChevronLeftIcon className="w-4 h-4" />
        {/* Hide text on mobile, show on desktop */}
        <span className="hidden lg:inline">Previous</span>
      </button>

      {/* Page Numbers Container */}
      <div className="flex items-center border-2 border-blue-300 rounded-full px-3 py-1.5 gap-1">
        {visiblePages.map((page, index) => (
          <React.Fragment key={index}>
            {page === '....' ? (
              <span className="px-2 py-1 text-gray-500 text-sm tracking-widest">. . . .</span>
            ) : (
              <button
                onClick={() => onPageChange(page as number)}
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  currentPage === page
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-blue-50'
                }`}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Next Button — arrow only on mobile, full text on desktop */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center gap-2 px-3 lg:px-5 py-2.5 rounded-full border-2 text-sm font-semibold transition-colors ${
          currentPage === totalPages
            ? 'border-gray-200 text-gray-400 cursor-not-allowed'
            : 'border-blue-400 text-blue-500 hover:bg-blue-50'
        }`}
      >
        {/* Hide text on mobile, show on desktop */}
        <span className="hidden lg:inline">Next</span>
        <ChevronRightIcon className="w-4 h-4" />
      </button>

    </div>
  );
};