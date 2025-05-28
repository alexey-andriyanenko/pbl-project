import React, { useRef } from "react";

import { Dialog, Button, Portal, Stack, Field, Input } from "@chakra-ui/react";

type CreateOrEditProjectDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const CreateOrEditProjectDialog: React.FC<CreateOrEditProjectDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <Dialog.Root lazyMount placement="center" open={isOpen} initialFocusEl={() => ref.current}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Create/Edit Project</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb="4">
              <Stack gap="4">
                <Field.Root>
                  <Field.Label>Project Name</Field.Label>
                  <Input ref={ref} placeholder="Enter project name..." />
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
