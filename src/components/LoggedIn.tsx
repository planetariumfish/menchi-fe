import React from "react";
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
} from "@chakra-ui/react";
import { TbLogout } from "react-icons/tb";
import { FaBookmark, FaUser } from "react-icons/fa";
import { BsHeartFill } from "react-icons/bs";
import { ActiveUser } from "../contexts/contexts";

const LoggedIn = () => {
  const user = React.useContext(ActiveUser);
  return (
    <Menu>
      {user && (
        <MenuButton
          as={Avatar}
          name={`${user.firstname} ${user.lastname}`}
          size="sm"
          bg="brand.OrangeYellow"
        />
      )}
      <MenuList>
        <MenuItem icon={<FaUser />}>Profile</MenuItem>
        <MenuDivider />
        <MenuItem icon={<BsHeartFill />}>Your Pets</MenuItem>
        <MenuItem icon={<FaBookmark />}>Saved Pets</MenuItem>
        <MenuDivider />
        <MenuItem icon={<TbLogout />}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default LoggedIn;
