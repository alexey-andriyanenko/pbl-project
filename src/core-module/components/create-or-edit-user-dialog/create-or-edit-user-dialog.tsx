import React, { useRef } from "react";

import { Dialog, Button, Portal, Stack, Field, Input } from "@chakra-ui/react";

type CreateOrEditUserDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const CreateOrEditUserDialog: React.FC<CreateOrEditUserDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <Dialog.Root lazyMount open={isOpen} placement="center" initialFocusEl={() => ref.current}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Create/Edit User</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb="4">
              <Stack gap="4">
                <Field.Root>
                  <Field.Label>First Name</Field.Label>
                  <Input ref={ref} placeholder="Enter first name..." />
                </Field.Root>
                <Field.Root>
                  <Field.Label>Last Name</Field.Label>
                  <Input placeholder="Enter last name..." />
                </Field.Root>
              </Stack>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
              </Dialog.ActionTrigger>
              <Button onClick={onClose}>Save</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
