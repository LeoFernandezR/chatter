import {Icon} from "@iconify/react";

import Background from "../ui/Background";

const Loader = () => {
  return (
    <Background>
      <div className="grid h-full min-h-screen place-items-center">
        <Icon
          className="text-6xl text-orchid-crayola-500 animate-spin"
          icon="ant-design:loading-3-quarters-outlined"
        />
      </div>
    </Background>
  );
};

export default Loader;
