'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  return (
    <div className="flex items-center justify-end gap-2 mt-8 mb-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 text-sm text-gray-500 bg-white border border-gray-200 rounded-full hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      <div className="flex items-center gap-1">
        {currentPage > 1 && (
          <button
            onClick={() => onPageChange(1)}
            className="w-8 h-8 text-sm text-gray-500 bg-white border border-gray-200 rounded-full hover:bg-gray-50 flex items-center justify-center"
          >
            1
          </button>
        )}

        <button
          className="w-8 h-8 text-sm text-white bg-blue-500 rounded-full flex items-center justify-center"
        >
          {currentPage}
        </button>

        {currentPage < totalPages && (
          <button
            onClick={() => onPageChange(currentPage + 1)}
            className="w-8 h-8 text-sm text-gray-500 bg-white border border-gray-200 rounded-full hover:bg-gray-50 flex items-center justify-center"
          >
            {currentPage + 1}
          </button>
        )}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 text-sm text-gray-500 bg-white border border-gray-200 rounded-full hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination; 