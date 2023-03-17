import React, {Fragment} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

import useRooms from "../hooks/useRooms";

interface Props {
  isOpen: boolean;
  closeModal: VoidFunction;
}

const schema = yup
  .object({
    roomName: yup.string().required(),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const NewRoomDialog = ({isOpen, closeModal}: Props) => {
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
    setError,
  } = useForm<FormData>({resolver: yupResolver(schema)});

  const {createRoom} = useRooms();

  const onSubmit = async ({roomName}: FormData) => {
    try {
      await createRoom(roomName);
      closeModal();
    } catch (error) {
      const errorMessage = (error as Error).message;

      setError("roomName", {message: errorMessage});
    }
  };

  return (
    <Transition show={isOpen}>
      <Dialog onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="easeration-300"
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
              <Dialog.Title className="py-2 pb-6 text-2xl font-bold">
                Create a new room
              </Dialog.Title>
              <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <input
                    className="w-full p-2 text-xl rounded-lg bg-jet-500 placeholder:text-orchid-crayola-700 focus:outline-none focus:ring focus:ring-orchid-crayola-500"
                    {...register("roomName")}
                  />
                  {errors?.roomName?.message && (
                    <p className="mt-1 text-sm text-red-500">{errors.roomName.message}</p>
                  )}
                </div>
                <div className="flex flex-row-reverse gap-4">
                  <button
                    className="w-full p-2 font-bold transition-colors rounded-lg shadow-lg cursor-pointer ease duration-250 bg-baby-powder-800/40 hover:bg-orchid-crayola-500 focus:outline-none focus:bg-orchid-crayola-500 shadow-orchid-crayola-800 disabled:cursor-not-allowed disabled:bg-jet-800"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    Create
                  </button>
                  <button
                    className="w-full px-6 py-2 font-bold transition-colors rounded-lg shadow-lg cursor-pointer ease duration-250 bg-baby-powder-800/40 hover:bg-orchid-crayola-500 focus:outline-none focus:bg-orchid-crayola-500 shadow-orchid-crayola-800 disabled:cursor-not-allowed disabled:bg-jet-800"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default NewRoomDialog;
