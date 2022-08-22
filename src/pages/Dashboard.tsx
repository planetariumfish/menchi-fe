import { Box, Center, Grid, Heading, Text } from "@chakra-ui/react";
import React from "react";
import UsersList from "../components/dashboard/UsersList";

type Props = {};

const Dashboard = (props: Props) => {
  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={3} mx="2rem">
      <Box
        w="100%"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg="brand.Cultured"
        p={2}
      >
        <Center>
          <Heading
            size="md"
            sx={{
              fontFamily: "var(--title-font)",
            }}
            mb={3}
            color="brand.RocketMetallic"
          >
            Users
          </Heading>
        </Center>
        <Text mb={1}>Users list:</Text>
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
          <Heading
            size="md"
            sx={{
              fontFamily: "var(--title-font)",
            }}
            mb={3}
            color="brand.RocketMetallic"
          >
            Pets
          </Heading>
        </Center>
      </Box>
    </Grid>
  );
};

export default Dashboard;
