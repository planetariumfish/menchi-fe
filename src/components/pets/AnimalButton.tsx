import { IconButton } from "@chakra-ui/react";
import React from "react";
import { AnimalType } from "../../types/enums";

type Props = {
  type: AnimalType;
  icon: React.ReactElement;
  onClick: (type: AnimalType) => void;
  selected: AnimalType | string;
};

const AnimalButton = ({ type, icon, onClick, selected }: Props) => {
  return (
    <IconButton
      size="lg"
      aria-label={type}
      colorScheme={type === selected ? "yellow" : "gray"}
      onClick={() => onClick(type)}
      icon={icon}
    />
  );
};

export default AnimalButton;
