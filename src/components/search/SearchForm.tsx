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
  Text,
  Box,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Tooltip,
  FormHelperText,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { Pet, Search as SearchType } from "../../types/types";
import axios from "../../utils/axiosClient";
import AnimalButtons from "../pets/AnimalButtons";
import { Status } from "../../types/enums";
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
    query: "",
    advanced: false,
  });
  const [parent] = useAutoAnimate<HTMLDivElement>();

  const { mutate, isLoading } = useMutation(
    (data: SearchType) => {
      return axios.get("/pets/", { params: searchInfo });
    },
    {
      onSuccess: (response) => {
        onSearch(response.data.pets);
        setSearchInfo({
          ...searchInfo,
          height: [0, 0],
          weight: [0, 0],
          query: "",
        });
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
      <Box ref={parent} width="100%">
        {searchInfo.advanced && (
          <VStack>
            <FormControl as="fieldset" mt={2}>
              <FormLabel as="legend">Adoption status:</FormLabel>
              <RadioGroup
                defaultValue={""}
                onChange={(value: Status) =>
                  setSearchInfo({ ...searchInfo, status: value })
                }
                value={searchInfo.status}
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
                <RangeSlider
                  aria-label={["min", "max"]}
                  colorScheme="pink"
                  defaultValue={[0, 10]}
                  min={0}
                  max={110}
                  onChange={(height: [number, number]) => {
                    setSearchInfo({ ...searchInfo, height });
                  }}
                >
                  <RangeSliderTrack>
                    <RangeSliderFilledTrack />
                  </RangeSliderTrack>
                  <Tooltip
                    hasArrow
                    label={`${searchInfo.height[0]}`}
                    bg="brand.Keppel"
                    color="brand.Cultured"
                  >
                    <RangeSliderThumb index={0} />
                  </Tooltip>
                  <Tooltip
                    hasArrow
                    label={`${searchInfo.height[1]}`}
                    bg="brand.Keppel"
                    color="brand.Cultured"
                  >
                    <RangeSliderThumb index={1} />
                  </Tooltip>
                </RangeSlider>
                <Text mb="0" width="12ch">
                  {searchInfo.height[0]} - {searchInfo.height[1]} cm
                </Text>
              </HStack>
            </FormControl>
            <FormControl>
              <HStack>
                <FormLabel htmlFor="weight" mb={0}>
                  Weight
                </FormLabel>
                <RangeSlider
                  aria-label={["min", "max"]}
                  colorScheme="pink"
                  defaultValue={[0, 10]}
                  min={0}
                  max={60}
                  onChange={(weight: [number, number]) => {
                    console.log(searchInfo.weight);
                    setSearchInfo({ ...searchInfo, weight });
                  }}
                >
                  <RangeSliderTrack>
                    <RangeSliderFilledTrack />
                  </RangeSliderTrack>
                  <Tooltip
                    hasArrow
                    label={`${searchInfo.weight[0]}`}
                    bg="brand.Keppel"
                    color="brand.Cultured"
                  >
                    <RangeSliderThumb index={0} />
                  </Tooltip>
                  <Tooltip
                    hasArrow
                    label={`${searchInfo.weight[1]}`}
                    bg="brand.Keppel"
                    color="brand.Cultured"
                  >
                    <RangeSliderThumb index={1} />
                  </Tooltip>
                </RangeSlider>
                <Text mb="0" width="12ch">
                  {searchInfo.weight[0]} - {searchInfo.weight[1]} kg
                </Text>
              </HStack>
            </FormControl>
            <FormControl mb={2}>
              <HStack>
                <FormLabel>Query:</FormLabel>
                <Input
                  type="text"
                  placeholder="Search by breed, color, name, tags..."
                  onChange={(e) =>
                    setSearchInfo({ ...searchInfo, query: e.target.value })
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") mutate(searchInfo);
                  }}
                  value={searchInfo.query}
                />
              </HStack>
              <FormHelperText>
                Enter search terms separated by commas. Tags and dietary
                requirements are an exact match.
              </FormHelperText>
            </FormControl>
          </VStack>
        )}
      </Box>
      <HStack gap={3}>
        <Button
          onClick={() =>
            setSearchInfo({
              ...searchInfo,
              animalType: "",
              status: "",
              height: [0, 0],
              weight: [0, 0],
              query: "",
            })
          }
        >
          Reset
        </Button>
        <Button onClick={() => mutate(searchInfo)}>Search</Button>
      </HStack>
    </VStack>
  );
};

export default SearchForm;
