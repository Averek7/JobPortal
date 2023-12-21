// src/components/JobApplication.js
import React, { useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';

import firebaseApp from "../firebase";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import "./JobApplication.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const JobApplication = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicationText, setApplicationText] = useState("");

  const handleJobApplication = async () => {
    try {
      const db = getFirestore(firebaseApp);
      const applicationsRef = await addDoc(collection(db, "applications"), {
        jobId: jobId,
        name: applicantName,
        email: applicantEmail,
        applicationText: applicationText,
      });
      
      setApplicantName("");
      setApplicantEmail("");
      setApplicationText("");
      navigate('/')
      toast.success(`Application submitted successfully! with ID ${applicationsRef.id}`);
    } catch (error) {
      toast.error(`Failed to submit application. Please try again, ${error.message}`);
    }
  };

  return (
    <div className="job-application-container">
      <h2>Apply for the Job</h2>
      <input
        type="text"
        placeholder="Your Name"
        value={applicantName}
        onChange={(e) => setApplicantName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Your Email"
        value={applicantEmail}
        onChange={(e) => setApplicantEmail(e.target.value)}
      />
      <textarea
        placeholder="Your Application Text"
        value={applicationText}
        onChange={(e) => setApplicationText(e.target.value)}
      />
      <button onClick={handleJobApplication}>Submit Application</button>
    </div>
  );
};

export default JobApplication;
