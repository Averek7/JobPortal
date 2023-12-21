import React, { useState } from "react";
import firebaseApp, { auth } from "../firebase";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./JobCreation.css";
import { useNavigate } from "react-router-dom";

const JobCreation = () => {
  const navigate = useNavigate();
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobRequirement, setJobRequirement] = useState("");

  const handleJobCreation = async () => {
    try {
      if (!jobTitle || !jobDescription || !jobRequirement) {
        toast.error("Please fill in all fields.");
        return;
      }
      const db = getFirestore(firebaseApp);
      const newJobRef = await addDoc(collection(db, "jobs"), {
        title: jobTitle,
        description: jobDescription,
        requirement: jobRequirement,
        createdBy: auth.currentUser.uid,
      });

      toast.success("Job listing created successfully!");
      console.log("New job ID:", newJobRef.id);

      setJobTitle("");
      setJobDescription("");
      setJobRequirement("");

      navigate("/"); // Redirect to home page
    } catch (error) {
      toast.error("Error creating job listing. Please try again.");
      console.error("Error creating job listing:", error.message);
    }
  };

  return (
    <div className="main-job-creation">
      <div className="job-creation-container">
        <h2>Create a Job Listing</h2>
        <input
          type="text"
          placeholder="Job Title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
        <textarea
          placeholder="Job Description"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Job Requirements"
          value={jobRequirement}
          onChange={(e) => setJobRequirement(e.target.value)}
        />
        <button className="job-button" onClick={handleJobCreation}>
          Create Job Listing
        </button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default JobCreation;
