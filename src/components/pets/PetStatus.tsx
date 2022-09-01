import { Button, ButtonGroup, useToast, Text, HStack } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { ActiveUser } from "../../contexts/contexts";
import { Status } from "../../types/enums";
import axios from "../../utils/axiosClient";
import ConfirmGetPet from "./ConfirmGetPet";
import ConfirmReturn from "./ConfirmReturn";

type Props = {
  id: string | undefined;
  status: Status | string;
  owner: string | undefined;
  petname: string | undefined;
  notAUser: (toggle: boolean) => void;
  refetch: () => void;
};

const PetStatus = ({
  id,
  status,
  notAUser,
  owner,
  petname,
  refetch,
}: Props) => {
  const { user } = React.useContext(ActiveUser);
  const [returning, setReturning] = React.useState(false);
  const [gettingPet, setGettingPet] = React.useState(false);
  const [actionType, setActionType] = React.useState<Status>();
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
        setGettingPet(false);
        refetch();
      },
    }
  );
  return user ? (
    <>
      <ButtonGroup>
        <Button
          isDisabled={status !== "AVAILABLE"}
          onClick={() => {
            setGettingPet(true);
            setActionType(Status.FOSTERED);
          }}
        >
          Foster
        </Button>
        <Button
          isDisabled={status === "ADOPTED" || !!user.returned}
          onClick={() => {
            setGettingPet(true);
            setActionType(Status.ADOPTED);
          }}
        >
          Adopt
        </Button>
        {user.id === owner && (
          <Button onClick={() => setReturning(true)}>Return pet</Button>
        )}
      </ButtonGroup>
      {returning && (
        <ConfirmReturn
          petId={id}
          onClose={() => setReturning(false)}
          isOpen={returning}
          refetch={refetch}
        />
      )}
      {gettingPet && (
        <ConfirmGetPet
          onClose={() => setGettingPet(false)}
          isOpen={gettingPet}
          onMutate={mutate}
          petname={petname}
          status={actionType}
        />
      )}
    </>
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
