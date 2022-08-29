import React from "react";
import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import AdminRoute from "./components/routes/AdminRoute";
import LoggedInRoute from "./components/routes/LoggedInRoute";
import { ActiveUser } from "./contexts/contexts";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import PetPage from "./pages/PetPage";
import Profile from "./pages/Profile";
import ProfileEdit from "./pages/ProfileEdit";
import Search from "./pages/Search";
import useBookmarkStore from "./contexts/bookmarkStore";
import Favorites from "./pages/Favorites";
import OwnedPets from "./pages/OwnedPets";
import usePetStore from "./contexts/petStore";

function App() {
  const { user } = React.useContext(ActiveUser);
  const loadBookmarks = useBookmarkStore((state) => state.load);
  const resetBookmarks = useBookmarkStore((state) => state.reset);
  const loadPets = usePetStore((state) => state.load);
  const resetPets = usePetStore((state) => state.reset);

  React.useEffect(() => {
    if (user) {
      loadBookmarks(user.id);
      loadPets(user.id);
    } else {
      resetBookmarks();
      resetPets();
    }
  }, [user]);

  return (
    <Box width="100vw">
      <Nav />
      <Box sx={{ height: "4rem" }} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/pet/:id" element={<PetPage />} />
        <Route element={<LoggedInRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<ProfileEdit />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/owned" element={<OwnedPets />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
      <Box sx={{ height: "2rem" }} />
    </Box>
  );
}

export default App;
