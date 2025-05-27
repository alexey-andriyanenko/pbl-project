import React from "react";

import { Box, Heading, Text } from "@chakra-ui/react";

export const NotFoundRoute: React.FC = () => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading as="h1" size="2xl" mb={4}>
        404 - Page Not Found
      </Heading>
      <Text fontSize="xl">The page you are looking for does not exist.</Text>
    </Box>
  );
};
