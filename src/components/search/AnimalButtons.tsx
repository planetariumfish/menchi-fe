import { HStack, Button, IconButton } from "@chakra-ui/react";
import React from "react";
import { FaQuestion } from "react-icons/fa";
import {
  GiSittingDog,
  GiCat,
  GiSeatedMouse,
  GiEgyptianBird,
  GiRabbit,
} from "react-icons/gi";
import { AnimalType } from "../../types/enums";
import { FerretIcon } from "./FerretIcon";

type Props = {
  type: AnimalType;
  onClick: (type: AnimalType) => void;
};

const AnimalButtons = ({ onClick, type }: Props) => {
  return (
    <HStack gap={2}>
      <Button
        size="lg"
        colorScheme={type === AnimalType.ALL ? "yellow" : "gray"}
        onClick={() => onClick(AnimalType.ALL)}
      >
        ALL
      </Button>
      <IconButton
        size="lg"
        aria-label="Search for a dog"
        colorScheme={type === AnimalType.DOG ? "yellow" : "gray"}
        onClick={() => onClick(AnimalType.DOG)}
        icon={<GiSittingDog />}
      />
      <IconButton
        size="lg"
        aria-label="Search for a cat"
        colorScheme={type === AnimalType.CAT ? "yellow" : "gray"}
        onClick={() => onClick(AnimalType.CAT)}
        icon={<GiCat />}
      />
      <IconButton
        size="lg"
        aria-label="Search for a rat"
        colorScheme={type === AnimalType.RAT ? "yellow" : "gray"}
        onClick={() => onClick(AnimalType.RAT)}
        icon={<GiSeatedMouse />}
      />
      <IconButton
        size="lg"
        aria-label="Search for a bird"
        colorScheme={type === AnimalType.BIRD ? "yellow" : "gray"}
        onClick={() => onClick(AnimalType.BIRD)}
        icon={<GiEgyptianBird />}
      />
      <IconButton
        size="lg"
        aria-label="Search for a rabbit"
        colorScheme={type === AnimalType.RABBIT ? "yellow" : "gray"}
        onClick={() => onClick(AnimalType.RABBIT)}
        icon={<GiRabbit />}
      />
      <IconButton
        size="lg"
        aria-label="Search for a ferret"
        colorScheme={type === AnimalType.FERRET ? "yellow" : "gray"}
        onClick={() => onClick(AnimalType.FERRET)}
        icon={<FerretIcon />}
      />{" "}
      {/* Fix this one */}
      <IconButton
        size="lg"
        aria-label="Search for another kind of pet"
        colorScheme={type === AnimalType.OTHER ? "yellow" : "gray"}
        onClick={() => onClick(AnimalType.OTHER)}
        icon={<FaQuestion />}
      />
    </HStack>
  );
};

export default AnimalButtons;
