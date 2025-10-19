import {
  TextInput,
  Select,
  Textarea,
  Button,
  Title,
  Paper,
  Grid,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "react-hook-form";
import { IconDeviceFloppy, IconSend } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { useJobs } from "../context/JobProvider";
import { useState, useEffect } from "react";

export default function CreateJob({ onClose }) {
  const { addJob } = useJobs();
  const [deadline, setDeadline] = useState(null);
  const { register, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: {
      title: "",
      company: "",
      location: "",
      type: "",
      salaryFrom: "",
      salaryTo: "",
      description: "",
      requirements: "",
      responsibilities: "",
    },
  });

  // Load draft data on component mount
  useEffect(() => {
    try {
      const savedDraft = localStorage.getItem('jobDraft');
      if (savedDraft) {
        const draftData = JSON.parse(savedDraft);
        
        // Set form values
        setValue('title', draftData.title || '');
        setValue('company', draftData.company || '');
        setValue('location', draftData.location || '');
        setValue('type', draftData.type || '');
        setValue('salaryFrom', draftData.salaryFrom || '');
        setValue('salaryTo', draftData.salaryTo || '');
        setValue('description', draftData.description || '');
        setValue('requirements', draftData.requirements || '');
        setValue('responsibilities', draftData.responsibilities || '');
        
        // Set deadline
        if (draftData.deadline) {
          setDeadline(new Date(draftData.deadline));
        }
      }
    } catch (error) {
      console.error('Error loading draft:', error);
    }
  }, [setValue]);

  const locationOptions = [
    "Chennai",
    "Bangalore",
    "Hyderabad",
    "Mumbai",
    "Delhi",
    "Pune",
    "Kolkata",
    "Remote",
  ];

  const jobTypes = [
    "Full-time",
    "Part-time",
    "Contract",
    "Internship",
    "Remote",
  ];

  const onSubmit = async (data) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api/jobs';
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.title,
          company: data.company,
          location: data.location,
          jobType: data.type,
          salaryRange: `${data.salaryFrom} - ${data.salaryTo}`,
          description: data.description,
          requirements: data.requirements || "Requirements to be added",
          responsibilities: data.responsibilities || "Responsibilities to be added", 
          applicationDeadline: deadline?.toISOString() || new Date().toISOString()
        }),
      });

      const result = await response.json();

      if (response.ok) {
        addJob(result);

        notifications.show({
          title: "Success",
          message: "Job posted successfully!",
          color: "green",
          position: "bottom-left",
          autoClose: 5000,
          styles: (theme) => ({
            root: {
              zIndex: 99999,
              transition: "transform 400ms ease",
            },
          }),
        });

        // Clear draft after successful submission
        localStorage.removeItem('jobDraft');
        reset();
        onClose();
        // Refresh the page to show new job
        window.location.reload();
      } else {
        notifications.show({
          title: "Error",
          message: result.error || "Failed to post job",
          color: "red",
          position: "bottom-left",
          autoClose: 5000,
          transition: "slide-up",
          transitionDuration: 400,
          zIndex: 99999,
        });
      }
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Something went wrong while posting the job",
        color: "red",
        position: "bottom-left",
        autoClose: 5000,
        transition: "slide-up",
        transitionDuration: 400,
        zIndex: 99999,
      });
    }
  };

  const onDraftSave = (data) => {
    try {
      // Save draft to localStorage
      const draftData = {
        ...data,
        deadline: deadline,
        savedAt: new Date().toISOString()
      };
      localStorage.setItem('jobDraft', JSON.stringify(draftData));
      
      notifications.show({
        title: "Success",
        message: "Draft saved successfully!",
        color: "green",
        position: "bottom-left",
        autoClose: 5000,
        transition: "slide-up",
        transitionDuration: 400,
        zIndex: 99999,
      });

      onClose();
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Failed to save draft",
        color: "red",
        position: "bottom-left",
        autoClose: 5000,
        transition: "slide-up",
        transitionDuration: 400,
        zIndex: 99999,
      });
    }
  };

  return (
    <Paper radius="md" p="lg" style={{ maxWidth: "900px", margin: "0 auto" }}>
      <Title
        order={3}
        align="center"
        mb="xl"
        size="h3"
        style={{ color: "#494747" }}
      >
        Create Job Opening
      </Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid>
          <Grid.Col span={6}>
            <TextInput
              size="xs"
              label="Job Title"
              styles={{
                label: { fontSize: "1rem", fontWeight: 500, color: "#494747" },
              }}
              placeholder="Enter job title"
              {...register("title")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              size="xs"
              label="Company Name"
              styles={{
                label: { fontSize: "1rem", fontWeight: 500, color: "#494747" },
              }}
              placeholder="Amazon, Google, Swiggy"
              {...register("company")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Select
              size="xs"
              label="Location"
              styles={{
                label: { fontSize: "1rem", fontWeight: 500, color: "#494747" },
                dropdown: { zIndex: 99999 },
              }}
              placeholder="Choose preferred location"
              data={locationOptions.map((loc) => ({ value: loc, label: loc }))}
              searchable
              value={watch("location")}
              onChange={(value) => setValue("location", value)}
              comboboxProps={{ withinPortal: true }}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Select
              size="xs"
              label="Job Type"
              styles={{
                label: { fontSize: "1rem", fontWeight: 500, color: "#494747" },
                dropdown: { zIndex: 99999 },
              }}
              placeholder="Full-time"
              data={jobTypes.map((type) => ({ value: type, label: type }))}
              value={watch("type")}
              onChange={(value) => setValue("type", value)}
              comboboxProps={{ withinPortal: true }}
            />
          </Grid.Col>
          <Grid.Col span={3}>
            <TextInput
              size="xs"
              label="Salary Range"
              leftSection={<img src="/salaryicon.png" width={14} height={14} alt="Salary" />}
              styles={{
                label: { fontSize: "1rem", fontWeight: 500, color: "#494747" },
                input: {
                  "&::placeholder": {
                    color: "#757575",
                  },
                },
              }}
              placeholder="0"
              {...register("salaryFrom")}
            />
          </Grid.Col>
          <Grid.Col span={3}>
            <div style={{ paddingTop: "1.65rem" }}>
              <TextInput
                size="xs"
                leftSection={<img src="/salaryicon.png" width={14} height={14} alt="Salary" />}
                styles={{
                  input: {
                    "::placeholder": { color: "#757575" },
                  },
                }}
                placeholder="₹ 12,00,000"
                {...register("salaryTo")}
              />
            </div>
          </Grid.Col>
          <Grid.Col span={6}>
            <DateInput
              value={deadline}
              onChange={setDeadline}
              label="Application Deadline"
              placeholder="Select deadline"
              rightSection={<img src="/calendericon.png" width={14} height={14} alt="Deadline" />}
              size="xs"
              styles={{
                label: { fontSize: "1rem", fontWeight: 500, color: "#494747" },
              }}
              popoverProps={{
                withinPortal: false,
                zIndex: 99999,
              }}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Textarea
              size="xs"
              label="Job Description"
              styles={{
                label: { fontSize: "1rem", fontWeight: 500, color: "#494747" },
              }}
              placeholder="Please Share a description to let the candidates know about the job role"
              rows={3}
              style={{ width: "100%" }}
              value={watch("description")}
              onChange={(e) => setValue("description", e.currentTarget.value)}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Textarea
              size="xs"
              label="Requirements"
              styles={{
                label: { fontSize: "1rem", fontWeight: 500, color: "#494747" },
              }}
              placeholder="List the job requirements"
              rows={3}
              style={{ width: "100%" }}
              value={watch("requirements")}
              onChange={(e) => setValue("requirements", e.currentTarget.value)}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Textarea
              size="xs"
              label="Responsibilities"
              styles={{
                label: { fontSize: "1rem", fontWeight: 500, color: "#494747" },
              }}
              placeholder="List the job responsibilities"
              rows={3}
              style={{ width: "100%" }}
              value={watch("responsibilities")}
              onChange={(e) => setValue("responsibilities", e.currentTarget.value)}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "1rem",
              }}
            >
              <Button
                size="md"
                variant="outline"
                onClick={handleSubmit(onDraftSave)}
                rightSection={<img src="/bottomicon.png" width={10} height={10} alt="Draft" />}
                color="black"
              >
                Save Draft
              </Button>
              <Button
                size="md"
                type="submit"
                rightSection={<img src="/bottomicon.png" width={14} height={14} alt="Publish" style={{ 
                  transform: "rotate(-90deg)",
                  filter: "brightness(0) invert(1)"
                }} />}
                color="#00AAFF"
              >
                Publish Job
              </Button>
            </div>
          </Grid.Col>
        </Grid>
      </form>
    </Paper>
  );
}
