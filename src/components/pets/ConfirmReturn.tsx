import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
  Text,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import axios from "../../utils/axiosClient";
import React from "react";
import { ModalProps } from "../../types/types";
import { ActiveUser } from "../../contexts/contexts";

type ConfirmProps = ModalProps & {
  petId: string | undefined;
  refetch: () => void;
};

const ConfirmReturn = ({ onClose, isOpen, petId, refetch }: ConfirmProps) => {
  const { user, setUser } = React.useContext(ActiveUser);
  const toast = useToast();

  const returnPet = useMutation(
    (data: Object) => {
      return axios.put(`/pets/${petId}/return`, data);
    },
    {
      onSuccess: (response) => {
        toast({
          description: response.data.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        if (setUser && user) setUser({ ...user, returned: new Date() });
        onClose();
        refetch();
      },
    }
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading size="md" color="brand.Bittersweet">
            Return the pet?
          </Heading>
        </ModalHeader>
        <ModalBody>
          If you had previously{" "}
          <Text color="brand.Bittersweet" as="span">
            adopted
          </Text>{" "}
          (not only fostered) the pet, you will{" "}
          <Text color="brand.Bittersweet" as="b">
            not
          </Text>{" "}
          be able to adopt a pet again before contacting an admin.
          <br />
          Returning a{" "}
          <Text color="brand.Bittersweet" as="span">
            fostered
          </Text>{" "}
          pet will not bar you from adopting or fostering again.
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            colorScheme="red"
            ms={3}
            onClick={() => returnPet.mutate({ petId })}
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmReturn;
