import { Box, Button } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Pet } from "../../types/types";

type Props = {
  pet: Pet;
};

const PetCard = ({ pet }: Props) => {
  const navigate = useNavigate();
  return (
    <Box position="relative">
      <Button onClick={() => navigate(`/pet?id=${pet.id}`)}>See more</Button>
    </Box>
  );
};

export default PetCard;
