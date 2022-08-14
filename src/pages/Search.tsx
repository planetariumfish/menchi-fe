import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  VStack,
} from "@chakra-ui/react";
import React from "react";

type Props = {};

const Search = (props: Props) => {
  return (
    <Center>
      <VStack gap={3}>
        <Heading
          color="brand.Bittersweet"
          sx={{
            fontFamily: "var(--title-font)",
          }}
        >
          Search
        </Heading>
        <HStack>
          <Input width="40ch" />
          <Button></Button>
        </HStack>
      </VStack>
    </Center>
  );
};

export default Search;
