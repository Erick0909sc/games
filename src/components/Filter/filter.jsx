const Filter = ({ selectedCategories, handleCategoryChange }) => {
  return (
    <div className="relative">
      <details className="group [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex cursor-pointer items-center gap-2 border-gray-400 pb-0 text-gray-900 transition hover:border-gray-600">
          <span className="text-sm font-medium">Categorias</span>
          <span className="transition group-open:-rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </span>
        </summary>

        <div className="z-50 group-open:absolute group-open:start-0 group-open:top-auto group-open:mt-2">
          <div className="w-80 sm:w-80 rounded border border-gray-200 bg-white">
            <ul className="space-y-1 border-t border-gray-200 p-4">
              <li>
                <label
                  htmlFor="FilterInStock"
                  className={`inline-flex items-center gap-2 ${
                    selectedCategories.todos ? "font-bold" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    id="FilterInStock"
                    className="h-5 w-5 rounded border-gray-300"
                    checked={selectedCategories.todos}
                    onChange={() => handleCategoryChange("todos")}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Todos
                  </span>
                </label>
              </li>

              <li>
                <label
                  htmlFor="FilterPreOrder"
                  className={`inline-flex items-center gap-2 ${
                    selectedCategories.videojuegos ? "font-bold" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    id="FilterPreOrder"
                    className="h-5 w-5 rounded border-gray-300"
                    checked={selectedCategories.videojuegos}
                    onChange={() => handleCategoryChange("videojuegos")}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Videojuegos
                  </span>
                </label>
              </li>

              <li>
                <label
                  htmlFor="FilterOutOfStock"
                  className={`inline-flex items-center gap-2 ${
                    selectedCategories.consolas ? "font-bold" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    id="FilterOutOfStock"
                    className="h-5 w-5 rounded border-gray-300"
                    checked={selectedCategories.consolas}
                    onChange={() => handleCategoryChange("consolas")}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Consolas
                  </span>
                </label>
              </li>

              <li>
                <label
                  htmlFor="FilterOutOfStock"
                  className={`inline-flex items-center gap-2 ${
                    selectedCategories.accesorios ? "font-bold" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    id="FilterOutOfStock"
                    className="h-5 w-5 rounded border-gray-300"
                    checked={selectedCategories.accesorios}
                    onChange={() => handleCategoryChange("accesorios")}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Accesorios
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>
      </details>
    </div>
  );
};

export default Filter;
