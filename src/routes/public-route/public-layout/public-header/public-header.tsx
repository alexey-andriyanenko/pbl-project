import React from "react";

import { chakra } from "@chakra-ui/react";
import { ColorModeButton } from "src/components/ui/color-mode.tsx";

export const PublicHeader: React.FC = () => {
  return (
    <chakra.header
      display="flex"
      justifyContent="flex-end"
      alignContent="center"
      width="100%"
      padding="16px 40px"
      borderBottom="1px solid"
      borderColor="gray.200"
    >
      <ColorModeButton />
    </chakra.header>
  );
};
