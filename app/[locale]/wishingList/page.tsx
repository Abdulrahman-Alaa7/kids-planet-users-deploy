import React from "react";
import { useTranslations } from "next-intl";
import Heading from "../../../app/utils/Heading";
import WishListPage from "../../../components/WishListPage";

type Props = {};

const Page = (props: Props) => {
  const tHeader = useTranslations("AllHeader");

  return (
    <div>
      <Heading
        title={`Kids Planet | ${tHeader("wishingList")}`}
        description="Kids Planet هو افضل مكان لبيع لبس الاطفال في مصر من حيث الجوده و السعر"
        keywords="kids planet, ملابس اطفال, لبس اطفال, اطفال, لبس , محلات لبس اطفال , كيدز بلانت, كيدز"
      />
      <div>
        <WishListPage />
      </div>
    </div>
  );
};

export default Page;
