import { Wrap, WrapItem } from "@chakra-ui/react";
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
    <Wrap gap={1}>
      <WrapItem gap={1}>
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
      </WrapItem>
      <WrapItem gap={1}>
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
      </WrapItem>
      <WrapItem gap={1}>
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
      </WrapItem>
      <WrapItem gap={1}>
        <AnimalButton
          type={AnimalType.OTHER}
          selected={selected}
          onClick={onClick}
          icon={<FaQuestion />}
        />
      </WrapItem>
    </Wrap>
  );
};

export default AnimalButtons;
