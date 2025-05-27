import React from "react";

import { Flex } from "@chakra-ui/react";

import { OrganizationSidebar } from "../organization/organization-sidebar";
import { UsersList } from "./users-list";

const OrganizationUsers: React.FC = () => {
  return (
    <Flex direction="row" width="100%" height="100vh">
      <OrganizationSidebar />

      <Flex direction="column" width="100%" p={4}>
        <UsersList users={[]} />
      </Flex>
    </Flex>
  );
};

export default OrganizationUsers;
