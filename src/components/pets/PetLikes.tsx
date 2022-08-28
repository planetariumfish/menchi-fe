import { useQuery } from "@tanstack/react-query";
import axios from "../../utils/axiosClient";
import React from "react";
import { Text } from "@chakra-ui/react";

type Props = {
  id: string | undefined;
  name: string;
};

const PetLikes = ({ name, id }: Props) => {
  const [likes, setLikes] = React.useState<number>(0);

  const getLikes = useQuery(
    [id],
    async () => {
      const result = await axios.get(`/pets/${id}/likes`);
      return result.data;
    },
    {
      onSuccess: (data) => {
        setLikes(data.likes);
      },
    }
  );
  return (
    <Text>
      {name} has been favorited by {likes || 0} users.
    </Text>
  );
};

export default PetLikes;
