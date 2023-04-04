import {Icon} from "@iconify/react";
import React, {useState} from "react";

import NewRoomForm from "./NewRoomForm";
import Tooltip from "./ui/Tooltip";

type Props = {};

const NewRoomButton = ({}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  return (
    <>
      <NewRoomForm closeModal={closeModal} isOpen={isOpen} />
      <Tooltip title="New Room">
        <button
          className="flex items-center gap-1 font-medium outline-none text-orchid-crayola-500"
          onClick={openModal}
        >
          <Icon className="text-xl" icon="material-symbols:add" />
          <span className="text-sm sm:hidden">New Room</span>
        </button>
      </Tooltip>
    </>
  );
};

export default NewRoomButton;
