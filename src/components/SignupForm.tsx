import {
  ModalBody,
  VStack,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  Spacer,
  FormErrorMessage,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { ActiveUser } from "../contexts/contexts";
import { NewUser as NewUserSchema } from "../schemas/user.zod";
import { NewUser } from "../types/types";
import FormToggle from "./FormToggle";

type Props = {
  toggle: () => void;
  hasAccount: boolean;
  onClose: () => void;
};

function SignupForm({ toggle, hasAccount, onClose }: Props) {
  const [canClose, setCanClose] = React.useState<boolean>(false);
  const { setToken } = React.useContext(ActiveUser);

  const [signupInfo, setSignupInfo] = React.useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    repassword: "",
  });
  const [invalid, setInvalid] = React.useState({
    firstname: false,
    email: false,
    password: false,
    repassword: false,
  });

  useEffect(() => {
    if (signupInfo.password !== signupInfo.repassword)
      setInvalid({ ...invalid, repassword: true });
    else setInvalid({ ...invalid, repassword: false });
  }, [signupInfo.repassword]);

  const signup = useMutation(
    (data: NewUser) => {
      return axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        data
      );
    },
    {
      onSuccess: (response) => {
        setCanClose(true);
        setToken!(response.data.token);
      },
    }
  );

  const handleSignup = async () => {
    const result = NewUserSchema.safeParse(signupInfo);
    if (!result.success) {
      // do something to handle the error
      console.log(result.error);
      return false;
    } else {
      signup.mutate(result.data);
    }
  };

  const checkInput = () => {
    if (!signupInfo.email) setInvalid({ ...invalid, email: true });
    if (!signupInfo.firstname) setInvalid({ ...invalid, firstname: true });
    if (!signupInfo.password) setInvalid({ ...invalid, password: true });
    if (!signupInfo.repassword) setInvalid({ ...invalid, repassword: true });
    if (
      invalid.email &&
      invalid.firstname &&
      invalid.password &&
      invalid.repassword
    )
      return false;
    return true;
  };

  return (
    <>
      <ModalBody>
        <VStack gap={2}>
          <FormControl isInvalid={invalid.firstname} isRequired>
            <FormLabel htmlFor="firstname">First name:</FormLabel>
            <Input
              type="text"
              id="firstname"
              name="firstname"
              onChange={(e) => {
                setSignupInfo({ ...signupInfo, firstname: e.target.value });
              }}
              placeholder="e.g. Kazuma"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="lastname">Last name:</FormLabel>
            <Input
              type="text"
              id="lastname"
              name="lastname"
              onChange={(e) => {
                setSignupInfo({ ...signupInfo, lastname: e.target.value });
              }}
              placeholder="e.g. Kiryu"
            />
          </FormControl>
          <FormControl isInvalid={invalid.email} isRequired>
            <FormLabel htmlFor="email">Email:</FormLabel>
            <Input
              type="email"
              id="email"
              name="email"
              onChange={(e) => {
                setSignupInfo({ ...signupInfo, email: e.target.value });
              }}
              placeholder="e.g. dojimadragon@kamurocho.jp"
            />
          </FormControl>
          <FormControl isInvalid={invalid.password} isRequired>
            <FormLabel htmlFor="password">Password:</FormLabel>
            <Input
              type="password"
              id="password"
              name="password"
              onChange={(e) => {
                setSignupInfo({ ...signupInfo, password: e.target.value });
              }}
            />
          </FormControl>
          <FormControl isInvalid={invalid.repassword} isRequired>
            <FormLabel htmlFor="password">Re-enter password:</FormLabel>
            <Input
              type="password"
              id="repassword"
              name="repassword"
              onChange={(e) => {
                setSignupInfo({ ...signupInfo, repassword: e.target.value });
              }}
            />
            {invalid.repassword && (
              <FormErrorMessage>Passwords must match</FormErrorMessage>
            )}
          </FormControl>
        </VStack>
      </ModalBody>

      <ModalFooter>
        <FormToggle toggle={toggle} hasAccount={hasAccount} />
        <Spacer />
        <Button
          onClick={async () => {
            if (!checkInput()) return;
            handleSignup();
            if (canClose) onClose();
            // if (!invalid.email && !invalid.password) onClose();
          }}
        >
          Sign up!
        </Button>
      </ModalFooter>
    </>
  );
}

export default SignupForm;
