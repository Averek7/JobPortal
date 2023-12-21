// src/components/Home.js
import React, { useEffect, useState } from "react";
import JobListing from "./JobListing";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import firebaseApp from "../firebase"; // Adjust this import based on your project structure

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (!user) {
        // Redirect to login if the user is not logged in
        navigate("/login");
      }
      navigate("/");
    });
    return () => unsubscribe();
  }, [navigate]);

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore(firebaseApp);
      const snapshot = await getDocs(collection(db, "jobs"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setJobs(data);
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login"); // Redirect to login after logout
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleToggleJobCreation = () => {
    navigate("/create-job"); // Redirect to create job page
  };

  return (
    <div className="home-container">
      <div className="home-info">
        <div className="home-header">
          <h1>Welcome to the Job Portal</h1>
        </div>
        <div className="user-info">
          {user && <p className="user">Welcome, {user.email}!</p>}
          <button className="logout-button" onClick={handleToggleJobCreation}>
            Create Jobs
          </button>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      <div className="job-listings">
        {jobs.map((job) => (
          <JobListing key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default Home;
