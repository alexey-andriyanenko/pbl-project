import React from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { Flex, Button, Stack, Text } from "@chakra-ui/react";

import { useOrganizationStore } from "../../store";

const InvalidProject: React.FC = observer(() => {
  const organizationStore = useOrganizationStore();
  const navigate = useNavigate();

  const handleGoToProjects = () => {
    navigate(`/organization/${organizationStore.currentOrganization!.name}/projects`);
  };

  return (
    <Flex flex="1" width="100%" justify="center" pt={10}>
      <Stack>
        <Text> Project not found. </Text>
        <Button onClick={handleGoToProjects}>Go to Projects</Button>
      </Stack>
    </Flex>
  );
});

export default InvalidProject;
