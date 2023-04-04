import React from "react";
import * as RadixTooltip from "@radix-ui/react-tooltip";

type Props = {
  children: React.ReactNode;
  title: string;
};

const Tooltip = ({title, children}: Props) => {
  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root delayDuration={0}>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            className="hidden p-2 px-4 text-sm text-orchid-crayola-400 rounded-xl bg-jet-600/90 sm:block"
            sideOffset={5}
          >
            {title}
            <RadixTooltip.Arrow className="fill-jet-600/90" />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};

export default Tooltip;
