import React from "react";

import { Box, Stack, Heading, List, LinkBox, Link, LinkOverlay } from "@chakra-ui/react";

export const OrganizationSidebar: React.FC = () => {
  return (
    <Box width="320px" minWidth="320px" padding="40px 10px 40px 40px" borderRightWidth="1px">
      <Stack>
        <Heading> {"{Organization Name}"} </Heading>

        <List.Root>
          <List.Item>
            <LinkBox>
              <LinkOverlay asChild href="#">
                <Link>Organization settings</Link>
              </LinkOverlay>
            </LinkBox>
          </List.Item>
          <List.Item>
            <LinkBox>
              <LinkOverlay asChild href="#">
                <Link>Organization projects</Link>
              </LinkOverlay>
            </LinkBox>
          </List.Item>
          <List.Item>
            <LinkBox>
              <LinkOverlay asChild href="#">
                <Link>Organization users</Link>
              </LinkOverlay>
            </LinkBox>
          </List.Item>
        </List.Root>
      </Stack>
    </Box>
  );
};
