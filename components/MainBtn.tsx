import React from "react";
import { Button } from "./ui/button";

type Props = {
  title: string;
  accessKey?: string;
};

const MainBtn = ({ title, accessKey }: Props) => {
  return (
    <Button
      name="Main_Btn"
      accessKey={accessKey}
      className="rounded-full bg-[#e70767]  py-3 px-4 !z-50  hover:bg-[#e70767] hover:opacity-90 hover:!text-white"
    >
      {title}
    </Button>
  );
};

export default MainBtn;
