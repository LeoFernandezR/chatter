import React from "react";

import Background from "../ui/Background";
import {useAuth} from "../../context/AuthContext";
import {Room} from "../../hooks/useRooms";

import Navbar from "./Navbar";

interface Props {
  children: React.ReactNode;
}

const mockRoom: Room = {
  id: `${Math.floor(Math.random() * 1000000 + 1)}`,
  name: "Typescript",
  timestamp: new Date().toLocaleDateString("es-ES"),
};

const mockRooms = new Array(40).fill({name: "Typescript"});

const Layout: React.FC<Props> = ({children}) => {
  const {logout} = useAuth();

  return (
    <Background>
      <Navbar />
      {children}
    </Background>
  );
};

export default Layout;
