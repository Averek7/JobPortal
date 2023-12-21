import React from "react";
import "./JobListing.css";

const JobListing = ({ job }) => {
  const { title, description, requirement } = job;

  return (
    <>
      <div className="job-listing">
        <div className="job-title">{title}</div>
        <div className="job-description">{description}</div>
        <div className="job-requirements">{requirement}</div>
        <button className="job-button">Apply</button>
      </div>
    </>
  );
};

export default JobListing;
