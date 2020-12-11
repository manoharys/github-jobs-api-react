import React, { useState } from "react";
import useFetchJobs from "./useFetchJobs";
import { Container } from "react-bootstrap";
import Job from "./component/Job";

function App() {
  

  const { jobs, loading, error } = useFetchJobs();
  return (
    <div>
      <center className="m-0">
        <h1 className="mb-5" style={{ background: "#2B7FC3" }}>
          <span
            style={{ fontWeight: "bold", fontSize: "35px", color: "white" }}
          >
            GitHub
          </span>{" "}
          Jobs
        </h1>
      </center>

      <Container>
        {loading && <h1>Loading...</h1>}
        {error && <h1>Error. Try refresing it..</h1>}
        <h1>
          {jobs.map((job) => (
            <Job job={job} key={job.id} />
          ))}
        </h1>
      </Container>
    </div>
  );
}

export default App;
