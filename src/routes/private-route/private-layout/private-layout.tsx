import React from "react";

import { Box } from "@chakra-ui/react";
import { PrivateHeader } from "./private-header";

export const PrivateLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Box width="100%" height="100vh" overflow="hidden">
      <PrivateHeader />

      {children}
    </Box>
  );
};
