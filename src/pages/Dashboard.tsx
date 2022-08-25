import { Box, Center, Grid, Heading, Text, VStack } from "@chakra-ui/react";
import React from "react";
import UsersList from "../components/dashboard/UsersList";

type Props = {};

const Dashboard = (props: Props) => {
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
        <Center>
          <Heading size="md" mb={3} color="brand.RocketMetallic">
            Pets
          </Heading>
        </Center>
      </Box>
    </VStack>
  );
};

export default Dashboard;
