import { useEffect, useState } from "react";
import Layout from "../../components/Layout";

function AdminDashboard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("/api/admin/dashboard", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, []);

  return (
    <Layout>
      <h2>Admin Dashboard</h2>

      <div className="job-list">
        {jobs.map((job) => (
          <div key={job.id} className="job-card">
            <h4>{job.title}</h4>
            <p>Department: {job.department}</p>
            <p>Status: {job.status}</p>
            <p>Vacancies: {job.vacancies}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default AdminDashboard;
