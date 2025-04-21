"use client";
import React, { useState, useContext } from "react";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { TbShoppingBagX } from "react-icons/tb";
import { Link } from "../i18n/routing";
import { Button } from "./ui/button";
import MainBtn from "./MainBtn";
import { AppContext } from "../app/utils/AppContext";
import { Badge } from "./ui/badge";
import dynamic from "next/dynamic";
import { Trash } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
} from "./ui/table";
import Image from "next/image";
import { ScrollArea } from "./ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { useLocale, useTranslations } from "next-intl";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const NotiShipping = dynamic(() => import("./NotiShipping"));
type Props = {};

const ShippingList = (props: Props) => {
  const lang = useLocale();
  const tHeader = useTranslations("AllHeader");
  const [isOpen, setIsOpen] = useState(false);

  const {
    shippingList,
    handleDeleteItemShipping,
    handleDeleteAllShippingList,
    handleItemShippingIncreaseOrDecrease,
  } = useContext(AppContext);

  const sumPrice = (order: any[]) => {
    let TotalPrice = 0;
    for (let i = 0; i < order?.length; i++) {
      TotalPrice += order[i].price * order[i].quantity;
    }
    return TotalPrice;
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const handleIncrease = (id: number, size?: string, color?: string) => {
    const currentItem = shippingList.find(
      (item) => item.id === id && item.size === size && item.color === color
    );
    if (currentItem) {
      const newQuantity = currentItem.quantity + 1;
      handleItemShippingIncreaseOrDecrease(id, newQuantity, size, color);
    }
  };

  const handleDecrease = (id: number, size?: string, color?: string) => {
    const currentItem = shippingList.find(
      (item) => item.id === id && item.size === size && item.color === color
    );
    if (currentItem && currentItem.quantity > 1) {
      const newQuantity = currentItem.quantity - 1;
      handleItemShippingIncreaseOrDecrease(id, newQuantity, size, color);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger
        name="Ship_Btn"
        accessKey="Open_Shippping_List"
        aria-label="Shipping_List"
        className="relative px-2 h-10 w-12  py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-full  inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      >
        <NotiShipping />
        <ShoppingBag size={18} />
      </SheetTrigger>
      <SheetContent side={`bottom`} className="!max-h-[520px]  rounded-t-3xl">
        <SheetTitle></SheetTitle>
        {shippingList?.length <= 0 ? (
          <div className="fadeIn flex justify-center items-center my-6 flex-col gap-4">
            <div className="flex justify-center items-center  flex-col gap-1">
              <TbShoppingBagX size={125} className=" text-muted-foreground" />
              <SheetTitle className=" text-[25px] font-bold">
                {tHeader("shippingListTitle")}
              </SheetTitle>
              <SheetDescription className="text-center sm:text-[18px] text-[15px]">
                {tHeader("shippingListdesc")}
              </SheetDescription>
            </div>
            <Link href={`/store`} onClick={handleLinkClick} className="z-50">
              <MainBtn
                accessKey="Store_Button_Shipping"
                title={`${tHeader("shopNowBtn")}`}
              />
            </Link>
          </div>
        ) : (
          <ScrollArea className="h-[520px] !w-full lg:!w-[50%] overflow-auto mx-auto">
            <Table className=" w-full" dir={lang === "ar" ? "rtl" : "ltr"}>
              <TableCaption className="pt-2 pb-36 ">
                {tHeader("shippingListCap")}
              </TableCaption>
              <TableHeader></TableHeader>
              <TableBody className=" mx-auto !w-full">
                {shippingList?.map((el: any, index: number) => (
                  <TableRow key={index} className="">
                    <TableCell className="font-medium flex gap-3 items-center">
                      <Link href={`/store/${el.id}`} onClick={handleLinkClick}>
                        <Image
                          src={el.mainImage}
                          alt={el.name}
                          width={70}
                          height={70}
                          className="object-cover object-center rounded-md w-[100px] h-[70px]"
                        />
                      </Link>
                      <p className="flex flex-col">
                        <Link
                          href={`/store/${el.id}`}
                          className="hover:underline hover:underline-offset-4 transition-all"
                          onClick={handleLinkClick}
                        >
                          {el.name.length > 28
                            ? `${el.name.substring(0, 28)}...`
                            : el.name}{" "}
                        </Link>
                        <span className="flex gap-1 items-center text-[#666] text-sm font-normal">
                          {el?.size && <>({el.size})</>}
                          {el?.color && (
                            <>
                              {" "}
                              -{" "}
                              <span
                                className={`w-4 h-4 rounded-full shadow-lg `}
                                style={{
                                  backgroundColor: `${el?.color}`,
                                }}
                              ></span>
                            </>
                          )}
                        </span>
                      </p>
                    </TableCell>
                    <TableCell className="!text-sm  flex justify-between items-center gap-2 mx-2">
                      <p className="flex gap-2 items-center">
                        <span className=" text-[14px] mx-2 text-sm rounded-3xl px-2 py-1 border">
                          {el.quantity}
                        </span>
                        {lang === "ar" ? (
                          <>
                            {el.price} {tHeader("pound")}
                          </>
                        ) : (
                          <>
                            {" "}
                            {tHeader("pound")} {el.price}
                          </>
                        )}
                      </p>
                      <div key={`${el.id}-${el.size}-${el.color}`}>
                        <div
                          className={`
        flex justify-center item-center gap-2 
        !transition-all fadeIn ${lang == "ar" && "flex-row-reverse"} `}
                        >
                          <Button
                            type="button"
                            className={`p-2 transition-all fadeIn`}
                            onClick={() =>
                              handleDecrease(el.id, el.size, el.color)
                            }
                            disabled={el.quantity === 1}
                            aria-label="less"
                            name="minus"
                            accessKey={`Less_quantity_${el.name}`}
                          >
                            <Minus size={20} />
                          </Button>

                          <Badge
                            className={`fadeIn transition-all shadow-md bg-gradient-to-r text-md px-4 p1-2 rounded-lg font-bold text-white/90`}
                          >
                            {el.quantity}
                          </Badge>

                          <Button
                            type="button"
                            className={`p-2 transition-all fadeIn`}
                            onClick={() =>
                              handleIncrease(el.id, el.size, el.color)
                            }
                            aria-label="More"
                            name="plus"
                            accessKey={`More_Quantity_${el.name}`}
                          >
                            <Plus size={20} />
                          </Button>
                        </div>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant={`outline`}
                              className="rounded-full"
                              onClick={() =>
                                handleDeleteItemShipping(
                                  el.id,
                                  el?.size,
                                  el?.color
                                )
                              }
                            >
                              <Trash size={20} className="text-[crimson]" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent
                            className="bg-black text-white border-[#292524]"
                            side="top"
                          >
                            <p>{tHeader("deleteFromListBtn")}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter className="!w-full bg-background ">
                <TableRow className="w-full">
                  <TableCell className="flex justify-center items-center mx-auto mt-3 font-semibold text-muted-foreground text-[18px]">
                    {lang === "ar" ? (
                      <>
                        {sumPrice(shippingList)} {tHeader("pound")}
                      </>
                    ) : (
                      <>
                        {tHeader("pound")} {sumPrice(shippingList)}
                      </>
                    )}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
            <div className="fixed bottom-0 left-1/2 transform !w-full shadow-sm -translate-x-1/2  hover:bg-background rounded-3xl bg-background   ">
              <div className="flex justify-center items-center gap-2 py-6 bg-background border-t border-t-border ">
                <div>
                  <Link
                    href={`/checkout`}
                    className="rounded-full h-10 px-4 py-2 shadow-md inline-flex justify-center items-center whitespace-nowrap border border-input bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    onClick={handleLinkClick}
                  >
                    {tHeader("checkoutBtn")}
                  </Link>
                </div>
                <div>
                  <Link
                    href={`/bag`}
                    className="rounded-full h-10 px-4 py-2 shadow-md inline-flex justify-center items-center whitespace-nowrap border border-input bg-background hover:bg-accent hover:text-accent-foreground text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    onClick={handleLinkClick}
                  >
                    {tHeader("shippingListReviewBtn")}
                  </Link>
                </div>
                <div className="">
                  {" "}
                  <Button
                    variant={`destructive`}
                    className="rounded-full h-10  py-2"
                    onClick={() => handleDeleteAllShippingList()}
                  >
                    {tHeader("clearAllBrn")}
                  </Button>
                </div>
              </div>
            </div>
          </ScrollArea>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default ShippingList;
