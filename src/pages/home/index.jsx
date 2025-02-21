import Layaout from "@/components/Layaout/Layaout";
import Loader from "@/components/Loader/Loader";
import Slider from "@/components/Slider/Slider";
import {
  filterByCategory,
  getAllProducts,
} from "@/redux/products/productsSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Index = () => {
  const statusAllProducts = useSelector(
    (state) => state.products.statusAllProducts
  );

  return (
    <>
      <Layaout>
        <Slider />
        {statusAllProducts === "pending" ? (
          <Loader />
        ) : (
          <section className="py-10 bg-gray-100">
            {/* Renderiza tus productos aquí */}
          </section>
        )}
      </Layaout>
    </>
  );
};

export default Index;
