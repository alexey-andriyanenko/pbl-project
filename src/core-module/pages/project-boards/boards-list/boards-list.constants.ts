import { BoardColumn } from "./boards-list.types.ts";

export const BOARDS_LIST_COLUMNS: BoardColumn[] = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "description",
    label: "Description",
  },
  {
    key: "createdAt",
    label: "Created At",
  },
];
