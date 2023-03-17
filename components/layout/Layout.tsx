import React from "react";

import Background from "../ui/Background";
import Navbar from "../Navbar/Navbar";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({children}) => {
  return (
    <Background>
      <div className="flex h-full">
        <aside className="flex-col hidden w-full h-full max-w-xs border-r-2 border-r-orchid-crayola-800 sm:flex">
          <Navbar />
        </aside>
        <section className="flex-1">{children}</section>
      </div>
    </Background>
  );
};

export default Layout;
