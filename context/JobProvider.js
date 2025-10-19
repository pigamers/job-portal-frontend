import { createContext, useContext, useState } from "react";

const JobContext = createContext();

export function JobProvider({ children }) {
  const [jobs, setJobs] = useState([]);

  const addJob = (newJob) => {
    setJobs((prevJobs) => [newJob, ...prevJobs]);
  };

  const value = {
    jobs,
    setJobs,
    addJob,
  };

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
}

export function useJobs() {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error("useJobs must be used within a JobProvider");
  }
  return context;
}
