import React from "react";

import { Dialog, Button, Portal, Stack, Field, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { ModalProps } from "../../../modals-module";
import { UserFormValues } from "./create-or-edit-user-dialog.types.ts";
import { UserModel } from "../../models/user.ts";

export type CreateOrEditUserDialogProps = ModalProps & {
  user?: UserModel;
  onCreate?: (values: UserFormValues) => Promise<void>;
  onEdit?: (values: UserFormValues) => Promise<void>;
};

export const CreateOrEditUserDialog: React.FC<CreateOrEditUserDialogProps> = ({
  isOpen,
  onClose,
  user,
  onCreate,
  onEdit,
}) => {
  const { formState, register, handleSubmit } = useForm<UserFormValues>({
    defaultValues: {
      username: user?.username || "",
      email: user?.email || "",
      fullName: user?.fullName || "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    if (user) {
      await onEdit?.(data);
    } else {
      await onCreate?.(data);
    }

    onClose();
  });

  const validateConfirmPassword = (value: string, formValues: UserFormValues) => {
    if (value && formValues.password && value !== formValues.password) {
      return "Passwords do not match";
    }
    return true;
  };

  return (
    <Dialog.Root lazyMount open={isOpen} placement="center">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Create/Edit User</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb="4">
              <Stack gap="4">
                <Field.Root invalid={!!formState.errors.fullName}>
                  <Field.Label>Full Name</Field.Label>
                  <Input
                    {...register("fullName", {
                      required: {
                        value: true,
                        message: "Full Name is required",
                      },
                    })}
                  />
                  <Field.ErrorText>{formState.errors.fullName?.message}</Field.ErrorText>
                </Field.Root>
                <Field.Root invalid={!!formState.errors.username}>
                  <Field.Label>Username</Field.Label>
                  <Input
                    {...register("username", {
                      required: {
                        value: true,
                        message: "Username is required",
                      },
                    })}
                  />
                  <Field.ErrorText>{formState.errors.username?.message}</Field.ErrorText>
                </Field.Root>
                <Field.Root invalid={!!formState.errors.email}>
                  <Field.Label>Email</Field.Label>
                  <Input
                    {...register("email", {
                      required: {
                        value: true,
                        message: "Email is required",
                      },
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email format",
                      },
                    })}
                  />
                  <Field.ErrorText>{formState.errors.fullName?.message}</Field.ErrorText>
                </Field.Root>

                {user ? null : (
                  <>
                    <Field.Root invalid={!!formState.errors.password}>
                      <Field.Label>Password</Field.Label>
                      <Input
                        {...register("password", {
                          required: {
                            // required only in Edit mode
                            value: !user,
                            message: "Password is required",
                          },
                          pattern: {
                            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                            message:
                              "Password must be at least 8 characters long and contain at least one letter and one number",
                          },
                        })}
                      />
                      <Field.ErrorText>{formState.errors.password?.message}</Field.ErrorText>
                    </Field.Root>
                    <Field.Root invalid={!!formState.errors.confirmPassword}>
                      <Field.Label>Confirm Password</Field.Label>
                      <Input
                        {...register("confirmPassword", {
                          validate: validateConfirmPassword,
                        })}
                      />
                      <Field.ErrorText>{formState.errors.confirmPassword?.message}</Field.ErrorText>
                    </Field.Root>
                  </>
                )}
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
