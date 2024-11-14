"use client"
import "./pagination.css";

export default function Pagination({ listCount, currentPage, nextPage }: {
  listCount: number,
  currentPage: number,
  nextPage({ nextPage }: { nextPage: number }): void,
}
) {
  const pages = Array.from({ length: Math.ceil(listCount / 10) }, (v, k) => k + 1);

  function handleNextPage({ nextPageNumber, willPrevieous, willGoNext }: { nextPageNumber?: number, willPrevieous?: boolean, willGoNext?: boolean }): void {

    if (willPrevieous) {
      if (currentPage === 1) return;
      nextPage({ nextPage: currentPage - 1 });
      return;
    }

    if (willGoNext) {
      if (currentPage === pages.length) return;
      nextPage({ nextPage: currentPage + 1 });
      return;
    };

    if (nextPageNumber) nextPage({ nextPage: nextPageNumber });
  }

  return (
    <div className="pagination-box">
      <div className="pagination">
        <button onClick={() => handleNextPage({ willPrevieous: true })}>&laquo;</button>
        {pages.map((page) => (<button key={page} className={currentPage === page ? "active" : ""} onClick={() => handleNextPage({ nextPageNumber: page })}>{page}</button>))}
        <button onClick={() => handleNextPage({ willGoNext: true })}>&raquo;</button>
      </div>
    </div>
  );
}