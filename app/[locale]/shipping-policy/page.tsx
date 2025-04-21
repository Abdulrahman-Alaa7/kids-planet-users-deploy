import React from "react";
import { useTranslations } from "next-intl";
import Heading from "../../../app/utils/Heading";
import { Link } from "../../../i18n/routing";

type Props = {};

const Page = (props: Props) => {
  const tHeader = useTranslations("AllHeader");
  const tPage = useTranslations("shipping-policy");

  return (
    <div>
      <Heading
        title={`Kids Planet | ${tHeader("shippingPol")}`}
        description="Kids Planet هو افضل مكان لبيع لبس الاطفال في مصر من حيث الجوده و السعر"
        keywords="kids planet, ملابس اطفال, لبس اطفال, اطفال, لبس , محلات لبس اطفال , كيدز بلانت, كيدز"
      />
      <div className="fadeIn px-1 md:px-12">
        <h1
          className={`1200px:text-[70px] 1100px:text-[60px] pb-6 1000px:text-[50px] 800px:text-[45px] 600px:text-[40px] text-[35px] font-bold  gradient-text  text-center tracking-tight `}
        >
          {tHeader("shippingPol")}
        </h1>
        <div className={`mb-4`}>
          <div className="mb-3  w-[95%] 800px:w-[100%] m-auto">
            <div className="  ">
              <h2 className="text-3xl font-bold mb-6">{tPage("title1")}</h2>
              <p className="mb-4">{tPage("p1")}</p>
              <h2 className="text-3xl font-bold mb-6"> {tPage("title2")}</h2>
              <p className="mb-4">{tPage("p2")}</p>
              <h2 className="text-3xl font-bold mb-6">{tPage("title3")}</h2>
              <p className="mb-4">{tPage("p3")}</p>
              <h2 className="text-3xl font-bold mb-6">{tPage("title4")}</h2>
              <p className="mb-4">{tPage("p4")}</p>
              <h2 className="text-3xl font-bold mb-6">{tPage("title5")} </h2>
              <p className="mb-4">{tPage("p5")}</p>
              <h2 className="text-3xl font-bold mb-6">{tPage("title6")}</h2>
              <p className="mb-4">
                {tPage("p61")}
                <a
                  href="mailto:kidsplanet@gmail.com"
                  className="text-blue-500 text-[14px]"
                >
                  kidsplanet@gmail.com
                </a>
                . {tPage("p62")}
              </p>
              <h2 className="text-3xl font-bold mb-6">{tPage("title7")}</h2>
              <p className="mb-4">
                {tPage("p71")}
                <Link
                  href={`/return-and-refund-policy`}
                  className="text-blue-500"
                >
                  {tPage("p72")}
                </Link>{" "}
                {tPage("p73")}
              </p>
              <h2 className="text-3xl font-bold mb-6"> {tPage("title8")}</h2>
              <p className="mb-4">{tPage("p8")}</p>
              <h2 className="text-3xl font-bold mb-6">{tPage("title9")}</h2>
              <p className="mb-4">
                {tPage("p9")}
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
  );
};

export default Page;
