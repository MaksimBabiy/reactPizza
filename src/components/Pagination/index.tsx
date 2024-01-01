import React from "react";
import styles from "./Pagination.module.scss";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../redux/slices/filterSlice";
type PaginationType = {
  currentPage: number;
};
const Pagination: React.FC<PaginationType> = ({ currentPage }) => {
  const dispach = useDispatch();

  return (
    <ReactPaginate
      breakLabel="..."
      className={styles.root}
      nextLabel=">"
      onPageChange={(e) => dispach(setCurrentPage(e.selected + 1))}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={currentPage - 1}
      previousLabel="<"
    />
  );
};

export default Pagination;
