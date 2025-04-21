"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import StoreImage from "../public/assets/store-page.jpg";
import { useLocale, useTranslations } from "next-intl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LayoutList, ListFilter } from "lucide-react";
import { ProductsHome } from "./ProductsHome";
import { Button } from "./ui/button";
import MainLoading from "./ui/main-loading";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../graphql/actions/queries/getProducts";
import { GET_ALL_CATEGORIES } from "../graphql/actions/queries/getAllCategories";
import { GET_TOP_SELLING } from "../graphql/actions/queries/filters/getTopSelling";

interface Product {
  id: string;
  name: string;
  price: number;
  estimatedPrice: number;
  createdAt: string;
  category?: { name: string };
}

interface Category {
  id: string;
  name: string;
}

const StorePage = () => {
  const {
    data: productsData,
    loading: loadingProducts,
    error: productsError,
  } = useQuery(GET_PRODUCTS);
  const {
    data: categoriesData,
    loading: loadingCategories,
    error: categoriesError,
  } = useQuery(GET_ALL_CATEGORIES);

  const { data, loading: getProductsLoading } = useQuery(GET_TOP_SELLING);

  const products = data?.getTopSelling;

  const Products: Product[] = productsData?.getProductsForClients || [];
  const categories: Category[] = categoriesData?.getAllCategories || [];

  const t = useTranslations("HomeProducts");
  const lang = useLocale();

  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const productsPerPage = 8;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Initialize filteredProducts when Products data is available
  useEffect(() => {
    if (Products.length > 0) {
      setFilteredProducts(Products);
    }
  }, [Products]);

  console.log(Products);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleFilter = (filterType: string) => {
    setLoading(true);
    const newProducts = [...Products];

    switch (filterType) {
      case t("productsFilterFeat"):
        setFilteredProducts(products);
        break;
      case t("productsFilCatDef"):
        setFilteredProducts(newProducts);
        break;
      case t("productsFilterAlphA"):
        setFilteredProducts(
          newProducts.sort((a, b) => a.name.localeCompare(b.name))
        );
        break;
      case t("productsFilterAlphZ"):
        setFilteredProducts(
          newProducts.sort((a, b) => b.name.localeCompare(a.name))
        );
        break;
      case t("productsFilterAlphPl"):
        setFilteredProducts(
          newProducts.sort((a, b) => {
            const priceA = a.estimatedPrice > 0 ? a.estimatedPrice : a.price;
            const priceB = b.estimatedPrice > 0 ? b.estimatedPrice : b.price;
            return priceA - priceB;
          })
        );
        break;
      case t("productsFilterAlphPh"):
        setFilteredProducts(
          newProducts.sort((a, b) => {
            const priceA = a.estimatedPrice > 0 ? a.estimatedPrice : a.price;
            const priceB = b.estimatedPrice > 0 ? b.estimatedPrice : b.price;
            return priceB - priceA;
          })
        );
        break;
      case t("productsFilterAlphPDo"):
        setFilteredProducts(
          newProducts.sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
        );
        break;
      case t("productsFilterAlphPDn"):
        setFilteredProducts(
          newProducts.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        );
        break;
      default:
        break;
    }
    setLoading(false);
  };

  const handleCategoryFilter = (category: string) => {
    setLoading(true);
    const newProducts =
      category === "all"
        ? Products
        : Products.filter((product) => product?.category?.name === category);
    setFilteredProducts(newProducts);
    setLoading(false);
  };

  const isLoading = loading || loadingProducts || loadingCategories;

  if (productsError || categoriesError) {
    return (
      <div className="flex justify-center items-center my-12">
        <p className="text-red-500">ُSomething went wrong</p>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="relative w-full h-[200px] overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <Image
          src={StoreImage}
          alt="Store Banner"
          className="object-cover object-center w-full h-full"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-3xl md:text-5xl text-white font-bold">
            {t("allProductsTitle")}
          </h1>
          <p className="text-sm md:text-xl text-white mt-4">
            {t("allProductsDesc")}
          </p>
        </div>
      </div>

      <div className="flex justify-center w-[330px] md:w-[450px] gap-4 items-center mx-auto my-6">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex justify-center items-center mx-auto gap-2 w-full font-semibold bg-secondary py-3 rounded-xl hover:opacity-80">
            <ListFilter />
            {t("productsFilter")}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[170px] md:w-[220px] rounded-3xl p-4">
            {[
              t("productsFilCatDef"),
              t("productsFilterFeat"),
              t("productsFilterAlphA"),
              t("productsFilterAlphZ"),
              t("productsFilterAlphPl"),
              t("productsFilterAlphPh"),
              t("productsFilterAlphPDo"),
              t("productsFilterAlphPDn"),
            ].map((filter) => (
              <DropdownMenuItem
                key={filter}
                className={`${
                  lang === "ar" ? "!text-[10px]" : "!text-[13px]"
                } md:text-md mx-auto flex justify-center items-center cursor-pointer`}
                onClick={() => handleFilter(filter)}
              >
                {filter}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex justify-center items-center mx-auto gap-2 w-full font-semibold bg-secondary py-3 rounded-xl hover:opacity-80">
            <LayoutList />
            {t("productsFilCat")}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[170px] md:w-[220px] rounded-3xl p-4">
            <DropdownMenuItem
              className="text-[13px] md:text-md mx-auto flex justify-center items-center cursor-pointer"
              onClick={() => handleCategoryFilter("all")}
            >
              {t("productsFilCatAll")}
            </DropdownMenuItem>
            {categories.map((category) => (
              <DropdownMenuItem
                key={category.id}
                className="text-[13px] md:text-md mx-auto flex justify-center items-center cursor-pointer"
                onClick={() => handleCategoryFilter(category.name)}
              >
                {category.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div>
        {isLoading ? (
          <div className="flex justify-center items-center my-12">
            <MainLoading />
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="my-12 grid grid-flow-row gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 px-3 pb-6">
            {currentProducts.map((product) => (
              <div className="fadeIn" key={product.id}>
                <ProductsHome product={product} isQuickCard={true} />
              </div>
            ))}
          </div>
        ) : (
          <p className="flex justify-center items-center mx-auto my-12">
            {t("noProducts")}
          </p>
        )}
        {filteredProducts.length > productsPerPage && (
          <div
            className={`flex justify-between items-center pb-6 px-6 ${
              lang === "ar" && "flex-row-reverse"
            } my-3 md:w-[50%] w-full mx-auto`}
          >
            <Button
              variant="default"
              type="button"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              {t("prevPageBtn")}
            </Button>
            <div className="bg-border shadow text-black dark:text-white p-2 rounded-3xl font-semibold">
              {currentPage} / {totalPages}
            </div>
            <Button
              variant="default"
              type="button"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              {t("nextPageBtn")}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StorePage;
