// src/components/JobCreation.js
import React, { useState } from 'react';
import { auth } from '../firebase';
import db from '../firebase'; 
import './JobCreation.css'; 

const JobCreation = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobRequirements, setJobRequirements] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleJobCreation = async () => {
    try {
      await db.collection('jobs').add({
        title: jobTitle,
        description: jobDescription,
        requirements: jobRequirements,
        createdBy: auth.currentUser.uid,
      });

      setSuccessMessage('Job listing created successfully!');
    } catch (error) {
      console.error('Error creating job listing:', error.message);
    }
  };

  return (
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
        value={jobRequirements}
        onChange={(e) => setJobRequirements(e.target.value)}
      />
      <button onClick={handleJobCreation}>Create Job Listing</button>
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default JobCreation;
