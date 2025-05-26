import React from "react";

import { Stack, Field, Input, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { SignInFormValues } from "./sign-in-form.types.ts";

export const SignInForm: React.FC = () => {
  const { register, handleSubmit } = useForm<SignInFormValues>();

  const onSubmit = (data: SignInFormValues) => {
    console.log("Form submitted with data:", data);
    // Handle form submission logic here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack width="100%" gap="4">
        <Field.Root>
          <Field.Label>Email</Field.Label>
          <Input
            {...register("email", {
              required: {
                value: true,
                message: "Email is required",
              },
            })}
          />
          <Field.ErrorText></Field.ErrorText>
        </Field.Root>

        <Field.Root>
          <Field.Label>Password</Field.Label>
          <Input
            type="password"
            {...register("password", {
              required: {
                value: true,
                message: "Password is required",
              },
            })}
          />
          <Field.ErrorText></Field.ErrorText>
        </Field.Root>

        <Button type="submit">Submit</Button>
      </Stack>
    </form>
  );
};
