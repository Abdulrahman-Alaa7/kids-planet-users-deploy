"use client";
import React from "react";
import SecHeroImg from "../public/assets/secHero.jpg";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
type Props = {};

const SecHero = (props: Props) => {
  const t = useTranslations("SecHero");
  const lang = useLocale();
  return (
    <div className="bg-slate-100 flex flex-col lg:flex-row justify-between items-center !mx-auto gap-12 lg:gap-36  2xl:gap-12  py-16 px-3 lg:px-26">
      <div>
        <div
          className={`w-full xl:w-1/2 flex flex-col items-center justify-center ${
            lang === "ar" ? "mr-auto" : "ml-auto"
          } `}
        >
          <div
            className={`flex items-center mx-auto ${
              lang === "ar" && "flex-row-reverse"
            }`}
          >
            <div className="w-[150px] md:w-[250px] h-[150px] md:h-[250px] bg-[#e70767] rounded-full"></div>
            <div className="w-[150px] md:w-[250px] h-[150px] md:h-[250px] bg-[#96c7ed] rounded-b-full overflow-hidden ">
              <Image
                src={SecHeroImg}
                alt="Sec_Hero_Img"
                priority
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <div
            className={`flex items-center mx-auto ${
              lang === "ar" && "flex-row-reverse"
            }`}
          >
            <div className="w-[150px] md:w-[250px] h-[150px] md:h-[250px] bg-[#ffea6f] rounded-r-full"></div>
            <div className="w-[150px] md:w-[250px] h-[150px] md:h-[250px] bg-[#96c7ed] "></div>
          </div>
        </div>
      </div>
      <div className="w-full xl:w-1/2 flex flex-col justify-center gap-1 !mx-auto">
        <p className="text-[20px] mx-auto lg:w-[400px] w-full">{t("para1")}</p>
        <h2 className="font-bold text-[30px] lg:w-[400px] mx-auto w-full">
          {t("mainDesc")}
        </h2>
      </div>
    </div>
  );
};

export default SecHero;
