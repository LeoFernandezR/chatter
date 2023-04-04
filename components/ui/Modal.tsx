import {Transition, Dialog} from "@headlessui/react";
import React, {Fragment} from "react";

type Props = {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: VoidFunction;
};

const Modal = ({title, isOpen, onClose, children}: Props) => {
  return (
    <Transition show={isOpen}>
      <Dialog onClose={onClose}>
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
            <Dialog.Panel className="flex flex-col items-center justify-center w-full max-w-md p-4 mx-auto text-white rounded-lg bg-gradient-to-b from-jet-500 to-orchid-crayola-800">
              <Dialog.Title className="py-2 pb-6 text-2xl font-bold">{title}</Dialog.Title>
              {children}
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default Modal;
