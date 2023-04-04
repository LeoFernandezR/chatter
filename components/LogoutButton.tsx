import React from "react";
import {Icon} from "@iconify/react";

import Tooltip from "./ui/Tooltip";

import useAuthStore from "@/store/auth";

type Props = {};

const LogoutButton = ({}: Props) => {
  const logout = useAuthStore((state) => state.signOut);

  return (
    <Tooltip title="Logout">
      <button className="flex items-center gap-1 text-xl text-orchid-crayola-400" onClick={logout}>
        <Icon icon="material-symbols:logout-rounded" />
        <p className="text-sm sm:hidden">Logout</p>
      </button>
    </Tooltip>
  );
};

export default LogoutButton;
