import { Wrap, WrapItem } from "@chakra-ui/react";
import { Pet } from "../../types/types";
import PetCard from "./PetCard";

type Props = {
  pets: Pet[];
};

const PetList = ({ pets }: Props) => {
  return (
    <Wrap>
      {pets.map((pet) => (
        <WrapItem key={pet.id}>
          <PetCard pet={pet} />
        </WrapItem>
      ))}
    </Wrap>
  );
};

export default PetList;
