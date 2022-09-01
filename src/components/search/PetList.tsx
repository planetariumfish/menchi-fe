import { Text, Wrap, WrapItem } from "@chakra-ui/react";
import { Pet } from "../../types/types";
import PetCard from "./PetCard";

type Props = {
  pets: Pet[];
};

const PetList = ({ pets }: Props) => {
  return (
    <Wrap>
      {" "}
      {pets.length > 0 ? (
        pets.map((pet) => (
          <WrapItem key={pet.id}>
            <PetCard pet={pet} />
          </WrapItem>
        ))
      ) : (
        <Text as="i">No pets found</Text>
      )}
    </Wrap>
  );
};

export default PetList;
