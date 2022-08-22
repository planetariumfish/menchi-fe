import {
  Avatar,
  Center,
  Text,
  Heading,
  HStack,
  VStack,
  Button,
  Spacer,
  Box,
} from "@chakra-ui/react";
import React from "react";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { ActiveUser } from "../contexts/contexts";

type Props = {};

const Profile = (props: Props) => {
  const { user } = React.useContext(ActiveUser);
  const navigate = useNavigate();

  const handleAvatarEdit = () => {
    // open modal with file picker to upload image
  };

  return (
    <Center>
      <VStack gap={3} width="80%">
        <Heading
          color="brand.Bittersweet"
          sx={{
            fontFamily: "var(--title-font)",
          }}
        >
          Profile
        </Heading>
        {user && (
          <HStack gap={5} width="60vw" align="start">
            <Avatar
              size="2xl"
              bg="brand.RocketMetallic"
              src={user.photo || ""}
              onClick={handleAvatarEdit}
              className="clickable"
            />
            <VStack align="flex-start" width="100%">
              <HStack gap={2}>
                <Text as="b">Name:</Text>
                <Text display="inline">
                  {user.firstname} {user.lastname || ""}
                </Text>
              </HStack>
              <HStack gap={2}>
                <Text as="b">Email:</Text>{" "}
                <Text display="inline">{user.email}</Text>
              </HStack>
              <HStack gap={2}>
                <Text as="b">Phone:</Text>{" "}
                {user.phone || <Text as="i">none</Text>}
              </HStack>
              <HStack gap={2} align="start">
                <Text as="b">Bio:</Text>
                {<Text>{user.bio}</Text> || <Text as="i">none</Text>}
              </HStack>
              <HStack gap={2}>
                <Text as="b">Can adopt a pet?</Text>
                {user.returned ? (
                  <HStack>
                    <IoClose aria-label="No" />
                    <Button size="xs">request reset</Button>
                  </HStack>
                ) : (
                  <FaCheck aria-label="Yes!" />
                )}
              </HStack>
              <Box height="3rem"></Box>
              <HStack justify="end" width="100%">
                <Spacer />
                <Button
                  align-self="flex-end"
                  onClick={() => navigate("/profile/edit")}
                >
                  Edit Profile
                </Button>
              </HStack>
            </VStack>
          </HStack>
        )}
      </VStack>
    </Center>
  );
};

export default Profile;
