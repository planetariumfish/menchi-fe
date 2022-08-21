import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
} from "@chakra-ui/react";
import { TbLogout } from "react-icons/tb";
import { FaBookmark, FaUser, FaSearch } from "react-icons/fa";
import { BsHeartFill } from "react-icons/bs";
import { ActiveUser } from "../contexts/contexts";
import { useNavigate } from "react-router-dom";

const LoggedIn = () => {
  const { user, setUser, setToken } = React.useContext(ActiveUser);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    setToken!(null);
    setUser!(null);
  };

  return (
    user && (
      <Menu>
        <MenuButton
          as={Avatar}
          aria-label={`${user.firstname} ${user.lastname}`}
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
    )
  );
};

export default LoggedIn;
