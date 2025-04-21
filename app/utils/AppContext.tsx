"use client";
import { createContext, ReactNode, useEffect, useState } from "react";

type Context = {
  shippingList: any[];
  setShippingList: (shippingList: any[]) => void;
  wishingList: any[];
  setWishingList: (wishingList: any[]) => void;
  handleAddNewItemShipping: (
    item: any,
    quantity: number,
    size: string,
    color: any
  ) => void;
  handleDeleteItemShipping: (id: number, size?: string, color?: string) => void;
  handleDeleteAllShippingList: () => void;
  handleItemShippingIncreaseOrDecrease: (
    id: number,
    quantity: number,
    size?: string,
    color?: string
  ) => void;
  handleAddToWishingList: (item: any) => void;
  handleDeleteFromWishingList: (id: number) => void;
  handleDeleteAllWishingList: () => void;
  loadingStates: {
    fetching: boolean;
    adding: boolean;
    deleting: boolean;
  };
};

type Props = {
  children: ReactNode;
};

export const AppContext = createContext<Context>({} as Context);

export const AppStorage = ({ children }: Props) => {
  const [shippingList, setShippingList] = useState<any[]>([]);
  const [wishingList, setWishingList] = useState<any[]>([]);
  const [loadingStates, setLoadingStates] = useState({
    fetching: true,
    adding: false,
    deleting: false,
  });

  useEffect(() => {
    setLoadingStates((prev) => ({ ...prev, fetching: true }));
    const savedShippingList =
      typeof window !== "undefined" && localStorage.getItem("shippingList");
    const savedWishingList =
      typeof window !== "undefined" && localStorage.getItem("wishingList");

    setShippingList(savedShippingList ? JSON.parse(savedShippingList) : []);
    setWishingList(savedWishingList ? JSON.parse(savedWishingList) : []);

    setLoadingStates((prev) => ({ ...prev, fetching: false }));
  }, []);

  useEffect(() => {
    if (!loadingStates.fetching) {
      localStorage.setItem("shippingList", JSON.stringify(shippingList));
      localStorage.setItem("wishingList", JSON.stringify(wishingList));
    }
  }, [shippingList, wishingList, loadingStates.fetching]);

  const handleAddNewItemShipping = (
    el: any,
    quantity: number,
    size: string,
    color: any
  ) => {
    setLoadingStates((prev) => ({ ...prev, adding: true }));
    const newShippingList = [...shippingList];
    const itemIndex = newShippingList.findIndex(
      (item) => item.id === el.id && item.size === size && item.color === color
    );

    if (itemIndex === -1) {
      newShippingList.push({
        id: el.id,
        name: el.name,
        mainImage: el.mainImage,
        price: el.estimatedPrice > 0 ? el.estimatedPrice : el.price,
        quantity: quantity,
        size: size,
        color: color,
      });
    } else {
      newShippingList[itemIndex].quantity += quantity;
    }

    setShippingList(newShippingList);
    setLoadingStates((prev) => ({ ...prev, adding: false }));
  };

  const handleDeleteItemShipping = (
    id: number,
    size?: string,
    color?: string
  ) => {
    setLoadingStates((prev) => ({ ...prev, deleting: true }));
    const newShippingList = shippingList.filter(
      (item) => !(item.id === id && item.size === size && item.color === color)
    );
    setShippingList(newShippingList);
    setLoadingStates((prev) => ({ ...prev, deleting: false }));
  };

  const handleDeleteAllShippingList = () => {
    setLoadingStates((prev) => ({ ...prev, deleting: true }));
    setShippingList([]);
    setLoadingStates((prev) => ({ ...prev, deleting: false }));
  };

  const handleItemShippingIncreaseOrDecrease = (
    id: number,
    quantity: number,
    size?: string,
    color?: string
  ) => {
    setLoadingStates((prev) => ({ ...prev, adding: true }));
    const newShippingList = [...shippingList];
    const itemIndex = newShippingList.findIndex(
      (item) => item.id === id && item.size === size && item.color === color
    );

    if (itemIndex !== -1) {
      if (quantity <= 0) {
        newShippingList.splice(itemIndex, 1);
      } else {
        newShippingList[itemIndex].quantity = quantity;
      }
      setShippingList(newShippingList);
    }

    setLoadingStates((prev) => ({ ...prev, adding: false }));
  };

  const handleAddToWishingList = (el: any) => {
    setLoadingStates((prev) => ({ ...prev, adding: true }));
    const newWishingList = [...wishingList];
    const itemIndex = newWishingList.findIndex((item) => item.id === el.id);

    if (itemIndex === -1) {
      newWishingList.push({
        id: el.id,
        name: el.name,
        mainImage: el.mainImage,
        price: el.estimatedPrice > 0 ? el.estimatedPrice : el.price,
      });
    }

    setWishingList(newWishingList);
    setLoadingStates((prev) => ({ ...prev, adding: false }));
  };

  const handleDeleteFromWishingList = (id: number) => {
    setLoadingStates((prev) => ({ ...prev, deleting: true }));
    const newWishingList = wishingList.filter((item) => item.id !== id);
    setWishingList(newWishingList);
    setLoadingStates((prev) => ({ ...prev, deleting: false }));
  };

  const handleDeleteAllWishingList = () => {
    setLoadingStates((prev) => ({ ...prev, deleting: true }));
    setWishingList([]);
    setLoadingStates((prev) => ({ ...prev, deleting: false }));
  };

  return (
    <AppContext.Provider
      value={{
        shippingList,
        setShippingList,
        wishingList,
        setWishingList,
        handleAddNewItemShipping,
        handleDeleteItemShipping,
        handleDeleteAllShippingList,
        handleItemShippingIncreaseOrDecrease,
        handleAddToWishingList,
        handleDeleteFromWishingList,
        handleDeleteAllWishingList,
        loadingStates,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
