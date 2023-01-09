import {useRouter} from "next/router";
import React, {ReactElement} from "react";

import {useAuth} from "../../context/AuthContext";
import {NextPageWithLayout} from "../_app";
import Layout from "../../components/layout/Layout";

type Props = {};

const ChatRoom: NextPageWithLayout = (props: Props) => {
  const router = useRouter();
  const {logout} = useAuth();

  return (
    <div>
      <h1>{router.query.id}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

ChatRoom.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default ChatRoom;
