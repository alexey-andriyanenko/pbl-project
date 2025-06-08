import React from "react";

import { Button, Flex } from "@chakra-ui/react";

import { authApiService } from "../../api";

const AdminHack: React.FC = () => {
  const handleClick = async () => {
    await authApiService.initAdmin();
  };

  return (
    <Flex flex="1" width="100%" justify="center">
      <Button onClick={handleClick}>Init Admin</Button>
    </Flex>
  );
};

export default AdminHack;
