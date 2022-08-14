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

type Props = {
  onClose: () => void;
  isOpen: boolean;
};

const Login = ({ onClose, isOpen }: Props) => {
  const [loginInfo, setLoginInfo] = React.useState({
    email: "",
    password: "",
  });
  const [invalid, setInvalid] = React.useState({
    email: false,
    password: false,
  });

  const handleLogin = () => {
    if (!loginInfo.email) setInvalid({ ...invalid, email: true });
    if (!loginInfo.password) setInvalid({ ...invalid, password: true });
    // => API POST call here - receive OK for "onClose"
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
            <FormControl isInvalid={invalid.email}>
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
            <FormControl isInvalid={invalid.password}>
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
