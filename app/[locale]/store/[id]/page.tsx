import React from "react";
import SingleProduct from "../../../../components/SingleProduct";

type Props = {
  params: any;
};
const Page = ({ params }: Props) => {
  const { id }: any = React.use(params);

  return (
    <div className=" py-3">
      <SingleProduct id={id} />
    </div>
  );
};

export default Page;
