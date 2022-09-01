import {
  AspectRatio,
  Badge,
  Box,
  Button,
  Center,
  Heading,
  Image,
  Text,
  useToast,
  VisuallyHidden,
  VStack,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import axios from "../../utils/axiosClient";
import React from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import useBookmarkStore from "../../contexts/bookmarkStore";
import { ActiveUser } from "../../contexts/contexts";
import { Bookmark, Pet } from "../../types/types";

type Props = {
  pet: Pet;
};

const PetCard = ({ pet }: Props) => {
  const { user } = React.useContext(ActiveUser);
  const bookmarks = useBookmarkStore((state) => state.bookmarks);
  const loadBookmarks = useBookmarkStore((state) => state.load);
  const [isBookmarked, setIsBookmarked] = React.useState<boolean>(
    pet.id && bookmarks ? bookmarks.includes(pet.id) : false
  );
  const navigate = useNavigate();
  const toast = useToast();

  const bookmark = useMutation(
    (data: Bookmark) => {
      // this is only accessible when user !== null
      if (!isBookmarked) return axios.post(`/pets/${pet.id}/save`, data);
      else return axios.delete(`/pets/${pet.id}/save`);
    },
    {
      onSuccess: (response) => {
        setIsBookmarked(!isBookmarked);
        loadBookmarks(user!.id);
        toast({
          description: response.data.message,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      },
    }
  );

  return (
    <Box
      w="xs"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      position="relative"
    >
      {user && (
        <Box
          position="absolute"
          top="0.5rem"
          right="0.5rem"
          borderRadius="full"
          bgColor="brand.Cultured"
          onClick={() => {
            bookmark.mutate({ userId: user?.id, petId: pet.id });
          }}
          className="clickable"
          p={2}
          color="brand.Bittersweet"
        >
          {isBookmarked ? <BsHeartFill /> : <BsHeart />}
        </Box>
      )}
      <Box
        height="12rem"
        overflow="hidden"
        bg="brand.Cultured"
        bgImage={pet.picture}
        bgPos="center"
        bgSize="cover"
        bgRepeat="no-repeat"
      >
        <VisuallyHidden>{`${pet.name} the ${pet.type}`}</VisuallyHidden>
      </Box>
      <Box p={3}>
        <Center>
          <VStack width="100%">
            <Heading
              size="md"
              textAlign="center"
              color="brand.Keppel"
              noOfLines={1}
            >
              {pet.name}
            </Heading>
            <Text>
              {pet.type} ⦁ {pet.breed} ⦁ {pet.color}
            </Text>
            <Badge
              colorScheme={
                pet.status === "AVAILABLE"
                  ? "green"
                  : pet.status === "FOSTERED"
                  ? "yellow"
                  : "red"
              }
            >
              {pet.status}
            </Badge>
          </VStack>
        </Center>
      </Box>
      <Box
        width="100%"
        _hover={{
          backgroundColor: "var(--chakra-colors-brand-OrangeYellow)",
          cursor: "pointer",
        }}
        onClick={() => navigate(`/pet/${pet.id}`)}
        borderTopWidth="1px"
        display="flex"
        justifyContent="center"
        p={2}
      >
        <Text as="b" fontSize="xs">
          MORE
        </Text>
      </Box>
    </Box>
  );
};

export default PetCard;
