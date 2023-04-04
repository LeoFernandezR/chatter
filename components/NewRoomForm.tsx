import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import * as yup from "yup";

import useRooms from "../hooks/useRooms";

import Modal from "./ui/Modal";

interface Props {
  isOpen: boolean;
  closeModal: VoidFunction;
}

const schema = yup
  .object({
    roomName: yup.string().required(),
  })
  .required();

type NewRoomFormData = yup.InferType<typeof schema>;

const NewRoomForm = ({isOpen, closeModal}: Props) => {
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
    setError,
  } = useForm<NewRoomFormData>({resolver: yupResolver(schema)});

  const {createRoom} = useRooms();

  const onSubmit = async ({roomName}: NewRoomFormData) => {
    try {
      await createRoom(roomName);
      closeModal();
    } catch (error) {
      const errorMessage = (error as Error).message;

      setError("roomName", {message: errorMessage});
    }
  };

  return (
    <Modal isOpen={isOpen} title="Create a new room" onClose={closeModal}>
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
            type="button"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default NewRoomForm;
