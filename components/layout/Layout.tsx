import React from "react";

import Background from "../ui/Background";

import NavbarDesktop from "./Navbar/NavbarDesktop";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({children}) => {
  return (
    <Background>
      <div className="flex h-full">
        <NavbarDesktop />
        <section className="flex-1">{children}</section>
      </div>
    </Background>
  );
};

export default Layout;
