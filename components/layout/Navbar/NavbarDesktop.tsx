import React from "react";

import Navbar from "./Navbar";

type Props = {};

const NavbarDesktop = ({}: Props) => {
  return (
    <aside className="flex-col hidden w-full h-full max-w-xs border-r-2 border-r-orchid-crayola-800 sm:flex">
      <Navbar />
    </aside>
  );
};

export default NavbarDesktop;
