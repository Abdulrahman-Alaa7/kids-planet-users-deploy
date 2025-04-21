import React from "react";
import Heading from "../../utils/Heading";
import { useTranslations } from "next-intl";
import Search from "../../../components/Search";

const Page = () => {
  const tHeader = useTranslations("AllHeader");
  return (
    <div>
      <Heading
        title={`Kids Planet | ${tHeader("searchTitle")}`}
        description="Kids Planet هو افضل مكان لبيع لبس الاطفال في مصر من حيث الجوده و السعر"
        keywords="kids planet, ملابس اطفال, لبس اطفال, اطفال, لبس , محلات لبس اطفال , كيدز بلانت, كيدز"
      />
      <div className={`mt-[20px] md:mt-[60px]`}>
        <Search />
      </div>
    </div>
  );
};

export default Page;
