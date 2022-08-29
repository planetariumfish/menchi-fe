import {
  AspectRatio,
  Box,
  Button,
  Center,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { ActiveUser } from "../../contexts/contexts";
import { Pet } from "../../types/types";

type Props = {
  pet: Pet;
};

const PetCard = ({ pet }: Props) => {
  const { userBookmarks } = React.useContext(ActiveUser);
  const [isBookmarked, setIsBookmarked] = React.useState<boolean>(
    pet.id && userBookmarks ? userBookmarks.includes(pet.id) : false
  );
  const navigate = useNavigate();
  return (
    <Box
      maxW="xs"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      position="relative"
    >
      <Box
        position="absolute"
        top="0.5rem"
        right="0.5rem"
        borderRadius="full"
        bgColor="brand.Cultured"
        onClick={() => {
          // if (!user) {
          //   setNotAUserAlert(true);
          //   return;
          // } else bookmark.mutate({ userId: user?.id, petId: id! });
        }}
        className="clickable"
        p={2}
        color="brand.Bittersweet"
      >
        {isBookmarked ? <BsHeartFill /> : <BsHeart />}
      </Box>
      <Image src={pet.picture} alt={`${pet.name} the ${pet.type}`} />
      <Box p={3}>
        <Center>
          <VStack width="100%">
            <Heading size="md" textAlign="center" color="brand.Keppel">
              {pet.name}
            </Heading>
            <Text>
              {pet.type} ⦁ {pet.breed} ⦁ {pet.color}
            </Text>
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
