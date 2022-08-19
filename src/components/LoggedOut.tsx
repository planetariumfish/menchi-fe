import { Box } from "@chakra-ui/react";
import React from "react";
import LoginModal from "./LoginModal";

const LoggedOut = () => {
  const [login, setLogin] = React.useState<boolean>(false);
  return (
    <>
      <Box as="a" onClick={() => setLogin(true)}>
        Login
      </Box>
      {login && <LoginModal onClose={() => setLogin(false)} isOpen={login} />}
    </>
  );
};

export default LoggedOut;
