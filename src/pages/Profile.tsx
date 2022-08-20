import {
  Avatar,
  ButtonGroup,
  Center,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  useEditableControls,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { FaEdit, FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { ActiveUser } from "../contexts/contexts";

type Props = {};

const Profile = (props: Props) => {
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

  const handleAvatarEdit = () => {
    // open modal with file picker to upload image
  };

  return (
    <Center>
      <VStack gap={3}>
        <Heading
          color="brand.Bittersweet"
          sx={{
            fontFamily: "var(--title-font)",
          }}
        >
          Profile
        </Heading>
        {user.isSuccess && (
          <HStack gap={5} width="60vw">
            <Avatar
              size="2xl"
              bg="brand.RocketMetallic"
              src={user.data.photo}
              onClick={handleAvatarEdit}
              className="clickable"
            />
            <VStack>
              <Editable defaultValue={user.data.firstname}>
                <EditablePreview />
                <EditableInput />
              </Editable>
            </VStack>
          </HStack>
        )}
      </VStack>
    </Center>
  );
};

export default Profile;
