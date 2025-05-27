import React from "react";
import { Flex } from "@chakra-ui/react";
import { ColorModeButton } from "src/components/ui/color-mode.tsx";

export const AppHeader: React.FC = () => {
  return (
    <Flex
      justifyContent="flex-end"
      alignItems="center"
      padding="16px 40px"
      borderBottom="1px solid"
      backgroundColor="gray.100"
    >
      <ColorModeButton />
    </Flex>
  );
};
