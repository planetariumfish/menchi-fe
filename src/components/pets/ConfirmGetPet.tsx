import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Heading,
  ModalBody,
  ModalFooter,
  Button,
  Text,
} from "@chakra-ui/react";
import { UseMutateFunction } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import React from "react";
import { Status } from "../../types/enums";
import { ModalProps } from "../../types/types";

type ConfirmProps = ModalProps & {
  status: Status | undefined;
  onMutate: UseMutateFunction<
    AxiosResponse<any, any>,
    unknown,
    { status: Status },
    unknown
  >;
  petname: string | undefined;
};

const ConfirmGetPet = ({
  isOpen,
  onClose,
  status,
  onMutate,
  petname,
}: ConfirmProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading size="md" color="brand.Bittersweet">
            {status === Status.FOSTERED ? "Foster " : "Adopt "} {petname} ?
          </Heading>
        </ModalHeader>
        <ModalBody>
          <Text>
            {status === Status.FOSTERED ? "Fostering" : "Adopting"} a pet is a
            lot of responsibility!
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            colorScheme="yellow"
            ms={3}
            onClick={() => status && onMutate({ status })}
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmGetPet;
