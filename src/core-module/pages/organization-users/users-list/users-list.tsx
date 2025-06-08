import React from "react";
import { observer } from "mobx-react-lite";
import { Table, Avatar, Menu, IconButton, Portal } from "@chakra-ui/react";
import { HiDotsVertical } from "react-icons/hi";

import { UserModel } from "src/core-module/models/user.ts";
import { pickColor } from "src/shared-module/utils";

import { USERS_LIST_COLUMNS } from "./users-list.constants.ts";

type UsersListProps = {
  users: UserModel[];
  onEdit: (user: UserModel) => void;
  onDelete: (user: UserModel) => void;
};

export const UsersList: React.FC<UsersListProps> = observer(({ users, onEdit, onDelete }) => {
  const handleMenu = (user: UserModel, value: string) => {
    if (value === "edit") {
      onEdit(user);
    }

    if (value === "delete") {
      onDelete(user);
    }
  };

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>Avatar</Table.ColumnHeader>

          {USERS_LIST_COLUMNS.map((col) => (
            <Table.ColumnHeader key={col.key}>{col.label}</Table.ColumnHeader>
          ))}

          <Table.ColumnHeader>Actions</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {users.map((user) => (
          <Table.Row key={user.id}>
            <Table.Cell>
              <Avatar.Root colorPalette={pickColor(user.fullName)}>
                <Avatar.Fallback name={user.fullName} />
              </Avatar.Root>
            </Table.Cell>

            {USERS_LIST_COLUMNS.map((col) => (
              <Table.Cell key={col.key}>{user[col.key as keyof UserModel]}</Table.Cell>
            ))}

            <Table.Cell>
              <Menu.Root onSelect={({ value }) => handleMenu(user, value)}>
                <Menu.Trigger asChild>
                  <IconButton variant="outline">
                    <HiDotsVertical />
                  </IconButton>
                </Menu.Trigger>
                <Portal>
                  <Menu.Positioner>
                    <Menu.Content>
                      <Menu.Item value="edit">Edit</Menu.Item>
                      <Menu.Item value="delete">Delete</Menu.Item>
                    </Menu.Content>
                  </Menu.Positioner>
                </Portal>
              </Menu.Root>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
});
