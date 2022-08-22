import React, { useEffect } from "react";
import {
  ModalFooter,
  ModalBody,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Spacer,
} from "@chakra-ui/react";
import { LoginInfo as LoginInfoSchema } from "../schemas/user.zod";
import { LoginInfo } from "../types/types";
import axios from "axios";
import FormToggle from "./FormToggle";
import { ActiveUser } from "../contexts/contexts";
import { useMutation } from "@tanstack/react-query";

type Props = {
  toggle: () => void;
  hasAccount: boolean;
  onClose: () => void;
};

const LoginForm = ({ toggle, hasAccount, onClose }: Props) => {
  const { setToken } = React.useContext(ActiveUser);

  const [loginInfo, setLoginInfo] = React.useState({
    email: "",
    password: "",
  });

  const login = useMutation(
    (data: LoginInfo) => {
      return axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, data);
    },
    {
      onSuccess: (response) => {
        if (setToken) setToken(response.data.token);
        onClose();
      },
    }
  );

  const handleLogin = async () => {
    const result = LoginInfoSchema.safeParse(loginInfo);
    if (!result.success) {
      // do something to handle the error
      console.log(result.error);
    } else {
      login.mutate(result.data);
    }
  };

  return (
    <>
      <ModalBody>
        <VStack gap={2}>
          <FormControl>
            <FormLabel htmlFor="email">Email:</FormLabel>
            <Input
              type="email"
              id="email"
              name="email"
              onChange={(e) => {
                setLoginInfo({ ...loginInfo, email: e.target.value });
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password:</FormLabel>
            <Input
              type="password"
              id="password"
              name="password"
              onChange={(e) => {
                setLoginInfo({ ...loginInfo, password: e.target.value });
              }}
            />
          </FormControl>
        </VStack>
      </ModalBody>

      <ModalFooter>
        <FormToggle toggle={toggle} hasAccount={hasAccount} />
        <Spacer />
        <Button
          onClick={async () => {
            await handleLogin();
          }}
        >
          Login
        </Button>
      </ModalFooter>
    </>
  );
};

export default LoginForm;
