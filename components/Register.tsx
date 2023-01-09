import React, {useEffect, useState} from "react";

import {useAuth} from "../context/AuthContext";

type Props = {};

const Register = (props: Props) => {
  const {saveUsername, user} = useAuth();
  const [input, setInput] = useState({username: "", confirmUsername: ""});
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prevInput) => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    if (!input.username || !input.confirmUsername) {
      return setError("fields missing...");
      setSubmitting(false);
    }
    if (input.username !== input.confirmUsername) {
      setSubmitting(false);

      return setError("diferent usernames...");
    }

    if (user) {
      try {
        await saveUsername({username: input.username, userId: user.uid});
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    }
    setSubmitting(false);
  };

  return (
    <div className="w-full space-y-4 sm:max-w-lg">
      <h3 className="text-xl font-medium text-center sm:text-2xl sm:text-start sm:ml-6">
        Finish your registration
      </h3>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <input
          className="w-full px-6 py-2 text-xl rounded-2xl bg-jet-500 placeholder:text-orchid-crayola-700 focus:outline-none focus:ring focus:ring-orchid-crayola-500 sm:text-2xl"
          name="username"
          placeholder="Enter username"
          value={input.username}
          onChange={handleChange}
        />
        <input
          className="w-full px-6 py-2 text-xl rounded-2xl bg-jet-500 placeholder:text-orchid-crayola-700 focus:outline-none focus:ring focus:ring-orchid-crayola-500 sm:text-2xl"
          name="confirmUsername"
          placeholder="Confirm username"
          value={input.confirmUsername}
          onChange={handleChange}
        />
        {error && <p className="ml-4 text-sm text-red-500">{error}</p>}
        <div className="flex justify-center">
          <button
            className="w-full px-6 py-2 italic font-bold transition-colors duration-300 ease-in-out shadow-lg cursor-pointer rounded-2xl bg-baby-powder-800/40 hover:bg-orchid-crayola-500 focus:outline-none focus:bg-orchid-crayola-500 shadow-orchid-crayola-800 sm:text-2xl disabled:cursor-not-allowed disabled:bg-jet-800"
            disabled={submitting}
            type="submit"
          >
            {submitting ? "Submitting..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
