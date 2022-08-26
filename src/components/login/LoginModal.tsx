import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
} from "@chakra-ui/react";
import React from "react";
import { ModalProps } from "../../types/types";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const LoginModal = ({ onClose, isOpen }: ModalProps) => {
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
