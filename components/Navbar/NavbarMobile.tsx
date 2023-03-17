import {Transition} from "@headlessui/react";
import React, {useState} from "react";
import {Icon} from "@iconify/react";

import Background from "../ui/Background";

import Navbar from "./Navbar";
interface Props {}

const NavbarMobile: React.FC<Props> = ({}) => {
  const [showNavbar, setShowNavbar] = useState(false);

  const closeNavbar = () => setShowNavbar(false);

  return (
    <aside className="sm:hidden">
      <button className="p-4 text-orchid-crayola-500" onClick={() => setShowNavbar(!showNavbar)}>
        <Icon className="text-3xl" icon="ion:menu" />
      </button>
      <Transition show={showNavbar}>
        <Transition.Child
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="absolute inset-0 bg-stone-800/90" onClick={closeNavbar} />
        </Transition.Child>
        <Transition.Child
          className="absolute top-0 bottom-0 w-full max-w-xs"
          enter="transition ease-linear duration-300"
          enterFrom="translate-x-[-100%]"
          enterTo="translate-x-100"
          leave="transition ease-linear duration-300"
          leaveFrom="translate-x-100"
          leaveTo="translate-x-[-100%]"
        >
          <Background>
            <div className="flex flex-col w-full h-full max-w-xs">
              <Navbar handleClose={closeNavbar} />
            </div>
          </Background>
        </Transition.Child>
      </Transition>
    </aside>
  );
};

export default NavbarMobile;
