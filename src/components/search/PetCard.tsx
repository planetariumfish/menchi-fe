import { Box, Button, Image } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Pet } from "../../types/types";

type Props = {
  pet: Pet;
};

const PetCard = ({ pet }: Props) => {
  const navigate = useNavigate();
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={pet.picture} alt={`${pet.name} the ${pet.type}`} />
      <Button onClick={() => navigate(`/pet/${pet.id}`)}>See more</Button>
    </Box>
  );
};

export default PetCard;
