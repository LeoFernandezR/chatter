import {Icon} from "@iconify/react";
import React from "react";
import Image from "next/image";

import chatterLogo from "../../../public/chatter-logo.svg";

type Props = {
  handleClose?: VoidFunction;
};

const NavbarHeader = ({handleClose}: Props) => {
  return (
    <header className="flex justify-between">
      <div>
        <Image src={chatterLogo} width={150} />
      </div>

      <button className="sm:hidden" onClick={handleClose}>
        <Icon className="text-xl text-orchid-crayola-500" icon="ant-design:close-outlined" />
      </button>
    </header>
  );
};

export default NavbarHeader;
