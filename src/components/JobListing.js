import React from 'react';
import './JobListing.css';

const JobListing = ({ job }) => {
  const { title, description, requirements } = job;

  return (
    <div className="job-listing">
      <div className="job-title">{title}</div>
      <div className="job-description">{description}</div>
      <div className="job-requirements">{requirements}</div>
    </div>
  );
};


export default JobListing;
