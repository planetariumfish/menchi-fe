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
import { FaBookmark, FaUser, FaSearch, FaDragon } from "react-icons/fa";
import { BsHeartFill } from "react-icons/bs";
import { ActiveUser } from "../contexts/contexts";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosClient";

const LoggedIn = () => {
  const { user, setUserId } = React.useContext(ActiveUser);
  const navigate = useNavigate();

  return (
    user && (
      <Menu>
        <MenuButton
          as={Avatar}
          aria-label={`${user.firstname} ${user.lastname}`}
          size="sm"
          bg="brand.OrangeYellow"
          className="clickable"
          src={user.photo || ""}
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
          {user.role === "ADMIN" && (
            <>
              <MenuItem
                icon={<FaDragon />}
                onClick={() => navigate("/dashboard")}
              >
                Admin Dashboard
              </MenuItem>
              <MenuDivider />
            </>
          )}
          <MenuItem
            icon={<TbLogout />}
            onClick={() => {
              axios.get("/users/logout");
              if (setUserId) setUserId(null);
            }}
          >
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    )
  );
};

export default LoggedIn;
