import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import AdminRoute from "./components/routes/AdminRoute";
import LoggedInRoute from "./components/routes/LoggedInRoute";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Search from "./pages/Search";

function App() {
  return (
    <Box width="100vw">
      <Nav />
      <Box sx={{ height: "4rem" }} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route element={<LoggedInRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route element={<AdminRoute />}></Route>
      </Routes>
    </Box>
  );
}

export default App;
