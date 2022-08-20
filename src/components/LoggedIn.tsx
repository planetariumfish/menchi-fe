import React, { useEffect } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Avatar,
  Icon,
  Spinner,
} from "@chakra-ui/react";
import { TbLogout } from "react-icons/tb";
import { FaBookmark, FaUser, FaSearch } from "react-icons/fa";
import { BsHeartFill } from "react-icons/bs";
import { MdError } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { ActiveUser } from "../contexts/contexts";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoggedIn = () => {
  const { userId, setUserId } = React.useContext(ActiveUser);
  const navigate = useNavigate();

  const user = useQuery(["userInfo"], async () => {
    const token = localStorage.getItem("token");
    const result = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/users/${userId}`,
      {
        headers: {
          "x-access-token": token || "",
        },
      }
    );
    return result.data;
  });

  const logout = () => {
    localStorage.clear();
    setUserId!(null);
  };

  if (user.isLoading) return <Spinner size="xs" />;

  if (userId && user.isSuccess)
    return (
      <Menu>
        <MenuButton
          as={Avatar}
          aria-label={`${user.data.firstname} ${user.data.lastname}`}
          size="sm"
          bg="brand.OrangeYellow"
          className="clickable"
        />

        <MenuList>
          <MenuItem icon={<FaUser />} onClick={() => navigate("/profile")}>
            Profile
          </MenuItem>
          <MenuDivider />
          <MenuItem icon={<BsHeartFill />}>Your Pets</MenuItem>
          <MenuItem icon={<FaBookmark />}>Saved Pets</MenuItem>
          <MenuDivider />
          <MenuItem icon={<FaSearch />} onClick={() => navigate("/search")}>
            Search for a pet
          </MenuItem>
          <MenuDivider />
          <MenuItem icon={<TbLogout />} onClick={logout}>
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    );
  // also add tooltip to display error message
  else return <Icon as={MdError} />;
};

export default LoggedIn;
