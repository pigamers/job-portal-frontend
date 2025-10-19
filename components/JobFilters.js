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
      p="md"
      radius="md"
      style={{
        width: "100%",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        border: "none",
      }}
    >
      <Group
        spacing={{ base: "lg", sm: "md" }}
        align="flex-start"
        style={{
          flexDirection: { base: "column", md: "row" },
          gap: "20px",
        }}
      >
        <TextInput
          styles={inputStyles}
          style={{ flex: 1, width: "100%" }}
          placeholder="Search by Job Title"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.currentTarget.value)}
          leftSection={<Search size={18} />}
          leftSectionWidth={40}
        />

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
          style={{ flex: 1, width: "100%" }}
          placeholder="Preferred Location"
          value={location}
          onChange={setLocation}
          data={locations}
          clearable
          searchable
          leftSection={<MapPin size={18} />}
          leftSectionWidth={40}
        />

        <Select
          styles={inputStyles}
          style={{ flex: 1, width: "100%" }}
          placeholder="Select Job Type"
          data={["Full-time", "Part-time", "Contract", "Internship", "Remote"]}
          value={jobType}
          onChange={setJobType}
          clearable
          leftSection={<Briefcase size={18} />}
          leftSectionWidth={40}
        />

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
            <span>Salary Per Month</span>
            <span>
              ₹{salaryRange[0]}K - ₹{salaryRange[1]}K
            </span>
          </div>
          <RangeSlider
            min={0}
            max={50}
            step={1}
            value={salaryRange}
            onChange={setSalaryRange}
            marks={[{ value: 0 }, { value: 50 }]}
            styles={{
              track: { backgroundColor: "#E9ECEF" },
              bar: { backgroundColor: "#000" },
              thumb: {
                backgroundColor: "#fff",
                borderColor: "#000",
                borderWidth: "4px",
                borderStyle: "solid",
              },
              mark: { backgroundColor: "#000" },
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
