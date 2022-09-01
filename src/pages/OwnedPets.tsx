import { Center, VStack, Heading, Button, Text } from "@chakra-ui/react";
import axios from "../utils/axiosClient";
import React from "react";
import PetList from "../components/search/PetList";
import { useQuery } from "@tanstack/react-query";
import { Pet } from "../types/types";
import { ActiveUser } from "../contexts/contexts";
import { useNavigate } from "react-router-dom";

const OwnedPets = () => {
  const { user } = React.useContext(ActiveUser);
  const navigate = useNavigate();
  const [pets, setPets] = React.useState<Pet[]>([]);

  const getPets = useQuery(
    ["getOwnedPets"],
    async () => {
      // query doesn't run without a non-null user object in context
      const result = await axios.get(`/pets/user/${user!.id}`);
      return result.data;
    },
    {
      onSuccess: (data) => {
        setPets(data.pets);
      },
      enabled: !!user,
    }
  );

  return (
    <Center>
      <VStack gap={5} width="80%">
        <Heading color="brand.Bittersweet">My pets</Heading>
        {pets && pets.length > 0 ? (
          <PetList pets={pets} />
        ) : (
          <VStack gap={3}>
            <Text>You haven't adopted or fostered any pets yet...</Text>
            <Button onClick={() => navigate("/search")}>
              Search for a pet?
            </Button>
          </VStack>
        )}
      </VStack>
    </Center>
  );
};

export default OwnedPets;
