import { Code, HStack } from "@chakra-ui/react";
import { GrFormClose } from "react-icons/gr";
import React from "react";

type Props = {
  tags: (string | undefined)[];
  onRemove: (i: number) => void;
};

const TagList = ({ tags, onRemove }: Props) => {
  // working on deleting tags
  return (
    <HStack mt={2}>
      {tags.map(
        (tag, i) =>
          tag && (
            <Code
              key={tag}
              colorScheme="gray"
              sx={{
                display: "flex",
                flexFlow: "row nowrap",
                alignItems: "center",
                gap: "2px",
                fontSize: "0.7rem",
                whiteSpace: "nowrap",
              }}
            >
              {tag}
              <GrFormClose onClick={() => onRemove(i)} className="clickable" />
            </Code>
          )
      )}
    </HStack>
  );
};

export default TagList;
