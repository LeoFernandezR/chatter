import {useRouter} from "next/router";
import React, {ReactElement} from "react";

import {NextPageWithLayout} from "../_app";
import Layout from "../../components/layout/Layout";

type Props = {};

const ChatRoom: NextPageWithLayout = ({}: Props) => {
  const router = useRouter();

  return (
    <div>
      <h1>{router.query.id}</h1>
    </div>
  );
};

ChatRoom.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default ChatRoom;
