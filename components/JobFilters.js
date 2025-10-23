import { TextInput, Select, RangeSlider, Group, Paper } from "@mantine/core";
import { Search, MapPin, Briefcase } from "lucide-react";

export default function JobFilters({
  searchTitle,
  setSearchTitle,
  location,
  setLocation,
  jobType,
  setJobType,
  salaryRange,
  setSalaryRange,
}) {
  const inputStyles = {
    input: {
      border: "none",
      boxShadow: "none",
      "&:focus": {
        outline: "none",
        border: "none",
        boxShadow: "none",
      },
    },
  };

  const locations = [
    "Chennai",
    "Bangalore",
    "Hyderabad",
    "Mumbai",
    "Delhi",
    "Pune",
    "Kolkata",
    "Remote",
  ];

  return (
    <Paper
      p="lg"
      style={{
        borderBottom: "2px solid #E9ECEF",
        marginTop: "20px"
      }}
    >
      <Group
        spacing={{ base: "lg", sm: "md" }}
        align="center"
        style={{
          flexDirection: { base: "column", md: "row" },
          gap: "20px",
        }}
      >
        <TextInput
          styles={inputStyles}
          size="lg"
          style={{ flex: 1, width: "100%" }}
          placeholder="Search by Job Title"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.currentTarget.value)}
          leftSection={<img src="/searchicon.png" width={18} height={18} alt="Search" />}
          leftSectionWidth={40}
        />

        <div style={{ width: "1px", height: "40px", backgroundColor: "#E9ECEF", alignSelf: "center" }} />

        <Select
          styles={{
            ...inputStyles,
            rightSection: {
              pointerEvents: "none",
              svg: {
                transform: "rotate(0deg) !important",
              },
            },
          }}
          size="lg"
          style={{ flex: 1, width: "100%" }}
          placeholder="Preferred Location"
          value={location}
          onChange={setLocation}
          data={locations}
          clearable
          searchable
          leftSection={<img src="/locicon.png" width={18} height={22} alt="Location" />}
          leftSectionWidth={40}
        />

        <div style={{ width: "1px", height: "40px", backgroundColor: "#E9ECEF", alignSelf: "center" }} />

        <Select
          styles={inputStyles}
          size="lg"
          style={{ flex: 1, width: "100%" }}
          placeholder="Select Job Type"
          data={["Full-time", "Part-time", "Contract", "Internship", "Remote"]}
          value={jobType}
          onChange={setJobType}
          clearable
          leftSection={<img src="/jobtypeicon.png" width={22} height={18} alt="Job Type" />}
          leftSectionWidth={40}
        />

        <div style={{ width: "1px", height: "40px", backgroundColor: "#E9ECEF", alignSelf: "center" }} />

        <div style={{ flex: 1, width: "100%" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
              color: "#555",
              fontWeight: "500",
            }}
          >
            <span style={{
              fontWeight: "bold"
            }}>Salary Per Month</span>
            <span>
              ₹{salaryRange[0]}K - ₹{salaryRange[1]}K
            </span>
          </div>
          <RangeSlider
            min={50}
            max={150}
            step={10}
            value={salaryRange}
            onChange={setSalaryRange}
            styles={{
              track: { backgroundColor: "#E9ECEF", height: "2px" },
              bar: { backgroundColor: "#000", height: "2px" },
              thumb: {
                backgroundColor: "#fff",
                borderColor: "#000",
                borderWidth: "4px",
                borderStyle: "solid",
              },
              mark: { backgroundColor: "#000",
                marginBottom: "10px"
               },
              markLabel: { color: "#000" },
              label: { display: "none" },
            }}
            label={null}
          />
        </div>
      </Group>
    </Paper>
  );
}
