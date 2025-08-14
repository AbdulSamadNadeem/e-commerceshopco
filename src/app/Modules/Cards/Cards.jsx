"use client";
import React, { useEffect } from "react";
import { CiStar } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { urlgen } from "../../../../sanityclient";

const Cards = ({ type }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const allProducts = useSelector(
    (state) => state.All_Product_Reducer.AllProducts
  );

  const productsWithImageUrls = allProducts?.map((product) => ({
    ...product,
    imageUrl: urlgen(product?.image)?.url(),
  }));

  const Data = (() => {
    switch (type) {
      case "newarrival":
        return productsWithImageUrls?.slice(0, 8);
      case "topselling":
        return productsWithImageUrls?.slice(8, 16);
      case "also":
        return productsWithImageUrls?.slice(9, 17);
      default:
        return productsWithImageUrls;
    }
  })();

  const filter = (value) => {
    dispatch({ type: "select", payload: value });
    setTimeout(() => {
      router.push("/details");
    }, 2000);
  };

  useEffect(() => {
     AOS.init({ once: true });
  }, []);

  if (!productsWithImageUrls || productsWithImageUrls.length === 0) {
    return (
      <div className="flex justify-center items-center mt-8 text-black text-xl font-light">
        Loading...
      </div>
    );
  }

  return (
    <div
      className="flex flex-wrap justify-center gap-16 mt-8 cursor-pointer"
      data-aos="fade-right"
    >
      {Data?.map((items, index) => (
        <div
          onClick={() => filter(items)}
          key={index}
          className="hover:scale-110 duration-300"
        >
          <div className="border rounded-lg">
            <img
              src={items?.imageUrl}
              alt=""
              className="w-56 h-56 object-contain"
            />
          </div>
          <div>
            <p className="text-black text-xl font-light">
              {items?.title?.slice(0, 20)}
            </p>
            <p className="text-black font-light text-xl">
              <ins>${items?.price}</ins>{" "}
              <del className="text-[#b2bec3]">
                ${Math.floor(items?.price + 10)}
              </del>
            </p>
            <p className="flex items-center">
              {Array.from(
                { length: Math.floor(items?.rating?.rate) },
                (_, index) => (
                  <CiStar
                    className="text-yellow-400 text-3xl"
                    key={index}
                  />
                )
              )}{" "}
              <span>{items?.rating?.count}</span>
            </p>
          </div>
        </div>
      ))}

      <button
        onClick={() => router.push("/details")}
        className="w-56 h-12 rounded-2xl bg-black text-xl text-center animate__animated animate__fadeIn hover:scale-105 text-white font-light duration-300"
      >
        See More
      </button>
    </div>
  );
};

export default Cards;

