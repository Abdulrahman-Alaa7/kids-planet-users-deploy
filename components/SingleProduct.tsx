"use client";
import React, {
  FC,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Minus, Plus, Text } from "lucide-react";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { useRouter } from "../i18n/routing";
import { AppContext } from "../app/utils/AppContext";
import { useLocale, useTranslations } from "next-intl";
import ShareButtons from "./ShareButtons";
import { toast } from "sonner";
import Heading from "../app/utils/Heading";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import MainLoading from "./ui/main-loading";
import { Gallery } from "./product/gallery";
import { ProductProvider } from "./product/product-context";
import SugProductsList from "./product/SugProductsList";
import { ProductType } from "./ProductsHome";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../graphql/actions/queries/getProducts";
import { GET_PRODUCT_BY_ID } from "../graphql/actions/queries/getProductById";

type Props = {
  id: any;
};

const SingleProduct: FC<Props> = ({ id }) => {
  const { data } = useQuery(GET_PRODUCTS);
  const products = data?.getProductsForClients;

  const { data: theProduct, loading: getProductsByIdLoading } = useQuery(
    GET_PRODUCT_BY_ID,
    {
      variables: { id },
    }
  );

  const product = theProduct?.getProductByIdForClients?.product;

  const sugProducts = theProduct?.getProductByIdForClients?.randomProducts;

  const lang = useLocale();
  const tHeader = useTranslations("AllHeader");
  const tHomeProducts = useTranslations("HomeProducts");

  const {
    shippingList,
    wishingList,
    handleAddNewItemShipping,
    handleAddToWishingList,
    handleDeleteFromWishingList,
  } = useContext(AppContext);
  const [isExistInWish, setIsExistInWish] = useState<boolean>(false);
  const [order, setOrder] = useState<Array<any>>(shippingList);
  const [loadingBuy, setLoadingBuy] = useState(false);
  const [displayedQuantity, setDisplayedQuantity] = useState<number>(1);
  const router = useRouter();

  const [selectedColor, setSelectedColor] = useState<string>(
    product?.colors?.find((item: any) => !item.soldout)?.value || ""
  );

  const [selectedSize, setSelectedSize] = useState<string>(
    product?.sizes?.find((item: any) => !item.soldout)?.value || ""
  );

  useEffect(() => {
    if (product) {
      const firstAvailableColor = product?.colors?.find(
        (item: any) => !item.soldout
      )?.value;
      if (firstAvailableColor && !selectedColor) {
        setSelectedColor(firstAvailableColor);
      }

      const firstAvailableSize = product?.sizes?.find(
        (item: any) => !item.soldout
      )?.value;
      if (firstAvailableSize && !selectedSize) {
        setSelectedSize(firstAvailableSize);
      }
    }
  }, [product, selectedColor, selectedSize]);

  useEffect(() => {
    setOrder(shippingList);
  }, [shippingList, products]);

  const calculateDiscountPercentage = useCallback(
    (price: any, estimatedPrice: any) => {
      const discountAmount = price - estimatedPrice;
      return Math.round((discountAmount / price) * 100);
    },
    []
  );

  const discountPercentage = useMemo(
    () => calculateDiscountPercentage(product?.price, product?.estimatedPrice),
    [product?.price, product?.estimatedPrice, calculateDiscountPercentage]
  );

  const AddToList = useCallback(
    (item: any, size: string, color?: string) => {
      handleAddNewItemShipping(item, displayedQuantity, size, color);
      toast.success(tHeader("successAddedBag"));
      setDisplayedQuantity(1);
    },
    [handleAddNewItemShipping, tHeader, displayedQuantity]
  );

  const handleIncrease = useCallback(() => {
    setDisplayedQuantity((prev) => prev + 1);
  }, [shippingList]);

  const handleDecrease = useCallback(() => {
    if (displayedQuantity > 1) {
      setDisplayedQuantity((prev) => prev - 1);
    }
  }, [shippingList, displayedQuantity]);

  useEffect(() => {
    setDisplayedQuantity(1);
  }, [selectedSize, selectedColor]);

  const handleAddWishingList = useCallback(
    (item: any) => {
      handleAddToWishingList(item);
      toast.success(tHeader("successAddedFav"));
    },
    [handleAddToWishingList, tHeader]
  );

  const handleDeleteWishingList = useCallback(
    (id: any) => {
      handleDeleteFromWishingList(id);
      toast(tHeader("successDelFav"));
    },
    [handleDeleteFromWishingList, tHeader]
  );

  useEffect(() => {
    setIsExistInWish(wishingList.some((el: any) => el.id === product?.id));
  }, [wishingList, product?.id]);

  const handleSizeChange = (value: string) => {
    setSelectedSize(value);
  };

  const handleColorChange = (value: string) => {
    setSelectedColor(value);
  };

  const handleBuyItNow = (
    product: ProductType,
    size: string,
    color?: string
  ) => {
    setLoadingBuy(true);
    AddToList(product, size, color);
    router.push("/checkout");
    setLoadingBuy(false);
  };

  return (
    <>
      <Heading
        title={`${product?.name} - Kids Planet`}
        description="Kids Planet هو افضل مكان لبيع لبس الاطفال في مصر من حيث الجوده و السعر"
        keywords="kids planet, ملابس اطفال, لبس اطفال, اطفال, لبس , محلات لبس اطفال , كيدز بلانت, كيدز"
      />
      {getProductsByIdLoading ? (
        <div className="flex justify-center items-center mx-auto my-4 min-h-[400px]">
          <MainLoading />
        </div>
      ) : (
        <div className="fadeIn   md:mx-12 mx-2">
          <div className="w-full md:w-[98%]  mx-auto  mb-4 bg-white border border-neutral-200  rounded-3xl flex flex-col lg:flex-row gap-4  relative  px-4  pt-4 transition-all duration-500 ">
            <div
              className={` absolute ${
                lang === "ar" ? "left-3" : "right-3"
              } top-2 flex flex-col items-center gap-2 z-30`}
            >
              {isExistInWish ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        className="rounded-full w-10 h-10 flex justify-center items-center p-0 transition-all duration-300 shadow-md"
                        onClick={() => handleDeleteWishingList(product.id)}
                        aria-label="Remove From My WishList"
                      >
                        <IoIosHeart size={25} className="text-primary" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-black text-white">
                      <p>{tHomeProducts("deleteFromWishList")}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        className="rounded-full w-10 h-10 flex justify-center items-center p-0 transition-all duration-300 shadow-md"
                        onClick={() => handleAddWishingList(product)}
                        aria-label="Add To My WishList"
                      >
                        <IoIosHeartEmpty size={25} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-black text-white">
                      <p>{tHomeProducts("addToWishList")}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            <div className="relative lg:w-[55%] w-full ">
              <ProductProvider>
                <div className="mx-auto max-w-screen-2xl ">
                  <div className="flex !mx-auto items-center flex-col  p-2  lg:flex-row lg:gap-3 ">
                    <div className="h-full w-full ">
                      <Suspense
                        fallback={
                          <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden mx-auto" />
                        }
                      >
                        <Gallery
                          mainImage={{
                            src: product?.mainImage,
                            altText: product?.name,
                          }}
                          images={product?.images
                            .slice(0, 10)
                            .map((image: any, index: number) => ({
                              src: image,
                              altText: `${product?.name}_Image_${index}`,
                            }))}
                        />
                      </Suspense>
                    </div>
                  </div>
                </div>
              </ProductProvider>
              <div
                dir="ltr"
                className={` absolute ${
                  lang === "ar" ? "right-0" : "left-0"
                } top-0  flex  items-start gap-1 z-20 flex-col `}
              >
                {product?.soldOut === true && (
                  <Badge
                    variant={`default`}
                    className={`${
                      lang === "ar" && "flex-row-reverse"
                    } text-[14px] rounded-3xl bg-black dark:bg-white shadow-md dark:text-black text-white hover:!bg-primary hover:!text-white flex justify-center items-center gap-1`}
                  >
                    {tHomeProducts("soldOutBtn")}
                  </Badge>
                )}
              </div>
            </div>
            <div className="lg:w-[45%] md:mt-12 w-full flex flex-col gap-4 p-2 ">
              <div className="flex justify-center items-center mx-auto">
                <span className=" mb-2 text-2xl md:text-4xl 2xl:text-5xl font-medium ">
                  {product?.name}
                </span>
              </div>

              {product?.estimatedPrice > 0 ? (
                <div
                  dir={lang === "ar" ? "rtl" : "ltr"}
                  className="prices flex justify-center items-center mx-auto w-fit gap-3 mt-1 mb-2"
                >
                  <span className="font-semibold  line-through text-muted-foreground text-[16px] lg:text-[22px] px-4 py-1 flex justify-center items-center mx-auto">
                    {product.price} {tHeader("pound")}
                  </span>
                  <Badge
                    variant="secondary"
                    className="font-bold rounded-3xl text-[14px] lg:text-[22px] px-4 py-1 flex justify-center items-center mx-auto"
                  >
                    {product.estimatedPrice} {tHeader("pound")}
                  </Badge>
                  <Badge
                    variant="default"
                    className="text-white font-bold rounded-full py-1 flex justify-center items-center mx-auto "
                  >
                    {discountPercentage}% {tHomeProducts("offer")}
                  </Badge>
                </div>
              ) : (
                <div
                  dir={lang === "ar" ? "rtl" : "ltr"}
                  className="prices flex justify-center items-center gap-3 mt-1 mb-2 "
                >
                  <Badge
                    variant="secondary"
                    className="font-bold text-[14px] lg:text-[22px] px-4 py-1 rounded-3xl"
                  >
                    {product?.price} {tHeader("pound")}
                  </Badge>
                </div>
              )}

              {product?.sizes.length > 0 && (
                <div className={`fadeIn transition-all`}>
                  <p className="text-[18px] mb-4 text-gray-600 mx-auto flex justify-center items-center ">
                    ({tHomeProducts("size")})
                  </p>
                  <fieldset className="space-y-4">
                    <RadioGroup
                      className="grid grid-cols-3 gap-2"
                      value={selectedSize}
                      onValueChange={handleSizeChange}
                      dir={lang === "ar" ? "rtl" : "ltr"}
                    >
                      {product?.sizes?.map((item: any, index: any) => (
                        <label
                          key={index}
                          className=" rounded-3xl relative flex cursor-pointer flex-col items-center gap-3  border border-input px-2 py-3 text-center shadow-sm shadow-black/5 outline-offset-2 transition-colors has-[[data-disabled]]:cursor-not-allowed has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent has-[[data-disabled]]:opacity-50 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70"
                        >
                          <RadioGroupItem
                            id={index}
                            value={item?.value}
                            className="sr-only after:absolute after:inset-0"
                            disabled={item?.soldout}
                          />
                          <p className="text-sm text-[10px] md:text-[12px] font-medium leading-none text-foreground">
                            {item?.value}
                          </p>
                        </label>
                      ))}
                    </RadioGroup>
                  </fieldset>
                </div>
              )}
              {product?.colors.length > 0 && (
                <div className={`my1 fadeIn transition-all`}>
                  <p className="text-[18px] mb-4 text-gray-600 mx-auto flex justify-center items-center ">
                    ({tHomeProducts("colors")})
                  </p>
                  <fieldset className="space-y-4">
                    <RadioGroup
                      className="flex flex-wrap px-4 gap-2 w-fit mx-auto"
                      value={selectedColor}
                      onValueChange={handleColorChange}
                      dir={lang === "ar" ? "rtl" : "ltr"}
                    >
                      {product?.colors?.map((item: any, index: any) => (
                        <label
                          key={index}
                          className={`rounded-3xl relative flex cursor-pointer flex-col items-center gap-3  border border-input p-2 text-center shadow-sm shadow-black/5 outline-offset-2 transition-colors has-[[data-disabled]]:cursor-not-allowed has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent has-[[data-disabled]]:opacity-50 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70`}
                        >
                          <RadioGroupItem
                            id={index}
                            value={item.value}
                            className="sr-only after:absolute after:inset-0"
                            disabled={item?.soldout}
                          />
                          <span
                            className={`${
                              item?.soldOut && "opacity-30 shadow-none"
                            }  w-6 h-6 rounded-full shadow-md`}
                            style={{ backgroundColor: `${item.value}` }}
                          ></span>
                        </label>
                      ))}
                    </RadioGroup>
                  </fieldset>
                </div>
              )}
              <div>
                <div
                  className={`flex justify-center item-center gap-2 !transition-all fadeIn ${
                    lang == "ar" && "flex-row-reverse"
                  } `}
                >
                  <Button
                    type="button"
                    className={`p-2 transition-all fadeIn`}
                    onClick={() => handleDecrease()}
                    disabled={displayedQuantity === 1 || loadingBuy}
                    aria-label="less"
                    name="minus"
                    accessKey={`Less_quantity_${product?.name}`}
                  >
                    <Minus size={20} />
                  </Button>

                  <Badge
                    className={`fadeIn transition-all shadow-md bg-gradient-to-r text-md px-4 p1-2 rounded-lg font-bold text-white/90`}
                  >
                    {displayedQuantity}
                  </Badge>

                  <Button
                    type="button"
                    className={`p-2 transition-all fadeIn`}
                    onClick={() => handleIncrease()}
                    disabled={loadingBuy}
                    aria-label="More"
                    name="plus"
                    accessKey={`More_Quantity_${product?.name}`}
                  >
                    <Plus size={20} />
                  </Button>
                </div>
              </div>
              <div className="flex justify-center items-center text-sm text-gray-500">
                {shippingList.find(
                  (ele: any) =>
                    ele.id === product?.id &&
                    ele.size === selectedSize &&
                    ele.color === selectedColor
                ) && (
                  <div className="fadeIn">
                    <p>
                      {tHomeProducts("quantity")}:{" "}
                      {
                        shippingList.find(
                          (ele: any) =>
                            ele.id === product?.id &&
                            ele.size === selectedSize &&
                            ele.color === selectedColor
                        )?.quantity
                      }
                    </p>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-4 items-center w-full   ">
                <div
                  className={` transition-all  flex justify-center items-center  mb-3 flex-col`}
                >
                  <>
                    {product?.soldOut ? (
                      <Button className="w-[320px] h-[50px] !mt-2 bg-black hover:bg-black cursor-not-allowed rounded-full mx-auto flex justify-center items-center my-3">
                        {tHomeProducts("soldOutBtn")}
                      </Button>
                    ) : (
                      <>
                        <Button
                          type="button"
                          className="w-[320px] rounded-full h-[50px] !mt-2 mx-auto flex justify-center items-center my-3"
                          onClick={() =>
                            AddToList(product, selectedSize, selectedColor)
                          }
                          aria-label={`Add ${product?.name} to bag`}
                          accessKey={`Add_To_Bag_${product?.name}`}
                          disabled={product?.soldOut || loadingBuy}
                        >
                          <>{tHomeProducts("addToBagBtn")}</>
                        </Button>
                        <Button
                          disabled={product?.soldOut || loadingBuy}
                          className="w-[320px] h-[50px] bg-[#e70767] hover:bg-[#e70767] hover:opacity-80 rounded-full mx-auto flex justify-center items-center mb-3"
                          onClick={() =>
                            handleBuyItNow(product, selectedSize, selectedColor)
                          }
                        >
                          {loadingBuy ? (
                            <MainLoading />
                          ) : (
                            `${tHomeProducts("buyItBtn")}`
                          )}
                        </Button>
                      </>
                    )}
                  </>
                </div>
                <div>
                  <ShareButtons product={product} />
                </div>
                <div
                  className={`flex flex-col justify-center items-center mt-3 gap-2 ${
                    lang === "ar" && "flex-row-reverse"
                  } `}
                >
                  {tHomeProducts("descPro")?.trim() ? (
                    <p className="flex justify-center items-center gap-2 text-[18px]">
                      <Text size={35} className="border p-2 rounded-full" />
                      {tHomeProducts("descPro")}
                    </p>
                  ) : null}

                  {lang === "ar" ? (
                    product?.descriptionAr?.trim() ? (
                      <p className="text-[14px] my-2 border border-border w-[320px] text-center p-3 rounded-2xl text-gray-600 text-sm">
                        {product.descriptionAr}
                      </p>
                    ) : (
                      <p className="text-[14px] my-2 text-gray-600 text-sm">
                        لا يوجد وصف
                      </p>
                    )
                  ) : product?.descriptionEn?.trim() ? (
                    <p className="text-[14px] my-2 border border-border w-[320px] text-center p-3 rounded-2xl text-gray-600 text-sm">
                      {product.descriptionEn}
                    </p>
                  ) : (
                    <p className="text-[14px] my-2 text-gray-600 text-sm">
                      No description available
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <SugProductsList SugProducts={sugProducts} />
        </div>
      )}
    </>
  );
};

export default SingleProduct;
