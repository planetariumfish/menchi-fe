import React from "react";
import { useParams } from "react-router-dom";
import { Bookmark, Pet } from "../types/types";
import axios from "../utils/axiosClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Center,
  VStack,
  Heading,
  Image,
  Text,
  Divider,
  HStack,
  Box,
  useToast,
  SimpleGrid,
  Button,
  Wrap,
  WrapItem,
  Spacer,
} from "@chakra-ui/react";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import { ActiveUser } from "../contexts/contexts";
import LoginModal from "../components/login/LoginModal";
import PetPageTags from "../components/pets/PetPageTags";
import PetLikes from "../components/pets/PetLikes";
import capitalizeWords from "../utils/capitalizeWords";
import PetStatus from "../components/pets/PetStatus";
import useBookmarkStore from "../contexts/bookmarkStore";
import EditPet from "../components/dashboard/EditPet";

const PetPage = () => {
  const { user } = React.useContext(ActiveUser);
  const [pet, setPet] = React.useState<Pet>();
  const { id } = useParams();
  const bookmarks = useBookmarkStore((state) => state.bookmarks);
  const loadBookmarks = useBookmarkStore((state) => state.load);
  const [isBookmarked, setIsBookmarked] = React.useState<boolean>(
    id && bookmarks ? bookmarks.includes(id) : false
  );
  const [notAUserAlert, setNotAUserAlert] = React.useState<boolean>(false);
  const [editPet, setEditPet] = React.useState<boolean>(false);
  const toast = useToast();

  const { refetch } = useQuery(
    [id],
    async () => {
      const result = await axios.get(`/pets/${id}`);
      return result.data;
    },
    {
      onSuccess: (data) => {
        setPet(data);
      },
    }
  );

  const bookmark = useMutation(
    (data: Bookmark) => {
      if (!isBookmarked) return axios.post(`/pets/${id}/save`, data);
      else return axios.delete(`/pets/${id}/save`);
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
    <Center>
      {pet && (
        <VStack gap={3} width="80%" position="relative">
          <Wrap width="100%">
            {user && user.role === "ADMIN" && (
              <WrapItem>
                <Box>
                  <Button onClick={() => setEditPet(true)}>Edit Pet</Button>
                </Box>
              </WrapItem>
            )}
            <WrapItem width="100%">
              <Heading color="brand.Bittersweet" size="2xl">
                {pet.name}
              </Heading>
              <Spacer />
              <Box
                onClick={() => {
                  if (!user) {
                    setNotAUserAlert(true);
                    return;
                  } else bookmark.mutate({ userId: user?.id, petId: id! });
                }}
                className="clickable"
              >
                {isBookmarked ? (
                  <BsHeartFill size="45px" />
                ) : (
                  <BsHeart size="45px" />
                )}
              </Box>
            </WrapItem>
          </Wrap>
          <SimpleGrid columns={[1, null, 2]} spacing={["0.5rem", null, "3rem"]}>
            <Box>
              <Center>
                <Image
                  src={pet.picture}
                  alt={`${pet.name}'s profile photo`}
                  borderRadius="1rem"
                  maxHeight="60vh"
                />
              </Center>

              <VStack width="100%">
                <Divider mt="2rem" />
                <Text fontSize="2xl">
                  {pet.type} ⦁ {pet.breed} ⦁ {pet.color}
                </Text>
                <Divider />
              </VStack>
            </Box>
            <Box>
              <VStack width="100%" align="start" mt="1rem">
                <HStack width="100%" gap={3}>
                  <Text>Dietary Preferences:</Text>
                  <Text color="brand.RocketMetallic">
                    {pet.dietary ? pet.dietary.join(", ") : ""}
                  </Text>
                </HStack>
                <HStack width="100%" gap={3}>
                  <Text>Height:</Text>
                  <Text color="brand.RocketMetallic">{pet.height} cm</Text>
                </HStack>
                <HStack width="100%" gap={3}>
                  <Text>Weight:</Text>
                  <Text color="brand.RocketMetallic">{pet.weight} kg</Text>
                </HStack>
                <HStack width="100%" gap={3}>
                  <Text>Hypoallergenic?</Text>
                  {pet.hypoallergenic ? (
                    <Text color="brand.Keppel">Yes</Text>
                  ) : (
                    <Text color="brand.Bittersweet">No</Text>
                  )}
                </HStack>
                <HStack width="100%" gap={3}>
                  <Text>Search Tags:</Text>
                  {pet.tags && <PetPageTags tags={pet.tags} />}
                </HStack>
                <Divider />
                <Heading size="md" mt="1rem" color="brand.Bittersweet">
                  About {pet.name}:
                </Heading>
                <Text>{pet.bio}</Text>
                <Divider />
                <PetLikes name={pet.name} id={id} />
                <Divider />

                <Heading color="brand.Keppel">
                  {pet.status && capitalizeWords(pet.status)}
                </Heading>
                <PetStatus
                  id={id}
                  status={pet.status}
                  owner={pet.userId}
                  notAUser={setNotAUserAlert}
                  petname={pet.name}
                  refetch={refetch}
                />
              </VStack>
            </Box>
          </SimpleGrid>
        </VStack>
      )}
      <LoginModal
        isOpen={notAUserAlert}
        onClose={() => setNotAUserAlert(false)}
      />
      {editPet && (
        <EditPet
          isOpen={editPet}
          onClose={() => setEditPet(false)}
          pet={pet}
          refetch={refetch}
        />
      )}
    </Center>
  );
};

export default PetPage;
