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
import { AnimalType, Status } from "../types/enums";
import React from "react";
import AnimalButtons from "../components/AnimalButtons";
import axios from "axios";

// TODO: Make this responsive

const Search = () => {
  const [search, setSearch] = React.useState({
    animalType: AnimalType.ALL,
    status: Status.ANY,
    height: 0,
    weight: 0,
    name: "",
  });
  const [metric, setMetric] = React.useState(true);

  // Checking the search object. DON'T FORGET TO REMOVE
  React.useEffect(() => {
    console.log(search);
  }, [search]);

  const handleHeightChange = (height: number) => {
    if (!metric) height = height / 2.54;
    setSearch({ ...search, height });
  };

  const handleWeightChange = (weight: number) => {
    if (!metric) weight = weight * 2.205;
    setSearch({ ...search, weight });
  };

  const onSearch = async () => {
    // build the query
    const queryParams = `?animalType=${search.animalType}&status=${search.status}&height=${search.height}&weight=${search.weight}&name=${search.name}`;
    const searchQuery = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/pets/${queryParams}`
    );
    console.log(searchQuery.data);
  };

  return (
    <Center>
      <VStack gap={5}>
        <Heading
          color="brand.Bittersweet"
          sx={{
            fontFamily: "var(--title-font)",
          }}
        >
          Search for a pet
        </Heading>
        <AnimalButtons
          onClick={(type) => setSearch({ ...search, animalType: type })}
          type={search.animalType}
        />

        <FormControl as="fieldset">
          <FormLabel as="legend">Adoption status:</FormLabel>
          <RadioGroup
            defaultValue={Status.ANY}
            onChange={(value: Status) =>
              setSearch({ ...search, status: value })
            }
          >
            <HStack spacing="2rem">
              <Radio colorScheme="teal" value={Status.ANY}>
                Any
              </Radio>
              <Radio colorScheme="teal" value={Status.AVAILABLE}>
                Available
              </Radio>
              <Radio colorScheme="teal" value={Status.FOSTERED}>
                Fostered
              </Radio>
              <Radio colorScheme="teal" value={Status.ADOPTED}>
                Adopted
              </Radio>
            </HStack>
          </RadioGroup>
        </FormControl>
        <FormControl>
          <HStack>
            <FormLabel htmlFor="height" mb={0}>
              Height
            </FormLabel>
            <Input
              type="number"
              width="5ch"
              id="height"
              name="height"
              placeholder="0"
              onChange={(e) => handleHeightChange(+e.target.value)}
            />
            <Text mb="0" width="10ch">
              {metric ? "cm" : "inches"}
            </Text>
            <Spacer />
            <FormLabel htmlFor="weight" mb={0}>
              Weight
            </FormLabel>
            <Input
              type="number"
              width="5ch"
              id="weight"
              name="weight"
              placeholder="0"
              onChange={(e) => handleWeightChange(+e.target.value)}
            />
            <Text mb="0" width="10ch">
              {metric ? "kg" : "lbs"}
            </Text>
            <FormLabel htmlFor="units" mb={0} width="11ch">
              units: {metric ? "metric" : "imperial"}{" "}
            </FormLabel>
            <Switch
              id="units"
              colorScheme="yellow"
              isChecked={metric}
              onChange={() => setMetric(!metric)}
            />
          </HStack>
        </FormControl>
        <FormControl>
          <HStack>
            <FormLabel>Name:</FormLabel>
            <Input
              type="text"
              placeholder="Search by name"
              onChange={(e) => setSearch({ ...search, name: e.target.value })}
            />
          </HStack>
        </FormControl>
        <Button onClick={onSearch}>Search</Button>
      </VStack>
    </Center>
  );
};

export default Search;

// Search by:
// Adoption Status - radio button
// Type - icon button? select?
// Height - input // radio button for inches/cm
// Weight - input // radio button for lbs/kg
// Name - text input
