import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {shallow} from "zustand/shallow";

import useAuthStore from "@/store/auth";

// import {useAuth} from "../context/AuthContext";

const schema = yup.object({
  username: yup.string().required(),
  confirmUsername: yup
    .string()
    .required()
    .oneOf([yup.ref("username")], "Usernames must match"),
});

type RegisterFormData = yup.InferType<typeof schema>;

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
    setError,
  } = useForm<RegisterFormData>({resolver: yupResolver(schema)});
  // const {saveUsername, user} = useAuth();
  const {saveUsername, user} = useAuthStore(
    (state) => ({saveUsername: state.saveUsername, user: state.user}),
    shallow,
  );

  const onSubmit = async ({username}: RegisterFormData) => {
    if (!user) return;

    try {
      await saveUsername({username: username, uid: user.uid});
    } catch (error) {
      setError("username", {message: (error as Error).message});
    }
  };

  return (
    <div className="w-full space-y-4 sm:max-w-lg">
      <h3 className="text-xl font-medium text-center sm:text-2xl sm:text-start sm:ml-6">
        Finish your registration
      </h3>
      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <input
          className="w-full px-6 py-2 text-xl rounded-2xl bg-jet-500 placeholder:text-orchid-crayola-700 focus:outline-none focus:ring focus:ring-orchid-crayola-500 sm:text-2xl"
          {...register("username")}
          placeholder="Enter username"
        />
        {errors.username && <p className="ml-4 text-sm text-red-500">{errors.username?.message}</p>}

        <input
          className="w-full px-6 py-2 text-xl rounded-2xl bg-jet-500 placeholder:text-orchid-crayola-700 focus:outline-none focus:ring focus:ring-orchid-crayola-500 sm:text-2xl"
          placeholder="Confirm username"
          {...register("confirmUsername")}
        />
        {errors.confirmUsername && (
          <p className="ml-4 text-sm text-red-500">{errors.confirmUsername?.message}</p>
        )}
        <div className="flex justify-center">
          <button
            className="w-full px-6 py-2 italic font-bold transition-colors duration-300 ease-in-out shadow-lg cursor-pointer rounded-2xl bg-baby-powder-800/40 hover:bg-orchid-crayola-500 focus:outline-none focus:bg-orchid-crayola-500 shadow-orchid-crayola-800 sm:text-2xl disabled:cursor-not-allowed disabled:bg-jet-800"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? "Submitting..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
