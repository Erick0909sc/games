const Pagination = ({
  currentPage,
  totalPages,
  nextPage,
  prevPage,
  setCurrentPage,
}) => {
  return (
    <nav className="flex justify-center my-4">
      <ul className="flex space-x-2">
        <li>
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="flex items-center justify-center w-10 h-10 text-indigo-600 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-indigo-100"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
                fillRule="evenodd"
              ></path>
            </svg>
          </button>
        </li>
        {Array.from({ length: totalPages }, (_, i) => (
          <li key={i}>
            <button
              onClick={() => setCurrentPage(i + 1)}
              className={`w-10 h-10 text-indigo-600 transition-colors duration-150 rounded-full focus:shadow-outline ${
                currentPage === i + 1
                  ? "bg-indigo-600 text-white"
                  : "bg-white hover:bg-indigo-100"
              }`}
            >
              {i + 1}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center w-10 h-10 text-indigo-600 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-indigo-100"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
                fillRule="evenodd"
              ></path>
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
