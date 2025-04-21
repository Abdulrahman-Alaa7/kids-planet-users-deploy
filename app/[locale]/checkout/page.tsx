import React from "react";
import { useTranslations } from "next-intl";
import Heading from "../../../app/utils/Heading";
import CheckoutCom from "../../../components/CheckoutCom";

type Props = {};

const Page = (props: Props) => {
  const tCheckout = useTranslations("CheckOut");

  return (
    <div>
      <CheckoutCom />
    </div>
  );
};

export default Page;
