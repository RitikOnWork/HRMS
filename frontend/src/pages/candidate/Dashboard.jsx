import { useEffect, useState } from "react";
import Layout from "../../components/Layout";

function CandidateDashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/candidate/dashboard", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setUser(data.user));
  }, []);

  return (
    <Layout>
      <h2>Candidate Dashboard</h2>

      {user && (
        <div className="card">
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
    </Layout>
  );
}

export default CandidateDashboard;
