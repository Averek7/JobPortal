import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import firebaseApp from '../firebase';
import './Application.css'; // Import the CSS file

const Application = () => {
  const [applicationsByJobId, setApplicationsByJobId] = useState({});

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const db = getFirestore(firebaseApp);
        const applicationsCollection = collection(db, 'applications');
        const querySnapshot = await getDocs(applicationsCollection);

        const applicationsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const organizedApplications = applicationsData.reduce((acc, application) => {
          const { jobId } = application;
          if (!acc[jobId]) {
            acc[jobId] = [];
          }
          acc[jobId].push(application);
          return acc;
        }, {});

        setApplicationsByJobId(organizedApplications);
      } catch (error) {
        console.error('Error fetching applications:', error.message);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="container">
      <h2>All Applications</h2>
      {Object.keys(applicationsByJobId).map((jobId) => (
        <div key={jobId} className="jobSection">
          <div className="jobHeader">Job ID: {jobId}</div>
          {applicationsByJobId[jobId].map((application) => (
            <div key={application.id} className="applicationItem">
              <p>
                <strong>Applicant Name:</strong> {application.name}<br />
                <strong>Email:</strong> {application.email}<br />
                <strong>Application Text:</strong> {application.applicationText}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Application;
