import React from "react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import AboutHomeImage from "../public/assets/home-about.jpg";

type Props = {};

const AboutUsHome = (props: Props) => {
  const lang = useLocale();
  const t = useTranslations("MoreInfoAboutUs");
  return (
    <div className="bg-slate-100 flex justify-between lg:justify-center items-center flex-col lg:flex-row mx-auto gap-3 lg:gap-36 py-12 lg:py-16 px-3 lg:px-26">
      <div className="w-full xl:w-1/2  !flex flex-col ">
        <div
          className={`w-[200px]  h-[170px]  bg-[#ffa7df] ${
            lang === "ar" ? "rounded-l-full mr-auto" : "rounded-r-full ml-auto"
          } `}
        ></div>
        <div
          className={`bg-[#c2dcfd] lg:w-[70%] xl:w-1/2 w-[100%] min-h-[300px] rounded-3xl p-12 ${
            lang === "ar" ? "mr-auto" : "ml-auto"
          } `}
        >
          <h3 className="font-bold text-[25px] mb-2">{t("moreInfoTitle")}</h3>
          <p className="text-[20px]">{t("moreInfodesc")}</p>
        </div>
      </div>
      <div className="relative w-full xl:w-1/2 flex flex-col items-center overflow-hidden">
        <div className="w-[80%] h-[550px] bg-[#e70767] rounded-tr-full rounded-bl-full  md:rounded-br-full  overflow-hidden">
          <Image
            src={AboutHomeImage}
            alt="About_Us_Home_Image"
            loading="lazy"
            className="object-cover w-full h-full object-center"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUsHome;
