import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../components/Layout";

function AdminApplications() {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetch(`/api/admin/job/${jobId}/applications`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setApplications(data));
  }, [jobId]);

  const shortlist = async (applicationId) => {
    await fetch(`/api/admin/application/${applicationId}/shortlist`, {
      method: "POST",
      credentials: "include",
    });
    setApplications((prev) =>
      prev.map((a) =>
        a.application_id === applicationId
          ? { ...a, status: "shortlisted" }
          : a
      )
    );
  };

  return (
    <Layout>
      <h2>Applications</h2>

      {applications.map((app) => (
        <div key={app.application_id} className="card">
          <p>Name: {app.candidate_name}</p>
          <p>Email: {app.email}</p>
          <p>Status: {app.status}</p>

          {app.status !== "shortlisted" && (
            <button onClick={() => shortlist(app.application_id)}>
              Shortlist
            </button>
          )}
        </div>
      ))}
    </Layout>
  );
}

export default AdminApplications;
