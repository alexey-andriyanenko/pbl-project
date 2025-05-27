import React from "react";
import { Table } from "@chakra-ui/react";
import { UserModel } from "src/auth-module/models";
import { USERS_LIST_COLUMNS } from "./users-list.constants.ts";

type UsersListProps = {
  users: UserModel[];
};

export const UsersList: React.FC<UsersListProps> = ({ users }) => {
  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          {USERS_LIST_COLUMNS.map((col) => (
            <Table.ColumnHeader key={col.key}>{col.label}</Table.ColumnHeader>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {users.map((user) => (
          <Table.Row key={user.id}>
            {USERS_LIST_COLUMNS.map((col) => (
              <Table.Cell key={col.key}>{user[col.key as keyof UserModel]}</Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
