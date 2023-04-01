import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Information from "./pages/Information";
import NavBar from "./components/NavBar";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./auth/helper/PrivateRoute";
import AdminRoute from "./auth/helper/AdminRoute";
import { useEffect, useState } from "react";
import { isAuthenticated } from "./auth/helper";

function App() {
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    getUserState();
  }, [userEmail]);

  const getUserState = () => {
    const { user } = isAuthenticated();
    setUserEmail(user?.email);
  };

  return (
    <Router>
      <NavBar userEmail={userEmail} setUserEmail={setUserEmail} getUserState={getUserState} />
      <Routes>
        <Route path="/" element={<Home getUserState={getUserState} />} />
        <Route path="/" exact element={<PrivateRoute />}>
          <Route path="information" exact element={<Information />} />
        </Route>
        <Route path="/" exact element={<AdminRoute />}>
          <Route path="dashboard" exact element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
