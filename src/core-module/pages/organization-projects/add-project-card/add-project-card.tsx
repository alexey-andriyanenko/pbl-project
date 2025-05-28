import React from "react";

import { Card } from "@chakra-ui/react";
import { HiOutlinePlus } from "react-icons/hi";

import { useColorModeValue } from "src/components/ui/color-mode.tsx";

type AddProjectCardProps = {
  onClick?: () => void;
};

export const AddProjectCard: React.FC<AddProjectCardProps> = ({ onClick }) => {
  return (
    <Card.Root
      flex="1"
      width="320px"
      height="275px"
      cursor="pointer"
      _hover={{
        backgroundColor: useColorModeValue("gray.200", "gray.400"),
        _active: { backgroundColor: useColorModeValue("gray.400", "gray.800") },
      }}
      onClick={onClick}
    >
      <Card.Body display="flex" justifyContent="center" alignItems="center" gap="2">
        <HiOutlinePlus size="80px" />
      </Card.Body>
    </Card.Root>
  );
};
