import { Box, Flex, Heading, HStack, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";

const Nav = () => {
  const [login, setLogin] = React.useState<boolean>(false);
  const [signup, setSignup] = React.useState<boolean>(false);

  return (
    <Flex
      justify="end"
      bgColor="brand.Keppel"
      sx={{
        padding: "0.5rem 1rem",
        width: "100%",
        position: "fixed",
        borderRadius: "0 0 0.5rem 0.5rem",
      }}
      id="nav"
    >
      <Link to="/">
        <Heading
          color="brand.OrangeYellow"
          size="md"
          sx={{
            fontFamily: "var(--title-font)",
          }}
        >
          Menchi
        </Heading>
      </Link>
      <Spacer />
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
    </Flex>
  );
};

export default Nav;
