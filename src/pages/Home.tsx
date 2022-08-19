import React from "react";
import { Box, Button, Center, Heading, Text, VStack } from "@chakra-ui/react";
import bg from "../assets/bg.jpg";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ActiveUser } from "../contexts/contexts";

const Home = () => {
  const navigate = useNavigate();
  const { userId } = React.useContext(ActiveUser);

  const user = useQuery(["userInfo"], async () => {
    const token = localStorage.getItem("token");
    const result = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/users/${userId}`,
      {
        headers: {
          "x-access-token": token || "",
        },
      }
    );
    return result.data;
  });

  return (
    <Center>
      <VStack width="80%" gap={3}>
        {userId && user.isSuccess && (
          <Heading
            size="xl"
            sx={{
              fontFamily: "var(--title-font)",
            }}
          >
            Welcome,{" "}
            <Text color="brand.Bittersweet" display="inline-flex">
              {user.data.firstname} {user.data.lastname || ""}
            </Text>
          </Heading>
        )}
        <Box
          sx={{
            background: `center/cover url(${bg}) no-repeat`,
            position: "relative",
            borderRadius: "1rem",
            width: "100%",
            height: "60vh",
          }}
        >
          <Heading
            color="brand.OrangeYellow"
            className="menchi-title"
            size="4xl"
            sx={{
              fontFamily: "var(--title-font)",
              position: "absolute",
              bottom: "2rem",
              right: "2rem",
            }}
          >
            Menchi
          </Heading>
        </Box>
        <Box>
          <Text>
            Welcome to Menchi! The service that lets you find and adopt{" "}
            <Text as="s">an emergency food source</Text> a companion for life!
          </Text>
        </Box>
        <Button onClick={() => navigate("/search")}>Search for a pet</Button>
      </VStack>
    </Center>
  );
};

export default Home;
