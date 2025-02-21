import Layaout from "@/components/Layaout/Layaout";
import Pagination from "@/components/Pagination/pagination";
import { getAllProducts } from "@/redux/products/productsSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import usePagination from "@/components/hooks/usePagination";
import useFilter from "@/components/hooks/useFilter";
import Filter from "@/components/Filter/filter"; // Importar el componente de filtro

const Index = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products.products);

  // Lógica de filtrado
  const { selectedCategories, handleCategoryChange, filterItems } = useFilter({
    todos: true,
    videojuegos: false,
    consolas: false,
    accesorios: false,
  });

  // Lógica de paginación
  const productsPerPage = 10;
  const filteredProducts = filterItems(allProducts);
  const {
    currentItems: currentProducts,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    setCurrentPage,
  } = usePagination(filteredProducts, productsPerPage);

  // Obtener productos al montar el componente
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]); // Dependencia: filteredProducts

  return (
    <>
      <Layaout>
        <div className="flex flex-col md:flex-row justify-start md:justify-center gap-8 py-8">
          {/* Usar el componente de filtro */}
          <Filter
            selectedCategories={selectedCategories}
            handleCategoryChange={handleCategoryChange}
          />
        </div>

        <section className="bg-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {currentProducts.map((product, index) => (
              <div key={index} className="flex flex-col items-center p-2">
                <article className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300">
                  <a href="#">
                    <div className="relative flex items-end overflow-hidden rounded-xl">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-64 h-64"
                      />
                    </div>

                    <div className="mt-1 p-2">
                      <h2 className="text-slate-700">{product.name}</h2>
                      <p className="mt-1 text-sm text-slate-400">
                        {product.category}
                      </p>

                      <div className="mt-3 flex items-end justify-between">
                        <p className="text-lg font-bold text-blue-500">
                          ${product.price}
                        </p>

                        <div className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
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
                              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                            />
                          </svg>

                          <button className="text-sm">Add to cart</button>
                        </div>
                      </div>
                    </div>
                  </a>
                </article>
              </div>
            ))}
          </div>
        </section>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          nextPage={nextPage}
          prevPage={prevPage}
          setCurrentPage={setCurrentPage}
        />
      </Layaout>
    </>
  );
};

export default Index;
