import {Icon} from "@iconify/react";

import Background from "./Background";

export const LoaderIcon = ({className}: {className?: string}) => (
  <Icon
    className={`text-6xl text-orchid-crayola-500 animate-spin ${className}`}
    icon="ant-design:loading-3-quarters-outlined"
  />
);

export const LoadingPage = () => {
  return (
    <Background>
      <div className="grid h-full min-h-screen place-items-center">
        <LoaderIcon />
      </div>
    </Background>
  );
};
