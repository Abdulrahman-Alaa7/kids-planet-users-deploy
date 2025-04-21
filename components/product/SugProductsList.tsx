import React, { FC } from "react";
import { useTranslations } from "next-intl";
import { ProductsHome } from "../ProductsHome";
import { BsBalloonHeartFill } from "react-icons/bs";
// import { Skeleton } from "../ui/skeleton";
import { Badge } from "../ui/badge";
import { Link } from "../../i18n/routing";
import { FaStore } from "react-icons/fa";

type Props = {
  SugProducts: any;
};

export const SugProductsList: FC<Props> = ({ SugProducts }: any) => {
  const tHomeProducts = useTranslations("HomeProducts");
  const tHeader = useTranslations("AllHeader");

  return (
    <div className="fadeIn">
      <h3 className="flex justify-center items-center gap-2 text-white bg-[#e70767]  mx-auto  p-[7px] px-4 w-fit  font-bold text-lg  rounded-full  mb-4 mt-12">
        <BsBalloonHeartFill />
        {tHomeProducts("SugForYou")}
      </h3>
      <>
        {SugProducts?.length > 0 ? (
          <div
            dir="ltr"
            className="my-12 grid grid-flow-row gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
          >
            {SugProducts?.slice(0, 4).map((product: any) => (
              <div className="fadeIn" key={product.id}>
                <ProductsHome product={product} isQuickCard={true} />
              </div>
            ))}
          </div>
        ) : (
          <>
            <p className="flex justify-center items-center mx-auto my-12">
              {tHomeProducts("noProducts")}
            </p>
          </>
        )}
      </>
      <Link href={`/store`}>
        <Badge
          variant={`outline`}
          className="font-normal rounded-3xl mb-5 mx-auto gap-2 text-white text-[18px] bg-primary hover:bg-[#e70767]  hover:text-white  w-[250px] flex justify-center items-center py-2"
        >
          <FaStore />
          {tHeader("store")}
        </Badge>
      </Link>
    </div>
  );
};

export default SugProductsList;
