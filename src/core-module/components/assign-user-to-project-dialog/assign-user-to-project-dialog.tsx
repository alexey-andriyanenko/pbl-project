import React from "react";
import { Controller, useForm } from "react-hook-form";

import {
  Dialog,
  Button,
  Portal,
  Stack,
  Field,
  Select,
  createListCollection,
} from "@chakra-ui/react";
import { ModalProps } from "../../../modals-module";
import { UserModel } from "../../models/user.ts";
import { AssignUserFormValues } from "./assign-user-to-project-dialog.types.ts";

export type AssignUserToProjectDialogProps = ModalProps & {
  users: UserModel[];
  onAssign: (userId: number) => Promise<void>;
};

export const AssignUserToProjectDialog: React.FC<AssignUserToProjectDialogProps> = ({
  isOpen,
  onClose,
  users,
  onAssign,
}) => {
  const collection = React.useMemo(
    () => createListCollection({ items: users.map((x) => ({ label: x.fullName, value: x.id })) }),
    [users],
  );
  const { formState, setError, control, handleSubmit } = useForm<AssignUserFormValues>({
    defaultValues: {
      userId: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    if (!data.userId) {
      setError("userId", {
        type: "manual",
        message: "User is required",
      });
      return;
    }

    await onAssign(+data.userId);
    onClose();
  });

  return (
    <Dialog.Root lazyMount placement="center" open={isOpen}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Assign user to the project</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb="4">
              <Stack gap="4">
                <Field.Root invalid={!!formState.errors.userId}>
                  <Field.Label>User</Field.Label>
                  <Controller
                    control={control}
                    name="userId"
                    render={({ field }) => (
                      <Select.Root
                        name={field.name}
                        value={field.value}
                        onValueChange={(item) => field.onChange(item.value[0])}
                        onInteractOutside={() => field.onBlur()}
                        collection={collection}
                      >
                        <Select.HiddenSelect />
                        <Select.Control>
                          <Select.Trigger>
                            <Select.ValueText placeholder="Select user" />
                          </Select.Trigger>
                          <Select.IndicatorGroup>
                            <Select.Indicator />
                          </Select.IndicatorGroup>
                        </Select.Control>
                        <Select.Positioner>
                          <Select.Content>
                            {collection.items.map((item) => (
                              <Select.Item key={item.value} item={item}>
                                {item.label}
                                <Select.ItemIndicator />
                              </Select.Item>
                            ))}
                          </Select.Content>
                        </Select.Positioner>
                      </Select.Root>
                    )}
                  />
                  <Field.ErrorText>{formState.errors.userId?.message}</Field.ErrorText>
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
