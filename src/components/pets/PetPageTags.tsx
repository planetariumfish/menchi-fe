import { Tag, Wrap, WrapItem } from "@chakra-ui/react";
import React from "react";

type Props = {
  tags: (string | undefined)[];
};

const PetPageTags = ({ tags }: Props) => {
  return (
    <Wrap>
      {tags.map((tag) => (
        <WrapItem key={tag}>
          <Tag size="md">#{tag}</Tag>
        </WrapItem>
      ))}
    </Wrap>
  );
};

export default PetPageTags;
