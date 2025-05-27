import React from "react";

import { Box } from "@chakra-ui/react";
import { PublicHeader } from "./public-header";

export const PublicLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Box width="100%" height="100vh" overflow="hidden">
      <PublicHeader />

      {children}
    </Box>
  );
};
