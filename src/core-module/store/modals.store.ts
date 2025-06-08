import { ModalProps, ModalsFactory, ModalsStoreRegistryGuard } from "../../modals-module";
import { CreateOrEditProjectDialogProps } from "../components/create-or-edit-project-dialog";
import { CreateOrEditUserDialogProps } from "../components/create-or-edit-user-dialog";
import { AssignUserToProjectDialogProps } from "../components/assign-user-to-project-dialog";
import { CreateOrEditBoardDialogProps } from "../components/create-or-edit-board-dialog";
import { CreateOrEditTaskDialogProps } from "../components/create-or-edit-task-dialog";
import { CreateOrEditOrganizationDialogProps } from "../components/create-or-edit-organization-dialog";

export type ModalName =
  | "CreateOrEditProjectDialog"
  | "CreateOrEditUserDialog"
  | "AssignUserToProjectDialog"
  | "CreateOrEditBoardDialog"
  | "CreateOrEditTaskDialog"
  | "CreateOrEditOrganizationDialog";

export interface IModalsStoreRegistry extends ModalsStoreRegistryGuard<ModalName> {
  CreateOrEditProjectDialog: Omit<CreateOrEditProjectDialogProps, keyof ModalProps>;
  CreateOrEditUserDialog: Omit<CreateOrEditUserDialogProps, keyof ModalProps>;
  AssignUserToProjectDialog: Omit<AssignUserToProjectDialogProps, keyof ModalProps>;
  CreateOrEditBoardDialog: Omit<CreateOrEditBoardDialogProps, keyof ModalProps>;
  CreateOrEditTaskDialog: Omit<CreateOrEditTaskDialogProps, keyof ModalProps>;
  CreateOrEditOrganizationDialog: Omit<CreateOrEditOrganizationDialogProps, keyof ModalProps>;
}

export const modalsStore = ModalsFactory.createStore<ModalName, IModalsStoreRegistry>();
