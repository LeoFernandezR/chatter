import {Icon} from "@iconify/react";
import * as Tooltip from "@radix-ui/react-tooltip";
import React, {useState} from "react";

import NewRoomDialog from "./NewRoomDialog";

type Props = {};

const NewRoomButton = ({}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  console.log(isOpen);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  return (
    <>
      <NewRoomDialog closeModal={closeModal} isOpen={isOpen} />
      <Tooltip.Provider>
        <Tooltip.Root delayDuration={0}>
          <Tooltip.Trigger asChild>
            <button
              className="flex items-center gap-1 font-medium text-orchid-crayola-500"
              onClick={openModal}
            >
              <Icon className="text-xl" icon="material-symbols:add" />
              <span className="text-sm sm:hidden">New Room</span>
            </button>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              className="hidden p-2 px-4 text-sm text-orchid-crayola-400 rounded-xl bg-jet-600/90 sm:block"
              sideOffset={5}
            >
              New Room
              <Tooltip.Arrow className="fill-jet-600/90" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    </>
  );
};

export default NewRoomButton;
