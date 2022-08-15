import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  VStack,
} from "@chakra-ui/react";
import { LoginInfo } from "../schemas/user.zod";
import axios from "axios";

type Props = {
  onClose: () => void;
  isOpen: boolean;
};

const Login = ({ onClose, isOpen }: Props) => {
  const [loginInfo, setLoginInfo] = React.useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    // parse with Zod
    const result = LoginInfo.safeParse(loginInfo);
    if (!result.success) {
      // do something to handle the error
      console.log(result.error);
    } else {
      const login = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/login`,
        result.data
      ); // => API POST call here - receive OK for "onClose"
      console.log(login.data);
      // Get token from here
      // Save token to localStorage
      // get app to refresh the context?
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
          Login
        </ModalHeader>
        <ModalCloseButton />
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
          <Button
            onClick={() => {
              handleLogin();
              // if (!invalid.email && !invalid.password) onClose();
            }}
          >
            Login
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Login;
