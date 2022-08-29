import {
  VStack,
  HStack,
  Button,
  FormControl,
  FormLabel,
  Switch,
  RadioGroup,
  Radio,
  Input,
  Spacer,
  Text,
  Box,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { Pet, Search as SearchType } from "../../types/types";
import axios from "../../utils/axiosClient";
import AnimalButtons from "../pets/AnimalButtons";
import { AnimalType, Status } from "../../types/enums";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type Props = {
  onSearch: (pets: Pet[]) => void;
};

const SearchForm = ({ onSearch }: Props) => {
  const [searchInfo, setSearchInfo] = React.useState<SearchType>({
    animalType: "",
    status: "",
    height: [0, 0],
    weight: [0, 0],
    name: "",
    advanced: false,
  });
  const [metric, setMetric] = React.useState(true);
  const [parent] = useAutoAnimate<HTMLDivElement>(/* optional config */);

  // Checking the search object. DON'T FORGET TO REMOVE
  React.useEffect(() => {
    console.log(searchInfo);
  }, [searchInfo]);

  // const handleHeightChange = (height: number) => {
  //   if (!metric) height = height / 2.54;
  //   setSearch({ ...search, height });
  // };

  // const handleWeightChange = (weight: number) => {
  //   if (!metric) weight = weight * 2.205;
  //   setSearch({ ...search, weight });
  // };

  const { mutate, isLoading } = useMutation(
    (data: SearchType) => {
      return axios.get("/pets/", { params: searchInfo });
    },
    {
      onSuccess: (response) => {
        onSearch(response.data.pets);
      },
    }
  );
  return (
    <VStack>
      <HStack gap={5}>
        <HStack gap={2} width="100%">
          <Button
            size="lg"
            colorScheme={searchInfo.animalType === "" ? "yellow" : "gray"}
            onClick={() => setSearchInfo({ ...searchInfo, animalType: "" })}
          >
            ALL
          </Button>

          <AnimalButtons
            onClick={(selected) =>
              setSearchInfo({ ...searchInfo, animalType: selected })
            }
            selected={searchInfo.animalType}
          />
        </HStack>
        <FormControl width="content">
          <FormLabel mb={0} width="8ch">
            {searchInfo.advanced ? "Advanced" : "Simple"}
          </FormLabel>
          <Switch
            colorScheme="teal"
            isChecked={searchInfo.advanced}
            onChange={() =>
              setSearchInfo({ ...searchInfo, advanced: !searchInfo.advanced })
            }
          />
        </FormControl>
      </HStack>
      <Box ref={parent}>
        {searchInfo.advanced && (
          <VStack>
            <FormControl as="fieldset" mt={2}>
              <FormLabel as="legend">Adoption status:</FormLabel>
              <RadioGroup
                defaultValue={""}
                onChange={(value: Status) =>
                  setSearchInfo({ ...searchInfo, status: value })
                }
              >
                <HStack spacing="2rem">
                  <Radio colorScheme="teal" value={""}>
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
                  // onChange={(e) => handleHeightChange(+e.target.value)}
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
                  // onChange={(e) => handleWeightChange(+e.target.value)}
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
            <FormControl mb={2}>
              <HStack>
                <FormLabel>Name:</FormLabel>
                <Input
                  type="text"
                  placeholder="Search by name"
                  onChange={(e) =>
                    setSearchInfo({ ...searchInfo, name: e.target.value })
                  }
                />
              </HStack>
            </FormControl>
          </VStack>
        )}
      </Box>
      <Button onClick={() => mutate(searchInfo)}>Search</Button>
    </VStack>
  );
};

export default SearchForm;
