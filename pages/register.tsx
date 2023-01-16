import Image from "next/image";

import Background from "../components/ui/Background";
import ChatterBg from "../public/chatter-desktop-bg.svg";
import ChatterHi from "../public/chatter-hi.svg";
import ChatterLogo from "../public/chatter-logo.svg";
import Register from "../components/Register";

const register = () => {
  return (
    <Background>
      <div className="flex flex-col h-full px-8 justify-evenly sm:flex-row sm:justify-center sm:items-center sm:gap-x-40">
        <div className="absolute flex-1 flex-shrink-0 hidden opacity-25 left-20 sm:block">
          <Image priority alt="Chatter Logo" src={ChatterBg} />
        </div>
        <div className="mx-auto w-fit sm:mx-0 sm:relative">
          <Image priority alt="Chatter Logo" src={ChatterLogo} width={540} />
          <h2 className="absolute right-0 hidden mr-3 text-3xl font-light text-orchid-crayola-500/10 text-end sm:block sm:text-6xl -bottom-[4.5rem]">
            for everyone
          </h2>
          <h2 className="absolute right-0 hidden mr-3 text-3xl font-light text-orchid-crayola-500/30 text-end sm:block sm:text-6xl -bottom-9">
            for everyone
          </h2>
          <h2 className="relative mr-3 text-3xl font-light text-orchid-crayola-500 text-end sm:text-6xl">
            for everyone
          </h2>
        </div>
        <div className="w-full space-y-4 sm:max-w-lg">
          <Register />
        </div>
        <div className="basis-[20%] sm:hidden">
          <Image
            priority
            alt="Chatter Logo"
            className="absolute bottom-0 right-10"
            src={ChatterHi}
          />
        </div>
      </div>
    </Background>
  );
};

export default register;
