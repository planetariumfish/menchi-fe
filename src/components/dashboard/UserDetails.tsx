import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Heading,
  Center,
  Spinner,
  Text,
  Avatar,
  Button,
  HStack,
  VStack,
  ModalFooter,
  Box,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "../../utils/axiosClient";
import React from "react";
import { ModalProps, Pet, User } from "../../types/types";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import PetList from "../search/PetList";
import UserPets from "./UserPets";

type UserModalProps = ModalProps & {
  userId: string;
};

const UserDetails = ({ isOpen, onClose, userId }: UserModalProps) => {
  const [user, setUser] = React.useState<User>();
  const [pets, setPets] = React.useState<Pet[]>([]);
  const userDetails = useQuery(
    [userId],
    async () => {
      const result = await axios.get(`/users/${userId}`);
      return result.data;
    },
    {
      onSuccess: (data) => {
        setUser(data.user);
      },
    }
  );

  const getPets = useQuery(
    ["getUserOwnedPets"],
    async () => {
      // query doesn't run without a non-null user object in context
      const result = await axios.get(`/pets/user/${user!.id}`);
      return result.data;
    },
    {
      onSuccess: (data) => {
        setPets(data.pets);
      },
      enabled: !!user,
    }
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading size="md" color="brand.Bittersweet">
            User details
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {userDetails.isLoading && (
            <Center>
              <Spinner />
            </Center>
          )}
          {user && (
            <HStack gap={5} width="100%" align="start">
              <Avatar
                size="2xl"
                bg="brand.RocketMetallic"
                src={user.photo || ""}
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
                  <Text as="b">Phone:</Text>
                  <Text>{user.phone || <Text as="i">none</Text>}</Text>
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
                      <Button size="xs">Reset status</Button>
                    </HStack>
                  ) : (
                    <FaCheck aria-label="Yes!" />
                  )}
                </HStack>
              </VStack>
            </HStack>
          )}
          {getPets.isLoading && <Spinner />}
          <Box height="2rem" />
          <Heading size="md" mb={2} color="brand.RocketMetallic">
            Owned Pets
          </Heading>
          {<UserPets pets={pets} />}
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserDetails;
