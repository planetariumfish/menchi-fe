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
  SimpleGrid,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import UploadAvatar from "../components/profile/UploadAvatar";
import { ActiveUser } from "../contexts/contexts";

const Profile = () => {
  const { user } = React.useContext(ActiveUser);
  const navigate = useNavigate();
  const [uploadAvatar, setUploadAvatar] = React.useState(false);

  const handleAvatarEdit = () => {
    setUploadAvatar(true);
  };

  return (
    <Center>
      <VStack gap={3} width="80%">
        <Heading color="brand.Bittersweet">Profile</Heading>
        {user && (
          <SimpleGrid
            columns={[1, null, 2]}
            spacing={["2rem", null, "1rem"]}
            width={["90%", null, "60%"]}
          >
            <Flex justify="center">
              <Avatar
                size="2xl"
                bg="brand.RocketMetallic"
                src={user.photo || ""}
                onClick={() => {
                  handleAvatarEdit();
                }}
                className="clickable"
              />
            </Flex>
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
                <Text as="b">Phone:</Text>
                <Text>{user.phone || <Text as="i">none</Text>}</Text>
              </HStack>
              <HStack gap={2} align="start">
                <Text as="b">Bio:</Text>
                <Text>{user.bio || <Text as="i">none</Text>}</Text>
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
          </SimpleGrid>
        )}
      </VStack>
      {uploadAvatar && (
        <UploadAvatar
          isOpen={uploadAvatar}
          onClose={() => setUploadAvatar(false)}
        />
      )}
    </Center>
  );
};

export default Profile;
