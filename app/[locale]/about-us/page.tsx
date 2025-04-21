import React from "react";
import { useTranslations } from "next-intl";
import Heading from "../../../app/utils/Heading";
import LOGO from "../../../public/assets/logo.jpg";
import Image from "next/image";

type Props = {};

const Page = (props: Props) => {
  const tHeader = useTranslations("AllHeader");
  const tAboutUs = useTranslations("About-Us");

  return (
    <div>
      <Heading
        title={`Kids Planet | ${tHeader("about-us")}`}
        description="Kids Planet هو افضل مكان لبيع لبس الاطفال في مصر من حيث الجوده و السعر"
        keywords="kids planet, ملابس اطفال, لبس اطفال, اطفال, لبس , محلات لبس اطفال , كيدز بلانت, كيدز"
      />
      <div className=" fadeIn px-1 md:px-12">
        <h1
          className={`1200px:text-[70px] 1100px:text-[60px] 1000px:text-[50px] 800px:text-[45px] 600px:text-[40px] text-[35px] font-bold  gradient-text  text-center tracking-tight `}
        >
          {tHeader("about-us")}
        </h1>

        <div
          className={`flex items-center 800px:justify-between justify-center flex-col gap-4  py-2  `}
        >
          <div className={` w-[100%] flex justify-center items-center`}>
            <Image
              src={LOGO}
              alt="MoreInfoAboutUs"
              className={`flex  w-[350px] h-[350px] 1300px:w-[400px] 1300px:h-[400px] 1000px:w-[300px] 1000px:h-[300px] rounded-3xl`}
            />
          </div>
        </div>
        <div className="px-[4px] mt-4 mb-16">
          <p
            className={`mb-3 text-sm md:text-lg leading-loose text-[18px] font-Poppins text-[#666] dark:text-[#ffffff96] `}
          >
            {tAboutUs("p1")}
          </p>
          <p
            className={`mb-3 text-sm md:text-lg leading-loose  text-[18px] font-Poppins text-[#666] dark:text-[#ffffff96] `}
          >
            {tAboutUs("p2")}
          </p>
          <p
            className={`mb-3 text-sm md:text-lg leading-loose  text-[18px] font-Poppins text-[#666] dark:text-[#ffffff96] `}
          >
            {tAboutUs("p3")}
          </p>
          <p
            className={`mb-3 text-sm md:text-lg leading-loose  text-[18px] font-Poppins text-[#666] dark:text-[#ffffff96] `}
          >
            {tAboutUs("p4")}
          </p>
          <h2 className="text-center border p-2 font-bold border-primary rounded-3xl text-[20px] mb-6">
            {tAboutUs("titleV")}
          </h2>
          <p
            className={`mb-6 text-sm md:text-lg leading-loose  text-[18px] font-Poppins text-[#666] dark:text-[#ffffff96] `}
          >
            {tAboutUs("pV1")}
          </p>
          <h2 className="text-center border p-2 font-bold border-primary rounded-3xl text-[20px] mb-6">
            {tAboutUs("titleM")}
          </h2>
          <p
            className={`mb-6 text-sm md:text-lg leading-loose  text-[18px] font-Poppins text-[#666] dark:text-[#ffffff96] `}
          >
            {tAboutUs("pM1")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
