import {
  Button,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Input,
  Radio,
  RadioGroup,
  Spacer,
  Switch,
  VisuallyHidden,
  VStack,
  Text,
} from "@chakra-ui/react";

import React from "react";
import PetList from "../components/search/PetList";
import SearchForm from "../components/search/SearchForm";
import { Pet } from "../types/types";

// TODO: Make this responsive

const Search = () => {
  const [pets, setPets] = React.useState<Pet[]>();

  return (
    <Center>
      <VStack gap={5} width="80%">
        <Heading color="brand.Bittersweet">Search for a pet</Heading>
        <SearchForm onSearch={(data) => setPets(data)} />
        <Center>{pets && <PetList pets={pets} />}</Center>
      </VStack>
    </Center>
  );
};

export default Search;
