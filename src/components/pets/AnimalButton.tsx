import { IconButton, Box, Tooltip } from "@chakra-ui/react";
import React from "react";
import { AnimalType } from "../../types/enums";

type Props = {
  type: AnimalType;
  icon: React.ReactElement;
  onClick: (type: AnimalType) => void;
  selected: AnimalType | string;
};

const Card = React.forwardRef<HTMLDivElement, { children: JSX.Element }>(
  ({ children, ...rest }, ref) => (
    <Box ref={ref} {...rest}>
      {children}
    </Box>
  )
);

const AnimalButton = ({ type, icon, onClick, selected }: Props) => {
  return (
    <Tooltip hasArrow label={type} closeDelay={100}>
      <Card>
        <IconButton
          size="lg"
          aria-label={type}
          colorScheme={type === selected ? "yellow" : "gray"}
          onClick={() => onClick(type)}
          icon={icon}
        />
      </Card>
    </Tooltip>
  );
};

export default AnimalButton;
