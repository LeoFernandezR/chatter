import React from "react";

type Props = {
  children?: React.ReactNode;
};

const Background = ({children}: Props) => {
  return (
    <main className="relative h-screen max-h-screen min-h-screen text-white bg-gradient-to-b from-jet-500 to-orchid-crayola-800">
      {children}
    </main>
  );
};

export default Background;
