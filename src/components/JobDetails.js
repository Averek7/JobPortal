// src/components/JobDetails.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import firebaseApp, { auth } from "../firebase";
import { getFirestore } from "firebase/firestore";
import "./JobDetails.css";

const JobDetails = () => {
  const { jobId } = useParams();
  const [jobDetails, setJobDetails] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const db = getFirestore(firebaseApp);
        const jobDoc = await db.collection("jobs").doc(jobId).get();
        const jobData = jobDoc.data();

        // Check if the user is logged in before displaying job details
        if (auth.currentUser && jobData) {
          setJobDetails(jobData);
        } else {
          console.error("User not logged in or job not found.");
        }
      } catch (error) {
        console.error("Error fetching job details:", error.message);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  if (!jobDetails) {
    return <p>Loading...</p>;
  }

  const { title, description, requirements } = jobDetails;

  return (
    <div className="job-details-container">
      <h2>{title}</h2>
      <p>{description}</p>
      <p>Requirements: {requirements}</p>
    </div>
  );
};

export default JobDetails;
