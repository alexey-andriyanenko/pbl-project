import React from "react";
import { Dialog, Button, Portal, Stack, Field, Input, Textarea } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { ModalProps } from "../../../modals-module";
import { BoardFormValues } from "./create-or-edit-board-dialog.types.ts";
import { BoardModel } from "../../models/board.ts";

export type CreateOrEditBoardDialogProps = ModalProps & {
  board?: BoardModel;
  onCreate?: (values: BoardFormValues) => Promise<void>;
  onEdit?: (values: BoardFormValues) => Promise<void>;
};

export const CreateOrEditBoardDialog: React.FC<CreateOrEditBoardDialogProps> = ({
  isOpen,
  onClose,
  board,
  onCreate,
  onEdit,
}) => {
  const { formState, register, handleSubmit } = useForm<BoardFormValues>({
    defaultValues: {
      name: board?.name || "",
      description: board?.description || "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    if (board) {
      await onEdit?.(data);
    } else {
      await onCreate?.(data);
    }

    onClose();
  });

  return (
    <Dialog.Root lazyMount open={isOpen} placement="center">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Create/Edit Board</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb="4">
              <Stack gap="4">
                <Field.Root invalid={!!formState.errors.name}>
                  <Field.Label>Board Name</Field.Label>
                  <Input
                    {...register("name", {
                      required: {
                        value: true,
                        message: "Name is required",
                      },
                    })}
                  />
                  <Field.ErrorText>{formState.errors.name?.message}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!formState.errors.description}>
                  <Field.Label>Board Description</Field.Label>
                  <Textarea
                    {...register("description", {
                      maxLength: {
                        value: 250,
                        message: "Description cannot exceed 250 characters",
                      },
                    })}
                  />
                  <Field.ErrorText>{formState.errors.description?.message}</Field.ErrorText>
                </Field.Root>
              </Stack>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
              </Dialog.ActionTrigger>
              <Button loading={formState.isSubmitting} onClick={onSubmit}>
                Save
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
