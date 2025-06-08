import React from "react";
import { ModalsFactory, ModalsProviderRegistryGuard } from "src/modals-module";

import { IModalsStoreRegistry, ModalName } from "src/core-module/store/modals.store.ts";
import {
  CreateOrEditProjectDialogProps,
  CreateOrEditProjectDialog,
} from "src/core-module/components/create-or-edit-project-dialog/create-or-edit-project-dialog.tsx";
import { modalsStore } from "src/core-module/store/modals.store.ts";
import {
  CreateOrEditUserDialog,
  CreateOrEditUserDialogProps,
} from "../../components/create-or-edit-user-dialog";
import {
  AssignUserToProjectDialog,
  AssignUserToProjectDialogProps,
} from "../../components/assign-user-to-project-dialog";
import {
  CreateOrEditBoardDialog,
  CreateOrEditBoardDialogProps,
} from "../../components/create-or-edit-board-dialog";
import {
  CreateOrEditTaskDialog,
  CreateOrEditTaskDialogProps,
} from "../../components/create-or-edit-task-dialog";
import {
  CreateOrEditOrganizationDialog,
  CreateOrEditOrganizationDialogProps,
} from "../../components/create-or-edit-organization-dialog";

interface IModalsProviderRegistry extends ModalsProviderRegistryGuard<ModalName> {
  CreateOrEditProjectDialog: React.FC<CreateOrEditProjectDialogProps>;
  CreateOrEditUserDialog: React.FC<CreateOrEditUserDialogProps>;
  AssignUserToProjectDialog: React.FC<AssignUserToProjectDialogProps>;
  CreateOrEditBoardDialog: React.FC<CreateOrEditBoardDialogProps>;
  CreateOrEditTaskDialog: React.FC<CreateOrEditTaskDialogProps>;
  CreateOrEditOrganizationDialog: React.FC<CreateOrEditOrganizationDialogProps>;
}

const modalsRegistry: IModalsProviderRegistry = {
  CreateOrEditProjectDialog,
  CreateOrEditUserDialog,
  AssignUserToProjectDialog,
  CreateOrEditBoardDialog,
  CreateOrEditTaskDialog,
  CreateOrEditOrganizationDialog,
};

export const ModalsProvider = ModalsFactory.createProvider<
  ModalName,
  IModalsStoreRegistry,
  IModalsProviderRegistry
>(modalsStore, modalsRegistry);
