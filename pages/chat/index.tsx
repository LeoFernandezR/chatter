import {ReactElement} from "react";

import Layout from "../../components/layout/Layout";
import {NextPageWithLayout} from "../_app";
import NavbarMobile from "../../components/Navbar/NavbarMobile";

const Chat: NextPageWithLayout = () => {
  return (
    <section className="flex flex-col h-full">
      <header className="flex items-center gap-4">
        <NavbarMobile />
        <div className="py-4 sm:px-4">
          <h1 className="text-xl">Chat</h1>
        </div>
      </header>

      <section className="flex flex-col items-center justify-center flex-1">chatBody</section>
      <form className="p-4">
        <div className="p-2 focus-within:border bg-jet-500 focus-within:border-orchid-crayola-500 rounded-xl">
          <textarea className="w-full h-20 outline-none resize-none bg-jet-500 rounded-xl" />
        </div>
      </form>
    </section>
  );
};

Chat.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Chat;
