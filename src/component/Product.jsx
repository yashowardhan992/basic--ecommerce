import React from "react";
import { useState } from "react";
import product_data from "../data/prodData";
import toast from "react-hot-toast";
import { CartProvider, useCart } from "react-use-cart";
const Product = (props) => {
  const { addItem, inCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("default"); // default, ratings, priceHighToLow, priceLowToHigh

  // Function to sort products by ratings in descending order
  const sortProductsByRatings = () => {
    const sortedProducts = [...product_data].sort(
      (a, b) => b.rating.rate - a.rating.rate
    );
    return sortedProducts;
  };

  // Function to sort products by price in descending order
  const sortProductsByPriceHighToLow = () => {
    const sortedProducts = [...product_data].sort((a, b) => b.price - a.price);
    return sortedProducts;
  };

  // Function to sort products by price in ascending order
  const sortProductsByPriceLowToHigh = () => {
    const sortedProducts = [...product_data].sort((a, b) => a.price - b.price);
    return sortedProducts;
  };

  // Function to handle category selection
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Function to handle sorting option change
  const handleSortChange = (sortOption) => {
    setSortBy(sortOption);
  };

  const resetFilters = () => {
    setSelectedCategory("");
    setSortBy("default");
  };

  // Filter and sort products based on category and sorting option
  let filteredProducts = product_data;

  if (sortBy === "ratings") {
    filteredProducts = sortProductsByRatings();
  } else if (sortBy === "priceHighToLow") {
    filteredProducts = sortProductsByPriceHighToLow();
  } else if (sortBy === "priceLowToHigh") {
    filteredProducts = sortProductsByPriceLowToHigh();
  }
  if (selectedCategory !== "") {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === selectedCategory
    );
  }
  const handleClick = (product, title) => {
    addItem(product);
    toast.success(` ${title} added to the cart.`);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Products
          </h2>
          <div className="flex flex-col md:flex-row justify-between lg:gap-x-5 lg:space-x-5 md:my-2 text-xs md:text-base  leading-4 ">
            <select
              className="font-normal tracking-tight text-gray-900"
              onChange={handleCategoryChange}
              value={selectedCategory}
            >
              <option className="font-light" value="">
                Categories
              </option>
              {[...new Set(product_data.map((c) => c.category))].map(
                (category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                )
              )}
            </select>

            <button
              className={`font-normal tracking-tight text-gray-900${
                sortBy === "ratings" && "font-bold"
              }`}
              onClick={() => handleSortChange("ratings")}
            >
              Ratings
            </button>
            <button
              className={`font-normal tracking-tight text-gray-900 ${
                sortBy === "priceHighToLow" && "font-bold"
              }`}
              onClick={() => handleSortChange("priceHighToLow")}
            >
              Price: High to Low
            </button>
            <button
              className={`font-normal tracking-tight text-gray-900 ${
                sortBy === "priceLowToHigh" && "font-bold"
              }`}
              onClick={() => handleSortChange("priceLowToHigh")}
            >
              Price: Low to High
            </button>
            <button
              className="font-normal tracking-tight text-gray-900"
              onClick={resetFilters}
            >
              Reset Filters
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {filteredProducts.map((product) => (
            <div>
              <div key={product.id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={product.image}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <a href={product.href}>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {product.category}
                        </a>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.color}
                      </p>
                    </div>
                    <p className="text-sm mb-2 font-medium text-gray-900">
                      ${product.price}
                    </p>
                  </div>
                  <p className="mt-1 mb-2 text-sm text-gray-900">
                    {`${product.rating.rate}\u{2B50} `}
                  </p>
                </div>
              </div>
              <div className="mt-10 ">
                {inCart(product.id) ? (
                  <p className="text-indigo-600">In Cart</p>
                ) : (
                  <button
                    type="button"
                    className="block w-full self-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => handleClick(product, product.title)}
                  >
                    Add To Cart
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
