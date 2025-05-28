import React from "react";

import { Flex } from "@chakra-ui/react";

import { OrganizationSidebar } from "../organization/organization-sidebar";
import { ProjectCard } from "./project-card";
import { AddProjectCard } from "./add-project-card";
import { CreateOrEditProjectDialog } from "../../components/create-or-edit-project-dialog";

const OrganizationProjects: React.FC = () => {
  const [isCreateProjectDialogOpen, setCreateProjectDialogOpen] = React.useState(false);

  const stubArray = Array.from({ length: 3 }, (_, index) => index + 1);
  return (
    <Flex flex="1" direction="row" width="100%" height="100%">
      <OrganizationSidebar />

      <Flex
        direction="row"
        alignItems="flex-start"
        alignContent="stretch"
        flexWrap="wrap"
        width="100%"
        p={4}
        gap={8}
      >
        {stubArray.map((item) => (
          <ProjectCard key={item} />
        ))}

        <AddProjectCard onClick={() => setCreateProjectDialogOpen(true)} />
      </Flex>

      <CreateOrEditProjectDialog
        isOpen={isCreateProjectDialogOpen}
        onClose={() => setCreateProjectDialogOpen(false)}
      />
    </Flex>
  );
};

export default OrganizationProjects;
