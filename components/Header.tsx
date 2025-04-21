"use client";
import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import Logo from "../public/assets/logo.jpg";
import { Link } from "../i18n/routing";
import LangMenu from "./LangMenu";
import InputSearch from "./InputSearch";
import { useTranslations } from "next-intl";
import WishingList from "./WishingList";
import ShippingList from "./ShippingList";
import MoreHeader from "./MoreHeader";

type Props = {};

const Header: FC<Props> = () => {
  const [active, setActive] = useState(false);
  const tHeader = useTranslations("AllHeader");
  const tFooter = useTranslations("AllFooter");

  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linksData = [
    {
      url: "/",
      text: `${tFooter("mainTitBreak")}`,
    },
    {
      url: "/store",
      text: `${tHeader("store")}`,
    },
    {
      url: "/about-us",
      text: `${tHeader("about-us")}`,
    },
  ];

  return (
    <>
      <header
        className={`sticky inset-x-0 top-0 z-50 mx-auto w-full md:px-2 transition-all duration-300 ${
          active && "border-b  border-[#ccc] shadow   "
        } bg-white/80 dark:!bg-background py-3  backdrop-blur-lg`}
        aria-label="Main Navigation"
      >
        <div className="px-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center  ">
              <Link
                aria-current="page"
                aria-label="Go to Homepage"
                className="flex items-center gap-2"
                href="/"
              >
                <Image
                  src={Logo}
                  alt="Logo Dark"
                  width={200}
                  height={200}
                  className=" h-14 w-14  rounded-xl "
                  priority
                />
              </Link>
            </div>

            <div className="flex items-center gap-1 mx-1">
              <div className="hidden md:!flex transition-all">
                {linksData.map((link: any, index: number) => (
                  <Link
                    key={index}
                    className="inline-block  px-4 py-2 text-[16px] rounded-3xl  text-gray-900 dark:text-gray-100 dark:hover:text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                    href={link.url}
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
              <div className="flex items-center gap-0">
                <LangMenu />

                <InputSearch />
              </div>
              <WishingList />
              <ShippingList />
              <MoreHeader />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
