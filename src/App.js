import React, { useState } from "react";
import useFetchJobs from "./useFetchJobs";
import { Container } from "react-bootstrap";
import Job from "./component/Job";

function App() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);

  const { jobs, loading, error } = useFetchJobs(params, page);
  return (
    <Container>
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error. Try refresing it..</h1>}
      <h1>
        {jobs.map((job) => (
          <Job job={job} key={job.id} />
        ))}
      </h1>
    </Container>
  );
}

export default App;
