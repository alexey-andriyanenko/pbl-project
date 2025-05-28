import React from "react";

import { Card, Avatar, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { ProjectRoutes } from "src/core-module/routes.ts";
import { pickColor } from "src/shared-module/utils";

export const ProjectCard: React.FC = () => {
  const navigate = useNavigate();

  const handleVisit = () => navigate(ProjectRoutes.home);
  const handleSettings = () => navigate(ProjectRoutes.settings);

  return (
    <Card.Root width="320px" height="275px" flex="1">
      <Card.Body gap="2">
        <Avatar.Root size="lg" colorPalette={pickColor("Project Name")}>
          <Avatar.Fallback name="Nue Camp" />
        </Avatar.Root>
        <Card.Title mt="2">Project Name</Card.Title>
        <Card.Description>
          Project description goes here. This is a brief overview of the project, its goals, and
          what it aims to achieve.
        </Card.Description>
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
        <Button variant="outline" onClick={handleVisit}>
          Visit
        </Button>
        <Button onClick={handleSettings}>Settings</Button>
      </Card.Footer>
    </Card.Root>
  );
};
