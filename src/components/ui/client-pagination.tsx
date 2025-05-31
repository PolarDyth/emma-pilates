"use client"

import { ChevronLeft, ChevronRight } from "lucide-react";

interface ClientPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function ClientPagination({ currentPage, totalPages, onPageChange }: ClientPaginationProps) {
  // Don't render pagination if there's only one page
  if (totalPages <= 1) return null;

  return (
    <nav className="flex justify-center items-center gap-2 sm:gap-3 py-8" aria-label="Pagination">
      {/* Previous */}
      {currentPage > 1 ? (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="group flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-muted-foreground bg-white/80 backdrop-blur-sm border border-border/50 rounded-full hover:bg-primary/5 hover:text-primary hover:border-primary/20 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary/50"
        >
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          <span className="hidden sm:inline">Previous</span>
        </button>
      ) : (
        <div className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-muted-foreground/40 bg-muted/50 border border-border/30 rounded-full cursor-not-allowed">
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Previous</span>
        </div>
      )}

      {/* Page numbers */}
      <div className="flex items-center gap-1 sm:gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
          // Show first page, current page ± 1, and last page
          if (
            page === 1 ||
            page === totalPages ||
            (page >= currentPage - 1 && page <= currentPage + 1)
          ) {
            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`min-w-[44px] h-11 flex items-center justify-center text-sm font-semibold rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 ${
                  page === currentPage
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105"
                    : "text-muted-foreground bg-white/80 backdrop-blur-sm border border-border/50 hover:bg-primary/5 hover:text-primary hover:border-primary/20 hover:scale-105"
                }`}
              >
                {page}
              </button>
            );
          } else if (page === currentPage - 2 || page === currentPage + 2) {
            return (
              <div key={page} className="flex items-center justify-center text-muted-foreground/60 px-2 py-1">
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-current rounded-full opacity-60"></div>
                  <div className="w-1 h-1 bg-current rounded-full opacity-40"></div>
                  <div className="w-1 h-1 bg-current rounded-full opacity-60"></div>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* Next */}
      {currentPage < totalPages ? (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="group flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-muted-foreground bg-white/80 backdrop-blur-sm border border-border/50 rounded-full hover:bg-primary/5 hover:text-primary hover:border-primary/20 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary/50"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      ) : (
        <div className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-muted-foreground/40 bg-muted/50 border border-border/30 rounded-full cursor-not-allowed">
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-4 w-4" />
        </div>
      )}
    </nav>
  );
} 