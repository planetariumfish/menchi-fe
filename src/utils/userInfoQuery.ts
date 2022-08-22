import axios from "axios";

const userInfoQuery = async () => {
  const token = localStorage.getItem("token");
  const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/`, {
    headers: {
      "x-access-token": token || "",
    },
  });
  return result.data;
};

export default userInfoQuery;
