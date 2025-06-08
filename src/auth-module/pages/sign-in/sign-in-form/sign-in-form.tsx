import React from "react";

import { Stack, Field, Input, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "src/auth-module/store";
import { CoreRoutes } from "src/core-module";

import { SignInFormValues } from "./sign-in-form.types.ts";

export const SignInForm: React.FC = observer(() => {
  const authStore = useAuthStore();
  const navigate = useNavigate();
  const { register, formState, setError, handleSubmit } = useForm<SignInFormValues>();

  const onSubmit = async (data: SignInFormValues) => {
    try {
      await authStore.signIn({
        username: data.username,
        password: data.password,
      });

      navigate(CoreRoutes.organization.home);
    } catch (error) {
      setError("username", { type: "manual", message: "Invalid username or password" });
      setError("password", { type: "manual", message: "Invalid username or password" });

      console.error("Sign-in failed:", error);
      // Handle error appropriately, e.g., show a notification or message
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack width="100%" gap="4">
        <Field.Root invalid={!!formState.errors.username}>
          <Field.Label>Username</Field.Label>
          <Input
            {...register("username", {
              required: {
                value: true,
                message: "Username is required",
              },
            })}
          />
          <Field.ErrorText>{formState.errors.username?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!formState.errors.password}>
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
          <Field.ErrorText>{formState.errors.password?.message}</Field.ErrorText>
        </Field.Root>

        <Button loading={formState.isSubmitting} type="submit">
          Submit
        </Button>
      </Stack>
    </form>
  );
});
