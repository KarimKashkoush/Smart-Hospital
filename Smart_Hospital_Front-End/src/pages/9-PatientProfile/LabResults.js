import React, { useState } from 'react';
import './patientprofile.css';

const LabResults = () => {
  const labResults = [
    {
      id: 1,
      testName: 'Complete Blood Count (CBC)',
      date: 'April 10, 2023',
      result: 'Normal',
      status: 'Completed',
      details: {
        hemoglobin: '13.5 g/dL',
        wbc: '7.2 x 10^3/μL',
        platelets: '250 x 10^3/μL'
      }
    },
    {
      id: 2,
      testName: 'Fasting Blood Sugar',
      date: 'March 5, 2023',
      result: '95 mg/dL',
      status: 'Completed',
      details: {
        glucose: '95 mg/dL',
        normalRange: '70-99 mg/dL'
      }
    },
    {
      id: 3,
      testName: 'Liver Function Tests',
      date: 'February 20, 2023',
      result: 'Normal',
      status: 'Completed',
      details: {
        ast: '25 U/L',
        alt: '30 U/L',
        alp: '85 U/L'
      }
    }
  ];

  const [expandedResult, setExpandedResult] = useState(null);

  const toggleResultDetails = (id) => {
    setExpandedResult(expandedResult === id ? null : id);
  };

  return (
    <div className="records-timeline">
      <h1 className="records-title">Lab Results</h1>
      <div className="timeline-container">
        {labResults.map((test) => (
          <div key={test.id} className="timeline-item">
            <div className="timeline-header">
              <div className="timeline-date">{test.date}</div>
              <div className="timeline-time">{test.testName}</div>
            </div>
            <div className="timeline-content">
              <div className="doctor-info">Result: {test.result}</div>
              <div className="patient-info">Status: {test.status}</div>
              
              <button 
                className="view-button"
                onClick={() => toggleResultDetails(test.id)}
              >
                {expandedResult === test.id ? 'Hide Details' : 'View Details'}
              </button>
              
              {expandedResult === test.id && (
                <div className="record-details">
                  <h4>Detailed Results:</h4>
                  <ul>
                    {Object.entries(test.details).map(([key, value]) => (
                      <li key={key}>
                        <strong>{key}:</strong> {value}
                      </li>
                    ))}
                  </ul>
                  <button className="download-button">
                    Download Results as PDF
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LabResults;