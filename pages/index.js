import { Container, SimpleGrid, Center, Loader, Text } from "@mantine/core";
import JobCard from "@/components/JobCard";
import JobFilters from "@/components/JobFilters";
import { useState, useEffect } from "react";
import { useJobs } from "../context/JobProvider";

export default function Home() {
  const { jobs, setJobs } = useJobs();
  const [searchTitle, setSearchTitle] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [salaryRange, setSalaryRange] = useState([0, 50]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);

        
        // Use absolute URL in production
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api/jobs';
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        

        
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch jobs');
        }
    
        setJobs(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Frontend Error:", error);
        setError(error.message);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobs();
  }, [setJobs]);

  const filteredJobs = jobs?.filter((job) => {
    if (!job) return false;
    
    // Extract salary number from salaryRange string
    const salaryMatch = job.salaryRange?.match(/\d+/);
    let salary = 0;
    if (salaryMatch) {
      const firstNumber = Number(salaryMatch[0]);
      // If number is > 1000, assume it's in full amount, divide by 100000 for LPA
      // If number is < 1000, assume it's already in thousands, divide by 10
      salary = firstNumber > 1000 ? firstNumber / 100000 : firstNumber / 10;
    }
    
    const matches = (
      job.title?.toLowerCase().includes(searchTitle?.toLowerCase() || "") &&
      job.location?.toLowerCase().includes(location?.toLowerCase() || "") &&
      (!jobType || job.jobType === jobType) &&
      salary >= salaryRange[0] &&
      salary <= salaryRange[1]
    );
    
    return matches;
  }) || [];

  if (loading) {
    return (
      <Center style={{ height: "100vh" }}>
        <div style={{ textAlign: "center" }}>
          <Loader size="lg" variant="bars" color="#228BE6" />
          <Text size="sm" mt="sm" fw={500} c="dimmed">
            Loading jobs...
          </Text>
        </div>
      </Center>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container
      size="100%"
      py="xl"
      style={{ maxWidth: "none", padding: "10px" }}
    >
      <JobFilters
        searchTitle={searchTitle}
        setSearchTitle={setSearchTitle}
        location={location}
        setLocation={setLocation}
        jobType={jobType}
        setJobType={setJobType}
        salaryRange={salaryRange}
        setSalaryRange={setSalaryRange}
      />

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg" mt="xl">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          <div
            style={{
              width: "100%",
              textAlign: "center",
              gridColumn: "1 / -1",
              color: "#FF4444",
              fontSize: "18px",
              fontWeight: "500",
              padding: "40px 0",
            }}
          >
            No jobs found 😕
          </div>
        )}
      </SimpleGrid>
    </Container>
  );
}
