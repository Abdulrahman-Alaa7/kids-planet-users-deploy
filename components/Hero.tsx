"use client";
import React from "react";
import { Badge } from "./ui/badge";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "../i18n/routing";
import Image from "next/image";
import BannerImg from "../public/assets/banner-img.jpg";
import { Truck } from "lucide-react";
import { useQuery } from "@apollo/client";
import { GET_SETTINGS } from "../graphql/actions/queries/getSettings";

type Props = {};

const Hero = (props: Props) => {
  const tHeader = useTranslations("AllHeader");
  const tHero = useTranslations("Hero");
  const lang = useLocale();

  const { data: settingsData, loading: loadingSettings } =
    useQuery(GET_SETTINGS);
  const shippingInfo = settingsData?.getSettings?.[0];

  return (
    <div className="bg-[#96c7ed] h-[835px] pt-6 lg:pt-0 flex flex-col lg:flex-row justify-between items-center">
      <div className="w-full lg:w-1/2 flex flex-col gap-6 ">
        {loadingSettings ? (
          <div className="flex justify-center items-center mx-auto">...</div>
        ) : (
          <Badge className="animate-slidein opacity-0 [--slidein-delay:300ms] mx-auto bg-[#000000] hover:bg-[#000000] py-2 font-bold px-4 lg:px-12 rounded-3xl text-sm lg:text-[16px] text-[#96c7ed] flex justify-center items-center gap-3">
            <Truck />{" "}
            <p className="text-[12px] md:text-[14px] text-[#ffffff]">
              {lang === "ar"
                ? `${shippingInfo?.freeShipDescAr}`
                : ` ${shippingInfo?.freeShipDescEn}`}
            </p>
          </Badge>
        )}
        <div className="mx-auto w-full lg:w-[380px]">
          <h1 className=" animate-slidein opacity-0 [--slidein-delay:300ms] mt-5 mb-6 text-[70px] px-4 lg:px-0 lg:text-[90px] font-semibold leading-none ">
            {tHero("mainTitle1")} <br />
            <span> {tHero("mainTitle2")}</span>
          </h1>
          <p className="animate-slidein opacity-0 [--slidein-delay:500ms] text-[25px] lg:text-[36px] px-4 lg:px-0  leading-10 mb-3">
            {tHero("mainDesc")}
          </p>
        </div>
        <Link
          href={`/store`}
          className="animate-slidein opacity-0 [--slidein-delay:700ms] mx-auto rounded-full bg-[#e70767]  py-4 px-4 !z-30 mb-3 lg:mb-0 hover:bg-[#e70767] hover:!opacity-80 text-white flex justify-center items-center !w-[300px]"
        >
          {tHeader("shopNowBtn")}
        </Link>
      </div>
      <div className="w-full lg:w-1/2  h-[835px] overflow-hidden lg:rounded-b-full bg-white">
        <Image
          src={BannerImg}
          alt="Banner_Img"
          priority
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default Hero;
