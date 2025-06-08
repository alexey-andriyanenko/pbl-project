import React from "react";

import { Flex } from "@chakra-ui/react";
import { PrivateHeader } from "./private-header";

export const PrivateLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Flex direction="column" width="100%" height="100vh" overflow="hidden">
      <PrivateHeader />

      {children}
    </Flex>
  );
};
