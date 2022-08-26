import React from "react";
import { Text } from "@chakra-ui/react";

type Props = {
  toggle: () => void;
  hasAccount: boolean;
};

const FormToggle = ({ toggle, hasAccount }: Props) => {
  return (
    <Text
      fontSize="xs"
      as="b"
      id="formtoggle-text"
      color="brand.Keppel"
      onClick={toggle}
    >
      {hasAccount
        ? "Don't have an account? Sign up!"
        : "Remembered you have an account? Login!"}
    </Text>
  );
};

export default FormToggle;
