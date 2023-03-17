import {Icon} from "@iconify/react";
import React from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  handleClose?: VoidFunction;
};

const NavbarHeader = ({handleClose}: Props) => {
  return (
    <header className="flex justify-between">
      <Link className="block max-w-[150px]" href="/chat">
        <Image alt="chatter logo" height={68} src="/chatter-logo.svg" width={299} />
      </Link>

      <button className="sm:hidden" onClick={handleClose}>
        <Icon className="text-xl text-orchid-crayola-500" icon="ant-design:close-outlined" />
      </button>
    </header>
  );
};

export default NavbarHeader;
