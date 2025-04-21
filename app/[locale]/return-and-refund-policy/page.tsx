import React from "react";
import { useTranslations } from "next-intl";
import Heading from "../../../app/utils/Heading";

type Props = {};

const Page = (props: Props) => {
  const tHeader = useTranslations("AllHeader");
  const tPage = useTranslations("return-and-refund-policy");

  return (
    <div>
      <Heading
        title={`Kids Planet | ${tHeader("returnAndRe")}`}
        description="Kids Planet هو افضل مكان لبيع لبس الاطفال في مصر من حيث الجوده و السعر"
        keywords="kids planet, ملابس اطفال, لبس اطفال, اطفال, لبس , محلات لبس اطفال , كيدز بلانت, كيدز"
      />
      <div className=" fadeIn px-1 md:px-12">
        <h1
          className={`1200px:text-[70px] 1100px:text-[60px] pb-6 1000px:text-[50px] 800px:text-[45px] 600px:text-[40px] text-[35px] font-bold  gradient-text  text-center tracking-tight `}
        >
          {tHeader("returnAndRe")}
        </h1>
        <div className={`mb-4`}>
          <div className="mb-3 md:p-8 w-[95%] 800px:w-[100%] m-auto">
            <div className="px-1">
              <div className="  ">
                <h2 className="text-3xl font-bold mb-6">{tPage("title1")}</h2>
                <p className="mb-4">{tPage("p1")}</p>
                <p className="mb-4">
                  {tPage("p2")}
                  <a
                    href="mailto:kidsplanet@gmail.com"
                    className="text-blue-500 text-[14px]"
                  >
                    kidsplanet@gmail.com
                  </a>{" "}
                  {tPage("p21")}
                </p>
                <p className="mb-4">{tPage("p3")}</p>
                <h2 className="text-3xl font-bold mb-6"> {tPage("title2")}</h2>
                <p className="mb-4">{tPage("pt21")}</p>
                <h2 className="text-3xl font-bold mb-6">{tPage("title3")}</h2>
                <p className="mb-4">
                  {tPage("pt31")}
                  <a
                    href="mailto:kidsplanet@gmail.com"
                    className="text-blue-500 text-[14px]"
                  >
                    kidsplanet@gmail.com
                  </a>{" "}
                  {tPage("pt312")}
                </p>
                <p className="mb-4">{tPage("pt32")}</p>
                <h2 className="text-3xl font-bold mb-6">{tPage("title4")}</h2>
                <p className="mb-4">
                  {tPage("pt41")}
                  <a
                    href="mailto:kidsplanet@gmail.com"
                    className="text-blue-500 text-[14px]"
                  >
                    kidsplanet@gmail.com
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
