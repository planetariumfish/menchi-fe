import {
  Box,
  Button,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  Spacer,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { ActiveUser } from "../contexts/contexts";
import { User } from "../types/types";
import { User as UserSchema } from "../schemas/user.zod";
import ChangePasswordForm from "../components/profile/ChangePasswordForm";
import { useNavigate } from "react-router-dom";

const ProfileEdit = () => {
  const { user, token } = React.useContext(ActiveUser);
  const [updatedInfo, setUpdatedInfo] = React.useState(user);
  const navigate = useNavigate();
  const toast = useToast();

  const editProfile = useMutation(
    (data: User) => {
      return axios.put(`${import.meta.env.VITE_BASE_URL}/users/edit`, data, {
        headers: {
          "x-access-token": token || "",
        },
      });
    },
    {
      onSuccess: (response) => {
        console.log(response.data);
        toast({
          description: response.data,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        navigate("/profile");
      },
    }
  );

  const handleEdit = async () => {
    const result = UserSchema.safeParse(updatedInfo);
    if (!result.success) {
      // do something to handle the error
      console.log(result.error);
    } else {
      editProfile.mutate(result.data);
    }
  };

  return (
    <Center>
      <VStack gap={3} width="100%">
        <Heading
          color="brand.Bittersweet"
          sx={{
            fontFamily: "var(--title-font)",
          }}
        >
          Profile Settings
        </Heading>
        {user && (
          <VStack width="60%" gap={5}>
            <FormControl>
              <FormLabel htmlFor="firstname">First name</FormLabel>
              <Input
                type="text"
                id="firstname"
                name="firstname"
                value={updatedInfo?.firstname}
                placeholder="Kazuma"
                onChange={(e) =>
                  // asserting updatedInfo because if we get to this point we should have user in context
                  setUpdatedInfo({ ...updatedInfo!, firstname: e.target.value })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="lastname">Last name</FormLabel>
              <Input
                type="text"
                id="lastname"
                name="lastname"
                value={updatedInfo?.lastname || ""}
                placeholder="Kiryu"
                onChange={(e) =>
                  setUpdatedInfo({ ...updatedInfo!, lastname: e.target.value })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                type="text"
                id="email"
                name="email"
                value={updatedInfo?.email}
                placeholder="enter a valid email!"
                onChange={(e) =>
                  setUpdatedInfo({ ...updatedInfo!, email: e.target.value })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="phone">Phone number:</FormLabel>
              <Input
                type="text"
                id="phone"
                name="phone"
                value={updatedInfo?.phone || ""}
                placeholder="+81-80-..."
                // remember to strip phone number of non-digit characters on BE
                onChange={(e) =>
                  setUpdatedInfo({ ...updatedInfo!, phone: e.target.value })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="bio">Bio (or "about" text)</FormLabel>
              <Textarea
                id="bio"
                name="bio"
                value={updatedInfo?.bio || ""}
                placeholder="I love animals! My favourite is..."
                resize="none"
                onChange={(e) =>
                  setUpdatedInfo({ ...updatedInfo!, bio: e.target.value })
                }
              />
              <FormHelperText>
                Characters: {updatedInfo?.bio?.length || 0} / 400
              </FormHelperText>
            </FormControl>
            <HStack width="100%">
              <Spacer />
              <Button onClick={handleEdit}>Save</Button>
            </HStack>
            <Box height="1px" bg="brand.Bittersweet" width="100%"></Box>
            <ChangePasswordForm />
          </VStack>
        )}
      </VStack>
    </Center>
  );
};

export default ProfileEdit;
