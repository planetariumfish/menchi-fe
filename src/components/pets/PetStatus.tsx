import { Button, ButtonGroup } from "@chakra-ui/react";
import React from "react";
import { Status } from "../../types/enums";

type Props = {
  id: string | undefined;
  status: Status | string;
};

// TODO: Return a pet functionality
const PetStatus = ({ id, status }: Props) => {
  return (
    <ButtonGroup>
      <Button isDisabled={status !== "AVAILABLE"}>Foster</Button>
      <Button isDisabled={status === "ADOPTED"}>Adopt</Button>
    </ButtonGroup>
  );
};

export default PetStatus;
