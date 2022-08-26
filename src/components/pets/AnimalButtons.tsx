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
import AnimalButton from "./AnimalButton";
import { FerretIcon } from "./FerretIcon";

type Props = {
  selected: AnimalType | string;
  onClick: (type: AnimalType) => void;
};

const AnimalButtons = ({ onClick, selected }: Props) => {
  return (
    <HStack gap={1}>
      <AnimalButton
        type={AnimalType.DOG}
        selected={selected}
        onClick={onClick}
        icon={<GiSittingDog />}
      />
      <AnimalButton
        type={AnimalType.CAT}
        selected={selected}
        onClick={onClick}
        icon={<GiCat />}
      />
      <AnimalButton
        type={AnimalType.RAT}
        selected={selected}
        onClick={onClick}
        icon={<GiSeatedMouse />}
      />
      <AnimalButton
        type={AnimalType.BIRD}
        selected={selected}
        onClick={onClick}
        icon={<GiEgyptianBird />}
      />
      <AnimalButton
        type={AnimalType.RABBIT}
        selected={selected}
        onClick={onClick}
        icon={<GiRabbit />}
      />
      {/* Fix this one */}
      <AnimalButton
        type={AnimalType.FERRET}
        selected={selected}
        onClick={onClick}
        icon={<FerretIcon />}
      />
      <AnimalButton
        type={AnimalType.OTHER}
        selected={selected}
        onClick={onClick}
        icon={<FaQuestion />}
      />
    </HStack>
  );
};

export default AnimalButtons;
