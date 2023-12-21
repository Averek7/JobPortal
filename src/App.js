import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import { auth } from "./firebase";
import JobCreation from "./components/JobCreation";
import JobApplication from "./components/JobApplication";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route
          path="/create-job"
          element={user ? <JobCreation /> : <Navigate to="/login" />}
        />
        <Route path="/apply-job/:jobId" element={<JobApplication />} />
      </Routes>
    </Router>
  );
};

export default App;
