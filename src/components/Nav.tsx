import { Flex, Heading, Spacer } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { ActiveUser } from "../contexts/contexts";
import LoggedIn from "./login/LoggedIn";
import LoggedOut from "./login/LoggedOut";

const Nav = () => {
  const { user } = React.useContext(ActiveUser);

  return (
    <Flex
      justify="end"
      align="center"
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
          size="lg"
          sx={{
            fontFamily: "var(--title-font)",
          }}
        >
          Menchi
        </Heading>
      </Link>
      <Spacer />
      {user ? <LoggedIn /> : <LoggedOut />}
    </Flex>
  );
};

export default Nav;
