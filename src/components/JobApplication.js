// src/components/JobApplication.js
import React, { useState } from 'react';
import './JobApplication.css'; 

const JobApplication = () => {
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicationText, setApplicationText] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleJobApplication = async () => {
    setSuccessMessage('Application submitted successfully!');
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
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default JobApplication;
