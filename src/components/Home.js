import React, { useEffect, useState } from "react";
import JobListing from "./JobListing";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [user, setUser] = useState(null);
  // const [jobListings, setJobListings] = useState([]);
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

  const jobListings = [
    {
      id: 1,
      title: "Software Engineer",
      description: "Join our innovative software development team.",
      requirements: "Experience in React, Node.js, and MongoDB.",
    },
    {
      id: 2,
      title: "Data Scientist",
      description: "Exciting opportunity for data enthusiasts.",
      requirements: "Strong background in machine learning and data analysis.",
    },
  ];

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login"); // Redirect to login after logout
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className="home-container">
      <div className="home-info">
        <div className="home-header">
          <h1>Welcome to the Job Portal</h1>
        </div>
        <div className="user-info">
          {user && <p>Welcome, {user.email}!</p>}
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div className="job-listings">
        {jobListings.map((job) => (
          <JobListing key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default Home;
