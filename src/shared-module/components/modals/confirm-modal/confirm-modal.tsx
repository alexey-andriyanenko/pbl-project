import React from "react";

import { Dialog, Button, Portal, Text } from "@chakra-ui/react";

import { ModalProps } from "src/modals-module";

export interface IConfirmModalProps extends ModalProps {
  title: string;
  onConfirm: () => void | Promise<unknown>;

  description?: string;
}

export const ConfirmModal: React.FC<IConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const handleConfirm = async () => {
    setIsLoading(true);

    try {
      await onConfirm();
      setIsLoading(false);
    } finally {
      onClose();
    }
  };

  return (
    <Dialog.Root lazyMount placement="center" open={isOpen}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header justifyContent="center">
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            {description ? (
              <Dialog.Body display="flex" justifyContent="center">
                <Text>{description}</Text>
              </Dialog.Body>
            ) : null}
            <Dialog.Footer>
              <Button onClick={onClose}>Cancel</Button>
              <Button variant="outline" loading={isLoading} onClick={handleConfirm}>
                Confirm
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
