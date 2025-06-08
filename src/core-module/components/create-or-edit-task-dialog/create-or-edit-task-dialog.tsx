import React from "react";
import { observer } from "mobx-react-lite";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Dialog,
  Field,
  Input,
  Portal,
  Select,
  Stack,
  Textarea,
  createListCollection,
} from "@chakra-ui/react";

import { TaskModel, TaskStatus } from "../../models/task.ts";
import { ModalProps } from "../../../modals-module";
import {
  PROJECT_BOARD_DETAILS_COLUMNS,
  TaskStatusToLabel,
} from "../../pages/project-board-details/project-board-details.constants.ts";
import { UserModel } from "../../models/user.ts";

type TaskFormValues = {
  title: string;
  description: string;
  assigneeId: string[];
  status: TaskStatus[];
};

type TaskFormValuesResult = {
  title: string;
  description: string;
  assigneeId: number;
  status: TaskStatus;
};

export type CreateOrEditTaskDialogProps = ModalProps & {
  users: UserModel[];
  task?: TaskModel;
  status?: TaskStatus;
  onEdit?: (task: TaskFormValuesResult) => Promise<void>;
  onCreate?: (task: TaskFormValuesResult) => Promise<void>;
};

const statusesCollection = createListCollection({
  items: PROJECT_BOARD_DETAILS_COLUMNS.map((x) => ({
    value: x,
    label: TaskStatusToLabel[x],
  })),
});

export const CreateOrEditTaskDialog: React.FC<CreateOrEditTaskDialogProps> = observer(
  ({ isOpen, onClose, task, users, status, onEdit, onCreate }) => {
    const { formState, control, getValues, register, handleSubmit } = useForm<TaskFormValues>({
      defaultValues: {
        title: task?.title || "",
        description: task?.description || "",
        assigneeId: task ? [task.assigneeId.toString()] : [],
        status: task ? [task.status] : status ? [status] : ["OPEN"],
      },
    });

    const usersCollection = React.useMemo(
      () =>
        createListCollection({
          items: users.map((user) => ({
            label: user.fullName,
            value: user.id.toString(),
          })),
        }),
      [users],
    );

    const onSubmit = handleSubmit(async (data) => {
      if (task) {
        await onEdit?.({
          title: data.title,
          description: data.description,
          assigneeId: +data.assigneeId[0],
          status: data.status[0],
        });
      } else {
        await onCreate?.({
          title: data.title,
          description: data.description,
          assigneeId: +data.assigneeId,
          status: data.status[0],
        });
      }

      onClose();
    });

    return (
      <Dialog.Root lazyMount placement="center" open={isOpen}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Create/Edit Task</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body pb="4">
                <Stack gap="4">
                  <Field.Root invalid={!!formState.errors.title}>
                    <Field.Label>Title</Field.Label>
                    <Input
                      {...register("title", {
                        required: {
                          value: true,
                          message: "Title is required",
                        },
                      })}
                    />
                    <Field.ErrorText>{formState.errors.title?.message}</Field.ErrorText>
                  </Field.Root>

                  <Field.Root invalid={!!formState.errors.description}>
                    <Field.Label>Description</Field.Label>
                    <Textarea
                      {...register("description", {
                        maxLength: {
                          value: 1000,
                          message: "Description cannot exceed 1000 characters",
                        },
                      })}
                    />
                    <Field.ErrorText>{formState.errors.description?.message}</Field.ErrorText>
                  </Field.Root>
                  <Field.Root invalid={!!formState.errors.status}>
                    <Field.Label>Status</Field.Label>
                    <Controller
                      control={control}
                      name="status"
                      render={({ field }) => (
                        <Select.Root
                          name={field.name}
                          value={field.value}
                          onValueChange={(item) => field.onChange(item.value)}
                          onInteractOutside={() => field.onBlur()}
                          collection={statusesCollection}
                        >
                          <Select.HiddenSelect />
                          <Select.Control>
                            <Select.Trigger>
                              <Select.ValueText placeholder="Select status" />
                            </Select.Trigger>
                            <Select.IndicatorGroup>
                              <Select.Indicator />
                            </Select.IndicatorGroup>
                          </Select.Control>
                          <Select.Positioner>
                            <Select.Content>
                              {statusesCollection.items.map((item) => (
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
                    <Field.ErrorText>{formState.errors.status?.message}</Field.ErrorText>
                  </Field.Root>

                  <Field.Root invalid={!!formState.errors.assigneeId}>
                    <Field.Label>User</Field.Label>
                    <Controller
                      control={control}
                      name="assigneeId"
                      render={({ field }) => (
                        <Select.Root
                          name={field.name}
                          value={field.value}
                          onValueChange={(item) => field.onChange(item.value)}
                          onInteractOutside={() => field.onBlur()}
                          collection={usersCollection}
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
                              {usersCollection.items.map((item) => (
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
                    <Field.ErrorText>{formState.errors.assigneeId?.message}</Field.ErrorText>
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
  },
);
