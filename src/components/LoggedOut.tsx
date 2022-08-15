import { HStack, Box, Text } from "@chakra-ui/react";
import React from "react";
import Login from "./Login";
import Signup from "./Signup";

const LoggedOut = () => {
  const [login, setLogin] = React.useState<boolean>(false);
  const [signup, setSignup] = React.useState<boolean>(false);
  return (
    <>
      <HStack gap={1}>
        <Box as="a" onClick={() => setLogin(true)}>
          Login
        </Box>
        <Text>|</Text>
        <Box as="a" onClick={() => setSignup(true)}>
          Sign up
        </Box>
      </HStack>
      {login && <Login onClose={() => setLogin(false)} isOpen={login} />}
      {signup && <Signup onClose={() => setSignup(false)} isOpen={signup} />}
    </>
  );
};

export default LoggedOut;
