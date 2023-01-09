import React from "react";

import Background from "../ui/Background";
interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({children}) => {
  return <Background>{children}</Background>;
};

export default Layout;
