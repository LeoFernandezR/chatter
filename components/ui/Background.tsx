import React from "react";

type Props = {
  children?: React.ReactNode;
};

const Background = ({children}: Props) => {
  return (
    <main className="relative h-screen min-h-screen px-8 text-white bg-gradient-to-b from-jet-500 to-orchid-crayola-800">
      {children}
    </main>
  );
};

export default Background;
