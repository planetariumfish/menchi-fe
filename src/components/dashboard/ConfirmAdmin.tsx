import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Heading,
  ModalBody,
  ModalFooter,
  Button,
  useToast,
} from "@chakra-ui/react";
import { QueryObserverResult, useMutation } from "@tanstack/react-query";
import axios from "../../utils/axiosClient";
import React from "react";
import { ModalProps } from "../../types/types";
import { Role } from "../../types/enums";

type ConfirmProps = ModalProps & {
  userId: string;
  refetch: () => Promise<QueryObserverResult>;
};

const ConfirmAdmin = ({ isOpen, onClose, userId, refetch }: ConfirmProps) => {
  const toast = useToast();

  const updateUser = useMutation(
    (data: any /* for now*/) => {
      return axios.put(`/users/${userId}`, data);
    },
    {
      onSuccess: (response) => {
        toast({
          description: response.data.message,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        refetch();
        onClose();
      },
    }
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading size="md" color="brand.Bittersweet">
            Set user as admin?
          </Heading>
        </ModalHeader>
        <ModalBody>
          This action is not reversible without contacting the database
          maintainer.
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            colorScheme="yellow"
            ms={3}
            onClick={() => updateUser.mutate({ role: Role.ADMIN })}
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmAdmin;
