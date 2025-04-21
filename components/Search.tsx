"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Badge } from "./ui/badge";
import { Link } from "../i18n/routing";
import { ScanSearch, StoreIcon } from "lucide-react";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../graphql/actions/queries/getProducts";
import { useSearchParams } from "next/navigation";
import MainLoading from "./ui/main-loading";
import { ProductsHome } from "./ProductsHome";

type Props = {};

const Search = (props: Props) => {
  const searchParams = useSearchParams();
  const search = searchParams?.get("search");
  const tHeader = useTranslations("AllHeader");

  const { data, loading: getProductsLoading } = useQuery(GET_PRODUCTS);

  const products = useMemo(() => data?.getProductsForClients || [], [data]);

  const [searchValue, setSearchValue] = useState<any[]>([]);
  const [loading, setLoading] = useState<any>(false);

  useEffect(() => {
    if (search) {
      setLoading(true);
      setSearchValue(
        products.filter((item: any) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        )
      );
      setLoading(false);
    }
  }, [products, search]);

  return (
    <div className="fadeIn mt-6 px-4 md:px-12 ">
      <h1
        className={`1200px:text-[70px] 1100px:text-[60px] pb-6 1000px:text-[50px] 800px:text-[45px] 600px:text-[40px] text-[35px] font-bold  gradient-text  text-center tracking-tight `}
      >
        {tHeader("searchTitle")}
      </h1>

      {getProductsLoading || loading ? (
        <div className="flex justify-center items-center mx-auto my-6">
          <MainLoading />
        </div>
      ) : (
        <>
          {searchValue?.length > 0 ? (
            <div
              dir="ltr"
              className={`grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 transition-all  pb-8`}
            >
              {searchValue?.map((game: any) => (
                <div className="fadeIn " key={game.id}>
                  <ProductsHome product={game} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center mx-auto ">
              <ScanSearch size={120} className="text-muted-foreground" />
              <p className="flex justify-center items-center mx-auto mt-6 text-[25px] my-3 font-bold text-muted-foreground">
                {tHeader("searchResults")}
              </p>
            </div>
          )}
        </>
      )}

      <div className="flex justify-center items-center my-8">
        <Link href={`/store`}>
          <Badge
            variant={`outline`}
            className=" gap-2  rounded-3xl font-normal text-white text-[18px] bg-primary hover:bg-[#e70767] hover:text-white dark:hover:text-black dark:text-white w-[250px] flex justify-center items-center py-2"
          >
            <StoreIcon size={18} />
            {tHeader("store")}
          </Badge>
        </Link>
      </div>
    </div>
  );
};

export default Search;
