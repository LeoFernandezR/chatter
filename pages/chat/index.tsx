import {ReactElement} from "react";

import Layout from "../../components/layout/Layout";
import {useAuth} from "../../context/AuthContext";
import {NextPageWithLayout} from "../_app";

const Chat: NextPageWithLayout = () => {
  const {logout} = useAuth();

  return <div>chat</div>;
};

Chat.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Chat;
