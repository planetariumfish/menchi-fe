import { Center, Heading, VStack } from "@chakra-ui/react";
import React from "react";

type Props = {};

const Profile = (props: Props) => {
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
      </VStack>
    </Center>
  );
};

export default Profile;
