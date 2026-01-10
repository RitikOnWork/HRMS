import { useEffect, useState } from "react";
import Layout from "../../components/Layout";

function CandidateApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetch("/api/candidate/applications", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setApplications(data));
  }, []);

  return (
    <Layout>
      <h2>My Applications</h2>

      <div className="job-list">
        {applications.map((app) => (
          <div key={app.application_id} className="job-card">
            <h4>{app.job_title}</h4>
            <p>Department: {app.department}</p>
            <p>Status: {app.status}</p>
            <p>Applied On: {app.applied_on}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default CandidateApplications;
