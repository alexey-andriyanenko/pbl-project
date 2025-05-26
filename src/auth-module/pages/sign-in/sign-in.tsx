import React from "react";
import { Flex, Stack, Heading, Text, Link } from "@chakra-ui/react";

import { AuthRoutes } from "src/auth-module";

import { SignInForm } from "./sign-in-form";

const SignIn: React.FC = () => {
  return (
    <Flex
      direction="column"
      justify="start"
      align="center"
      height="100vh"
      padding="80px 40px 40px 40px"
    >
      <Stack width="450px" gap="10">
        <Flex justify="center">
          <Heading fontSize="4xl">Sign in to your account</Heading>
        </Flex>

        <SignInForm />

        <Flex justify="center">
          <Text>
            Don't have an account? <Link href={AuthRoutes.signUp}>Sign up</Link>
          </Text>
        </Flex>
      </Stack>
    </Flex>
  );
};

export default SignIn;
