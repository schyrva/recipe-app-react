import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (selectedPage: number) => void;
}

export function Pagination({
  pageCount,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const handlePageChange = ({ selected }: { selected: number }) => {
    onPageChange(selected);
  };

  if (pageCount <= 1) {
    return null;
  }

  return (
    <ReactPaginate
      previousLabel={<ChevronLeft size={16} />}
      nextLabel={<ChevronRight size={16} />}
      breakLabel="..."
      pageCount={pageCount}
      marginPagesDisplayed={1}
      pageRangeDisplayed={7}
      onPageChange={handlePageChange}
      forcePage={currentPage}
      containerClassName="flex justify-center items-center gap-1 mt-8"
      pageClassName="flex"
      pageLinkClassName="w-10 h-10 flex items-center justify-center rounded-md hover:bg-muted transition-colors cursor-pointer"
      activeClassName="bg-primary text-primary-foreground rounded-md"
      activeLinkClassName="hover:bg-primary cursor-pointer"
      previousClassName="flex"
      nextClassName="flex"
      previousLinkClassName="w-10 h-10 flex items-center justify-center rounded-md hover:bg-muted transition-colors cursor-pointer"
      nextLinkClassName="w-10 h-10 flex items-center justify-center rounded-md hover:bg-muted transition-colors cursor-pointer"
      breakClassName="flex"
      breakLinkClassName="w-10 h-10 flex items-center justify-center rounded-md hover:bg-muted transition-colors cursor-pointer"
      disabledClassName="opacity-50 cursor-not-allowed"
    />
  );
}
