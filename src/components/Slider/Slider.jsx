import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { getAllProducts } from "@/redux/products/productsSlice";
import gsap from "gsap";
import Addcart from "../Addcart";

const Slider = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products.slice(0, 8));
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    gsap.from(sliderRef.current, {
      opacity: 0,
      duration: 1,
      delay: 0.5,
      y: -20,
    });
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  const handleNext = () => {
    if (currentSlide === products.length - 1) {
      setCurrentSlide(0);
      gsap.to(sliderRef.current, {
        x: 0,
        duration: 1,
        ease: "power3.out",
      });
    } else {
      setCurrentSlide(currentSlide + 1);
      gsap.to(sliderRef.current, {
        x: `-${currentSlide + 1}00%`,
        duration: 1,
        ease: "power3.out",
      });
    }
  };

  const handlePrev = () => {
    if (currentSlide === 0) {
      setCurrentSlide(products.length - 1);
      gsap.to(sliderRef.current, {
        x: `-${(products.length - 1) * 100}%`,
        duration: 1,
        ease: "power3.out",
      });
    } else {
      setCurrentSlide(currentSlide - 1);
      gsap.to(sliderRef.current, {
        x: `-${(currentSlide - 1) * 100}%`,
        duration: 1,
        ease: "power3.out",
      });
    }
  };

  return (
    <div className="slider-container">
      <Carousel
        responsive={responsive}
        ref={sliderRef}
        containerClass="carousel-container"
        itemClass="carousel-item"
      >
        {products.map((product, index) => (
          <div className="flex items-center justify-center" key={index}>
            <div className="relative mt-48 flex w-96 flex-col rounded-xl bg-blue bg-clip-border text-gray-700 shadow-md">
              <div className="relative h-96 overflow-hidden rounded-xl bg-blue bg-clip-border text-gray-700">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-6 bg-bg-sky-200">
                <div className="mb-8 flex items-center justify-between bg-blue">
                  <p className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                    {product.name}
                  </p>
                  <p className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                    {product.price}
                  </p>
                </div>
                <div
                  className="h-32 overflow-hidden"
                  style={{
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  <p className="block font-sans text-sm font-normal leading-normal text-gray-700 antialiased">
                    {product.description}
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0 bg-sky-200">
                <Addcart product={product} />
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;
