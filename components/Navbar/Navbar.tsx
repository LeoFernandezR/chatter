import React from "react";

import NavbarHeader from "./NavbarHeader";
import NavbarMenu from "./NavbarMenu";
import NavbarFooter from "./NavbarFooter";

interface Props {
  handleClose?: VoidFunction;
}

const Navbar: React.FC<Props> = ({handleClose}) => {
  return (
    <div className="flex flex-col h-full gap-4 p-6">
      <NavbarHeader handleClose={handleClose} />
      <NavbarMenu />
      <NavbarFooter />
    </div>
  );
};

export default Navbar;
