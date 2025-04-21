"use client";
import React, { FC } from "react";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { usePathname, useRouter } from "../i18n/routing";
import { Languages } from "lucide-react";

type Props = {};

const LangMenu: FC<Props> = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={`ghost`}
          size="icon"
          className="rounded-3xl w-12 h-10 "
        >
          <Languages size={20} />
          <span className="sr-only">Language Menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className={`mt-2 rounded-3xl py-2`}>
        <button
          type="button"
          onClick={() => router.push(pathname, { locale: "en" })}
          className="!text-center block w-full  mx-auto "
        >
          <DropdownMenuItem className="flex justify-center items-center rounded-3xl">
            English
          </DropdownMenuItem>
        </button>
        <button
          type="button"
          onClick={() => router.push(pathname, { locale: "ar" })}
          className="!text-center block w-full  mx-auto "
        >
          <DropdownMenuItem className="flex justify-center items-center rounded-3xl">
            العربية
          </DropdownMenuItem>
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LangMenu;
