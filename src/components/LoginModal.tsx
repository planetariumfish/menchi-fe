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
import React from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

type Props = {
  onClose: () => void;
  isOpen: boolean;
};

const LoginModal = ({ onClose, isOpen }: Props) => {
  const [hasAccount, setHasAccount] = React.useState<boolean>(true);

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
          {hasAccount ? "Login" : "Sign up"}
        </ModalHeader>
        <ModalCloseButton />
        {hasAccount ? (
          <LoginForm
            toggle={() => setHasAccount(!hasAccount)}
            hasAccount={hasAccount}
            onClose={onClose}
          />
        ) : (
          <SignupForm
            toggle={() => setHasAccount(!hasAccount)}
            hasAccount={hasAccount}
            onClose={onClose}
          />
        )}
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
