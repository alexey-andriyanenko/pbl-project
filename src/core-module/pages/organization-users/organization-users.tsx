import React from "react";

import { Flex, Button } from "@chakra-ui/react";

import { UserModel } from "src/auth-module/models";
import { CreateOrEditUserDialog } from "src/core-module/components/create-or-edit-user-dialog";

import { OrganizationSidebar } from "../organization/organization-sidebar";
import { UsersList } from "./users-list";
0;
const OrganizationUsers: React.FC = () => {
  const [isCreateUserDialogOpen, setCreateUserDialogOpen] = React.useState(false);

  const stubUsers: UserModel[] = [
    {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: "2",
      firstName: "Jane",
      lastName: "Smith",
      email: "janesmith@example.com",
      role: "Employee",
      status: "Inactive",
    },

    {
      id: "3",
      firstName: "Alice",
      lastName: "Johnson",
      email: "alicejohnson@example.com",
      role: "Employee",
      status: "Active",
    },
  ];

  return (
    <Flex direction="row" width="100%" height="100vh">
      <OrganizationSidebar />

      <Flex direction="column" width="100%" p={4}>
        <Flex justify="flex-end">
          <Button variant="outline" onClick={() => setCreateUserDialogOpen(true)}>
            Create User
          </Button>
        </Flex>
        <UsersList users={stubUsers} />
      </Flex>

      <CreateOrEditUserDialog
        isOpen={isCreateUserDialogOpen}
        onClose={() => setCreateUserDialogOpen(false)}
      />
    </Flex>
  );
};

export default OrganizationUsers;
