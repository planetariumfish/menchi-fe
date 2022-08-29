import { Center, VStack, Heading, Text, Button } from "@chakra-ui/react";
import React from "react";
import PetList from "../components/search/PetList";
import axios from "../utils/axiosClient";
import useBookmarkStore from "../contexts/bookmarkStore";
import { useQuery } from "@tanstack/react-query";
import { Pet } from "../types/types";
import { useNavigate } from "react-router-dom";

type Props = {};

const Favorites = (props: Props) => {
  const bookmarks = useBookmarkStore((state) => state.bookmarks);
  const navigate = useNavigate();
  const [pets, setPets] = React.useState<Pet[]>([]);

  const getPets = useQuery(
    ["getBookmarkedPets"],
    async () => {
      const result = await axios.post("/pets", bookmarks);
      return result.data;
    },
    {
      onSuccess: (data) => {
        setPets(data);
      },
      enabled: bookmarks.length > 0,
    }
  );

  return (
    <Center>
      <VStack gap={5} width="80%">
        <Heading color="brand.Bittersweet">Favorite pets</Heading>
        {pets && pets.length > 0 ? (
          <PetList pets={pets} />
        ) : (
          <VStack gap={3}>
            <Text>You haven't favorited any pets yet...</Text>
            <Button onClick={() => navigate("/search")}>
              Search for a pet?
            </Button>
          </VStack>
        )}
      </VStack>
    </Center>
  );
};

export default Favorites;
