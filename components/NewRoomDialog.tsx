import React, {Fragment} from "react";
import {Dialog, Transition} from "@headlessui/react";

import Background from "./ui/Background";

interface Props {
  isOpen: boolean;
  closeModal: VoidFunction;
}

const NewRoomDialog = ({isOpen, closeModal}: Props) => {
  return (
    <Transition show={isOpen}>
      <Dialog onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div aria-hidden="true" className="fixed inset-0 bg-black/30" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="flex flex-col items-center justify-center w-full max-w-md p-4 mx-auto text-white bg-gradient-to-b from-jet-500 to-orchid-crayola-800">
              <Dialog.Title>Deactivate account</Dialog.Title>
              <Dialog.Description>This will permanently deactivate your account</Dialog.Description>

              <p>
                Are you sure you want to deactivate your account? All of your data will be
                permanently removed. This action cannot be undone.
              </p>

              <button onClick={closeModal}>Cancel</button>
              <button>Deactivate</button>
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default NewRoomDialog;
