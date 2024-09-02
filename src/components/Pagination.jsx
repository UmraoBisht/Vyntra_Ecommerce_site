import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { ITEMS_PER_PAGE } from "../app/constant";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function Pagination({ page, handlePage, sort }) {
  const { totalItems } = useSelector((state) => state.product);
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const renderPageNumbers = () => {
    const pages = [];

    if (totalPages <= 7) {
      // Show all pages if totalPages is less than or equal to 7
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show the first page
      pages.push(1);

      // Show the ellipsis before the current page if it's not adjacent to the first page
      if (page > 4) {
        pages.push("...");
      }

      // Show the pages around the current page
      const startPage = Math.max(2, page - 2);
      const endPage = Math.min(totalPages - 1, page + 2);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Show the ellipsis after the current page if it's not adjacent to the last page
      if (page < totalPages - 3) {
        pages.push("...");
      }

      // Always show the last page
      pages.push(totalPages);
    }

    return pages;
  };

  useEffect(() => {
    handlePage(1);
  }, [totalItems, sort]);
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={() => handlePage(page > 1 ? page - 1 : page)}
        >
          Previous
        </button>
        <button
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={() => handlePage(page < totalPages ? page + 1 : page)}
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {(page - 1) * ITEMS_PER_PAGE + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {page * ITEMS_PER_PAGE > totalItems
                ? totalItems
                : page * ITEMS_PER_PAGE}
            </span>{" "}
            of <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          >
            <button
              onClick={() => handlePage(page > 1 ? page - 1 : page)}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
            </button>

            {renderPageNumbers().map((pageNumber, index) => (
              <button
                key={index}
                aria-current={pageNumber === page ? "page" : undefined}
                onClick={() => handlePage(pageNumber)}
                className={`relative cursor-pointer z-10 inline-flex items-center ${
                  page === pageNumber
                    ? "bg-indigo-600 text-white"
                    : "text-gray-900"
                } px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                disabled={pageNumber === "..."}
              >
                {pageNumber}
              </button>
            ))}

            <button
              onClick={() => handlePage(page < totalPages ? page + 1 : page)}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}

