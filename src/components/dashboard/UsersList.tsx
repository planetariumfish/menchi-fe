import { Box } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "../../utils/axiosClient";
import React from "react";

type Props = {};

const UsersList = (props: Props) => {
  const [allUserIds, setAllUserIds] = React.useState<string[]>([]);

  const users = useQuery(
    ["allUsers"],
    async () => {
      const result = await axios.get("/users/all");
      return result.data;
    },
    {
      onSuccess: () => {
        if (users.data) setAllUserIds(users.data);
      },
    }
  );

  return (
    <Box bg="white" w="100%" p={2} borderWidth="1px">
      {/* Use TANSTACK REACT TABLE HERE */}
    </Box>
  );
};

export default UsersList;
