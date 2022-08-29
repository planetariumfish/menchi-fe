import { Button, ButtonGroup, useToast, Text, HStack } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { ActiveUser } from "../../contexts/contexts";
import { Status } from "../../types/enums";
import axios from "../../utils/axiosClient";

type Props = {
  id: string | undefined;
  status: Status | string;
  notAUser: (toggle: boolean) => void;
};

// TODO: Return a pet functionality
const PetStatus = ({ id, status, notAUser }: Props) => {
  const { user } = React.useContext(ActiveUser);
  const toast = useToast();
  const { mutate } = useMutation(
    (data: { status: Status }) => {
      return axios.post(`/pets/${id}/adopt`, data);
    },
    {
      onSuccess: (response) => {
        toast({
          description: response.data.message,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      },
    }
  );
  return user ? (
    <ButtonGroup>
      <Button
        isDisabled={status !== "AVAILABLE"}
        onClick={() => mutate({ status: Status.FOSTERED })}
      >
        Foster
      </Button>
      <Button
        isDisabled={status === "ADOPTED"}
        onClick={() => mutate({ status: Status.ADOPTED })}
      >
        Adopt
      </Button>
    </ButtonGroup>
  ) : (
    <HStack>
      <Text
        color="brand.Bittersweet"
        onClick={() => notAUser(true)}
        className="clickable"
        _hover={{ color: "brand.OrangeYellow" }}
        as="b"
      >
        Login
      </Text>
      <Text>to adopt or foster pets</Text>
    </HStack>
  );
};

export default PetStatus;
