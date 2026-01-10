import { useEffect, useState } from "react";
import Layout from "../../components/Layout";

function CandidateJobs() {
  const [jobs, setJobs] = useState([]);
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("");

  const fetchJobs = () => {
    const params = new URLSearchParams();
    if (department) params.append("department", department);
    if (location) params.append("location", location);

    fetch(`/api/candidate/jobs?${params.toString()}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setJobs(data));
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <Layout>
      <h2>Available Jobs</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <button onClick={fetchJobs}>Filter</button>
      </div>

      <div className="job-list">
        {jobs.map((job) => (
          <div key={job.id} className="job-card">
            <h4>{job.title}</h4>
            <p>Department: {job.department}</p>
            <p>Location: {job.location}</p>
            <p>Vacancies: {job.vacancies}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default CandidateJobs;
