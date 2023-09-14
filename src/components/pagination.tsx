import { Dispatch, SetStateAction } from "react";

const Pagination = ({
  totalPosts,
  postPerPage,
  setCurrentPage,
  currentPage,
}: {
  totalPosts: number;
  postPerPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  currentPage: number;
}) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pages.push(i);
  }
  return (
    <div className="bottom-0 flex justify-center items-center">
      {pages.map((page, index) => {
        return (
          <button
            key={index}
            onClick={() => setCurrentPage(page)}
            className={
              page == currentPage
                ? "active bg-yellow-500 p-3 text-white"
                : "bg-black text-white p-3"
            }
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};
export default Pagination;
