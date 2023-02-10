import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import {Icon} from "@iconify/react";

import {useAuth} from "../context/AuthContext";

type Props = {};

const LogoutButton = ({}: Props) => {
  const {logout} = useAuth();

  return (
    <Tooltip.Provider>
      <Tooltip.Root delayDuration={0}>
        <Tooltip.Trigger asChild>
          <button
            className="flex items-center gap-1 text-xl text-orchid-crayola-400"
            onClick={logout}
          >
            <Icon icon="material-symbols:logout-rounded" />
            <p className="text-sm sm:hidden">Logout</p>
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="hidden p-2 px-4 text-sm text-orchid-crayola-400 rounded-xl bg-jet-500/80 sm:block"
            sideOffset={5}
          >
            Logout
            <Tooltip.Arrow className="fill-jet-500/80" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default LogoutButton;
