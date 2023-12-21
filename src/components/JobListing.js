import React from "react";
import "./JobListing.css";
import { useNavigate } from "react-router-dom";


const JobListing = ({ job }) => {
  const { title, description, requirement } = job;
  const navigate = useNavigate()

  const handleApply = async () => {
    navigate(`/apply-job/${job.id}`)
  };

  return (
    <>
      <div className="job-listing">
        <div className="job-title">{title}</div>
        <div className="job-description">{description}</div>
        <div className="job-requirements">{requirement}</div>
        <button className="job-button" onClick={() => handleApply()}>
          Apply
        </button>
      </div>
    </>
  );
};

export default JobListing;
