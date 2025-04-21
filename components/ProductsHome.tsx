"use client";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Link, useRouter } from "../i18n/routing";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Button } from "./ui/button";
import { AppContext } from "../app/utils/AppContext";
import { toast } from "sonner";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { ArrowRight, Minus, Plus } from "lucide-react";
import MainLoading from "./ui/main-loading";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../graphql/actions/queries/getProducts";
import { GET_TOP_SELLING_WITH_LIMIT } from "../graphql/actions/queries/filters/getTopSellingWithLimit";

export type ProductType = {
  id: string;
  name: string;
  price: number;
  estimatedPrice: number;
  mainImage: string;
  soldOut: boolean;
  offer: boolean;
  images: string[];
  sizes?: any[];
  colors?: any[];
  category: string;
  createdAt: any;
};

type Props = {
  product: any;
  isQuickCard?: boolean;
  isList?: boolean;
  isShip?: boolean;
};

export const ProductsHome = ({
  product,
  isQuickCard,
  isList,
  isShip,
}: Props) => {
  const t = useTranslations("HomeProducts");
  const tS = useTranslations("AllHeader");

  const { data } = useQuery(GET_PRODUCTS);
  const Products = data?.getProductsForClients;

  const [hoverImage, setHoverImage] = useState(false);
  const [loadingBuy, setLoadingBuy] = useState(false);
  const [displayedQuantity, setDisplayedQuantity] = useState<number>(1);

  const lang = useLocale();
  const router = useRouter();

  const {
    wishingList,
    handleAddToWishingList,
    handleDeleteFromWishingList,
    shippingList,
    handleAddNewItemShipping,
    handleItemShippingIncreaseOrDecrease,
    handleDeleteItemShipping,
  } = useContext(AppContext);

  const [order, setOrder] = useState<Array<any>>(shippingList);

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
  }, [shippingList, Products]);

  const AddToList = useCallback(
    (item: any, size: string, color?: string) => {
      handleAddNewItemShipping(item, displayedQuantity, size, color);
      toast.success(tS("successAddedBag"));
      setDisplayedQuantity(1);
    },
    [handleAddNewItemShipping, tS, displayedQuantity]
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

  const handleAddWishingList = useCallback(
    (item: any) => {
      handleAddToWishingList(item);
      toast.success(`${tS("successAddedFav")}`);
    },
    [handleAddToWishingList, tS]
  );

  const handleDeleteWishingList = useCallback(
    (id: any) => {
      handleDeleteFromWishingList(id);
      toast(`${tS("successDelFav")}`);
    },
    [handleDeleteFromWishingList, tS]
  );

  const isExistInWish: boolean = useMemo(
    () => wishingList?.some((item: any) => item.id === product.id),
    [wishingList, product.id]
  );

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

  const handleIncreaseShip = (id: number, size?: string, color?: string) => {
    const currentItem = shippingList.find(
      (item) => item.id === id && item.size === size && item.color === color
    );
    if (currentItem) {
      const newQuantity = currentItem.quantity + 1;
      handleItemShippingIncreaseOrDecrease(id, newQuantity, size, color);
    }
  };

  const handleDecreaseShip = (id: number, size?: string, color?: string) => {
    const currentItem = shippingList.find(
      (item) => item.id === id && item.size === size && item.color === color
    );
    if (currentItem && currentItem.quantity > 1) {
      const newQuantity = currentItem.quantity - 1;
      handleItemShippingIncreaseOrDecrease(id, newQuantity, size, color);
    }
  };

  return (
    <div
      key={product.id}
      className="relative w-full flex flex-col justify-center items-center mx-auto  bg-slate-100 rounded-3xl "
    >
      {!isShip && (
        <>
          {isExistInWish ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger
                  asChild
                  className=" transition-all duration-300"
                >
                  <Button
                    variant={`outline`}
                    type="button"
                    className="z-40 absolute top-2 right-3 rounded-full w-10 h-10 flex justify-center items-center p-0 transition-all duration-300 shadow-md"
                    onClick={() => handleDeleteWishingList(product.id)}
                    aria-label={`Delete ${product.name} From wishlist`}
                    name="deleteWishList"
                  >
                    <IoIosHeart size={25} className="text-primary" />
                  </Button>
                </TooltipTrigger>

                <TooltipContent
                  className="bg-black text-white border-[#292524]"
                  side="left"
                >
                  <p>{t("deleteFromWishList")}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger
                  asChild
                  className=" transition-all duration-300"
                >
                  <Button
                    variant={`outline`}
                    type="button"
                    className="z-40 absolute top-2 right-3 rounded-full w-10 h-10 flex justify-center items-center p-0 transition-all duration-300 shadow-md"
                    onClick={() => handleAddWishingList(product)}
                    aria-label={`Add ${product.name} to wishlist`}
                    name="addToWishList"
                  >
                    <IoIosHeartEmpty size={25} />
                  </Button>
                </TooltipTrigger>

                <TooltipContent
                  className="bg-black text-white border-[#292524]"
                  side="left"
                >
                  <p>{t("addToWishList")}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}{" "}
        </>
      )}
      <Link
        href={`/store/${product.id}`}
        onMouseEnter={() => setHoverImage(true)}
        onMouseLeave={() => setHoverImage(false)}
        className={`w-full h-full ${isQuickCard ? "px-2 pt-2 pb-10" : "p-2"} `}
      >
        <div
          className={`overflow-hidden w-[330px] md:w-[350px] h-[330px] md:h-[350px] mx-auto transition-all duration-700 ${
            hoverImage ? "rounded-radtwo" : "rounded-radone"
          }`}
        >
          <div className="relative w-full h-full">
            <Image
              src={product.mainImage}
              alt={`${product.name}_Main_Image`}
              width={350}
              height={350}
              className={`${
                !isList && hoverImage ? "!opacity-0" : "!opacity-100"
              } object-cover object-center align-middle w-full h-full transition-opacity duration-300`}
            />
            {!isList && (
              <Image
                src={product?.images[0]}
                alt={`${product?.name}_Sec_Image`}
                width={350}
                height={350}
                className={`${
                  hoverImage ? "!opacity-100" : "!opacity-0"
                } absolute top-0 left-0 object-cover object-center align-middle w-full h-full transition-opacity duration-300`}
              />
            )}
          </div>
        </div>

        <div className="absolute left-2 top-2 flex items-start gap-1 z-20 flex-col">
          {product.soldOut && (
            <Badge
              variant="default"
              className={`${
                lang === "ar" && "flex-row-reverse"
              } text-[14px] rounded-full px-4 bg-black dark:bg-white shadow-md dark:text-black text-white hover:!bg-primary hover:!text-white flex justify-center items-center gap-1`}
            >
              {t("soldOutBtn")}
            </Badge>
          )}
        </div>
        <div
          className={`${
            isShip ? "mt-3" : "my-3"
          }  flex flex-col gap-2 items-center justify-center mx-auto`}
        >
          <h3 className="text-[20px] font-semibold">{product.name}</h3>
          {product.estimatedPrice > 0 ? (
            <div
              dir={lang === "ar" ? "rtl" : "ltr"}
              className="prices flex justify-center items-center gap-3 mt-1 mb-2"
            >
              <span className="font-semibold block line-through text-muted-foreground">
                {product.price} {tS("pound")}
              </span>
              <Badge variant="secondary" className="font-bold text-[16px]">
                {product.estimatedPrice} {tS("pound")}
              </Badge>
              <Badge
                variant="default"
                className="text-white font-bold rounded-full py-1 "
              >
                {discountPercentage}% {t("offer")}
              </Badge>
            </div>
          ) : (
            <div
              dir={lang === "ar" ? "rtl" : "ltr"}
              className="prices flex justify-center items-center gap-3 mt-1 "
            >
              <Badge variant="secondary" className="font-bold text-[16px]">
                {product.price} {tS("pound")}
              </Badge>
            </div>
          )}
        </div>
      </Link>
      {isQuickCard && (
        <Dialog>
          <DialogTrigger className="absolute bg-primary text-white hover:opacity-80 transition-all py-[6px] bottom-3 left-1/2 transform -translate-x-1/2 z-40 w-[230px] rounded-full mx-auto flex justify-center items-center">
            {t("QuickView")}
          </DialogTrigger>
          <DialogContent className="fadeIn  flex justify-center items-center  w-[360px] md:w-[450px] !mx-auto max-h-[750px] overflow-auto">
            <DialogHeader>
              <DialogTitle></DialogTitle>
              <DialogDescription></DialogDescription>
              <div
                className={`overflow-hidden  flex justify-center items-center w-[310px] md:w-[350px] h-[320px] md:h-[350px] mx-auto transition-all rounded-3xl `}
              >
                <Image
                  src={product.mainImage}
                  alt={`${product.name}_Main_Image`}
                  width={310}
                  height={350}
                  className={`${
                    hoverImage ? "!opacity-0" : "!opacity-100"
                  } object-cover object-center align-middle w-full h-full transition-opacity duration-300`}
                />
              </div>
              <div className="my-3 flex flex-col gap-2 items-center justify-center mx-auto">
                <h3 className="text-[20px] font-semibold">{product.name}</h3>
                {product.estimatedPrice > 0 ? (
                  <div
                    dir={lang === "ar" ? "rtl" : "ltr"}
                    className="prices flex justify-center items-center gap-3 mt-1 mb-2"
                  >
                    <span className="font-semibold block line-through text-muted-foreground">
                      {product.price} {tS("pound")}
                    </span>
                    <Badge
                      variant="secondary"
                      className="font-bold text-[16px] rounded-3xl"
                    >
                      {product.estimatedPrice} {tS("pound")}
                    </Badge>
                    <Badge
                      variant="default"
                      className="text-white font-bold rounded-full py-1 "
                    >
                      {discountPercentage}% {t("offer")}
                    </Badge>
                  </div>
                ) : (
                  <div
                    dir={lang === "ar" ? "rtl" : "ltr"}
                    className="prices flex justify-center items-center gap-3 my-3"
                  >
                    <Badge
                      variant="secondary"
                      className="font-bold text-[16px] rounded-3xl"
                    >
                      {product.price} {tS("pound")}
                    </Badge>
                  </div>
                )}
              </div>
              {product?.sizes && (
                <div
                  className={`
fadeIn transition-all`}
                >
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
                          className="relative flex cursor-pointer flex-col items-center gap-3  rounded-3xl  border border-input px-2 py-3 text-center shadow-sm shadow-black/5 outline-offset-2 transition-colors has-[[data-disabled]]:cursor-not-allowed has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent has-[[data-disabled]]:opacity-50 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70"
                        >
                          <RadioGroupItem
                            id={index}
                            value={item.value}
                            className="sr-only after:absolute after:inset-0"
                            disabled={item?.soldout}
                          />
                          <p className="text-sm text-[10px] md:text-[12px] font-medium leading-none text-foreground">
                            {item.value}
                          </p>
                        </label>
                      ))}
                    </RadioGroup>
                  </fieldset>
                </div>
              )}
              {product?.colors && (
                <div className={` fadeIn transition-all`}>
                  <fieldset className="space-y-4 mt-3">
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
                  className={`flex justify-center item-center gap-2
                   !transition-all fadeIn ${
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
                    accessKey={`Less_quantity_${product.name}`}
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
                    aria-label="More"
                    name="plus"
                    disabled={loadingBuy}
                    accessKey={`More_Quantity_${product.name}`}
                  >
                    <Plus size={20} />
                  </Button>
                </div>
              </div>
              {product?.soldOut ? (
                <Button className="w-[90%] !mt-5 bg-black hover:bg-black cursor-not-allowed rounded-full mx-auto flex justify-center items-center my-3">
                  {t("soldOutBtn")}
                </Button>
              ) : (
                <>
                  <Button
                    type="button"
                    className="w-[90%] rounded-full !mt-5 mx-auto flex justify-center items-center my-3"
                    onClick={() =>
                      AddToList(product, selectedSize, selectedColor)
                    }
                    aria-label={`Add ${product.name} to bag`}
                    accessKey={`Add_To_Bag_${product.name}`}
                    disabled={product.soldOut || loadingBuy}
                  >
                    <>{t("addToBagBtn")}</>
                  </Button>
                  <Button
                    disabled={product.soldOut || loadingBuy}
                    className="w-[90%] bg-[#e70767] hover:bg-[#e70767] hover:opacity-80 rounded-full mx-auto flex justify-center items-center my-3"
                    onClick={() =>
                      handleBuyItNow(product, selectedSize, selectedColor)
                    }
                  >
                    {loadingBuy ? <MainLoading /> : `${t("buyItBtn")}`}
                  </Button>
                </>
              )}
              <Link
                href={`/store/${product?.id}`}
                className=" mx-auto rounded-full  !mt-6 py-2 px-4 w-fit  text-black underline underline-offset-4  !z-30 mb-3 lg:mb-0 hover:opacity-90  flex justify-center items-center gap-1 "
              >
                {t("allDetails")}
                <ArrowRight
                  size={16}
                  className={`text-gray-700 ${lang === "ar" && "rotate-180"}`}
                />
              </Link>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
      {isShip && (
        <>
          <div>
            <span className="flex gap-1 items-center text-[#666] text-sm font-normal mt-0 mb-3">
              {product?.size && <>({product.size})</>}
              {product?.color && (
                <>
                  {" "}
                  -{" "}
                  <span
                    className={`w-4 h-4 rounded-full shadow-lg `}
                    style={{
                      backgroundColor: `${product?.color}`,
                    }}
                  ></span>
                </>
              )}
            </span>
          </div>
          <div key={`${product.id}-${product.size}-${product.color}`}>
            <div
              className={`
            flex justify-center item-center gap-2 
            !transition-all fadeIn ${lang == "ar" && "flex-row-reverse"} `}
            >
              <Button
                type="button"
                className={`p-2 transition-all fadeIn`}
                onClick={() =>
                  handleDecreaseShip(product.id, product.size, product.color)
                }
                disabled={product.quantity === 1}
                aria-label="less"
                name="minus"
                accessKey={`Less_quantity_${product.name}`}
              >
                <Minus size={20} />
              </Button>

              <Badge
                className={`fadeIn transition-all shadow-md bg-gradient-to-r text-md px-4 p1-2 rounded-lg font-bold text-white/90`}
              >
                {product?.quantity}
              </Badge>

              <Button
                type="button"
                className={`p-2 transition-all fadeIn`}
                onClick={() =>
                  handleIncreaseShip(product.id, product.size, product.color)
                }
                aria-label="More"
                name="plus"
                accessKey={`More_Quantity_${product.name}`}
              >
                <Plus size={20} />
              </Button>
            </div>
          </div>
          {product?.soldOut ? (
            <Button className="w-[90%] !mt-5 bg-black hover:bg-black cursor-not-allowed rounded-full mx-auto flex justify-center items-center my-3">
              {t("soldOutBtn")}
            </Button>
          ) : (
            <>
              <Button
                type="button"
                className="w-[90%] rounded-full !mt-5 mx-auto flex justify-center items-center my-3 !py-6"
                onClick={() =>
                  handleDeleteItemShipping(
                    product.id,
                    product?.size,
                    product?.color
                  )
                }
                aria-label={`Remove ${product.name} from bag`}
                accessKey={`Remove_From_Bag_${product.name}`}
                disabled={product.soldOut || loadingBuy}
              >
                <>{t("delFromBagBtn")}</>
              </Button>
            </>
          )}
        </>
      )}
    </div>
  );
};

const HomeProductList = () => {
  const t = useTranslations("HomeProducts");
  const { data, loading } = useQuery(GET_TOP_SELLING_WITH_LIMIT);
  const Products = data?.getTopSellingWithLimit;

  return (
    <div>
      <div className="py-16 px-3 lg:px-26 bg-white">
        <h2 className="mb-6 italic text-[30px] md:text-[45px] mx-auto flex justify-center items-center font-bold gap-2 uppercase drop-shadow-lg tracking-tighter">
          <span className="text-[#96c7ed]">{t("homeProductsTitle1")}</span>
          <span className="text-[#e70767]">{t("homeProductsTitle2")}</span>
        </h2>
        {loading ? (
          <div className="flex justify-center items-center mx-auto my-6">
            <MainLoading />
          </div>
        ) : (
          <div className="my-12 grid grid-flow-row gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {Products?.map((product: any) => (
              <div key={product.id}>
                <ProductsHome product={product} />
              </div>
            ))}
          </div>
        )}
        <Link
          href="/store"
          className="mx-auto rounded-full bg-[#e70767] py-4 px-4 !z-30 mb-3 lg:mb-0 hover:bg-[#e70767] hover:opacity-80 text-white flex justify-center items-center !w-[300px]"
        >
          {t("viewAllBtn")}
        </Link>
      </div>
    </div>
  );
};

export default HomeProductList;
