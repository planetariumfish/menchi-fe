import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { NewUser } from "../schemas/user.zod";

type Props = {
  onClose: () => void;
  isOpen: boolean;
};

function Signup({ onClose, isOpen }: Props) {
  const [signupInfo, setSignupInfo] = React.useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    repassword: "",
  });
  const [invalid, setInvalid] = React.useState({
    email: false,
    password: false,
  });

  const handleSignup = async () => {
    const result = NewUser.safeParse(signupInfo);
    if (!result.success) {
      // do something to handle the error
      console.log(result.error);
    } else {
      const signup = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/register`,
        result.data
      ); // => API POST call here - receive OK for "onClose"
      console.log(signup.data);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          color="brand.Bittersweet"
          sx={{
            fontFamily: "var(--title-font)",
          }}
        >
          Sign up
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack gap={2}>
            <FormControl isInvalid={invalid.email}>
              <FormLabel htmlFor="firstname">First name:</FormLabel>
              <Input
                type="text"
                id="firstname"
                name="firstname"
                onChange={(e) => {
                  setSignupInfo({ ...signupInfo, firstname: e.target.value });
                }}
                placeholder="Kazuma"
              />
            </FormControl>
            <FormControl isInvalid={invalid.email}>
              <FormLabel htmlFor="lastname">Last name:</FormLabel>
              <Input
                type="text"
                id="lastname"
                name="lastname"
                onChange={(e) => {
                  setSignupInfo({ ...signupInfo, lastname: e.target.value });
                }}
                placeholder="Kiryu"
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
            <FormControl isInvalid={invalid.password} isRequired>
              <FormLabel htmlFor="password">Re-enter password:</FormLabel>
              <Input
                type="password"
                id="repassword"
                name="repassword"
                onChange={(e) => {
                  setSignupInfo({ ...signupInfo, repassword: e.target.value });
                }}
              />
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={() => {
              handleSignup();
              // if (!invalid.email && !invalid.password) onClose();
            }}
          >
            Sign up!
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default Signup;
