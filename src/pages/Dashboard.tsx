import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import AddPet from "../components/dashboard/AddPet";
import PetsList from "../components/dashboard/PetsList";
import UsersList from "../components/dashboard/UsersList";

type Props = {};

const Dashboard = (props: Props) => {
  const [addPet, setAddPet] = React.useState<boolean>(false);
  return (
    <VStack gap={3} mx="2rem">
      <Box
        w="100%"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg="brand.Cultured"
        p={2}
      >
        <Center>
          <Heading size="md" mb={3} color="brand.RocketMetallic">
            Users
          </Heading>
        </Center>
        <UsersList />
      </Box>
      <Box
        w="100%"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg="brand.Cultured"
        p={2}
      >
        <Center width="100%" position="relative">
          <Heading size="md" mb={3} color="brand.RocketMetallic">
            Pets
          </Heading>
          <Button
            size="sm"
            colorScheme="teal"
            position="absolute"
            top={0}
            right={0}
            onClick={() => setAddPet(true)}
          >
            Add pet
          </Button>
        </Center>
        <PetsList />
      </Box>
      <AddPet isOpen={addPet} onClose={() => setAddPet(false)} />
    </VStack>
  );
};

export default Dashboard;
