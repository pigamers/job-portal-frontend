import { Card, Text, Badge, Button, Group, Image } from "@mantine/core";
import { Clock, Building2, Banknote, Building } from "lucide-react";

const JobCard = ({ job }) => {
  const getCompanyLogo = (companyName) => {
    if (!companyName) return "";
    const normalizedName = companyName.toLowerCase().trim();

    switch (normalizedName) {
      case "tesla":
        return "/teslalogo.png";
      case "amazon":
        return "/amazonlogo.png";
      case "swiggy":
        return "/swiggylogo.png";
      default:
        return "";
    }
  };

  const formatSalaryToLPA = (salary) => {
    const salaryStr = String(salary);
    const salaryNum = Number(salaryStr.replace(/[^0-9]/g, ""));
    const lpa = (salaryNum / 100000).toFixed(1);
    return `${lpa} LPA`;
  };

  const getDaysAgo = (postedDate) => {
    const posted = new Date(postedDate);
    const today = new Date();

    const isNow =
      posted.getFullYear() === today.getFullYear() &&
      posted.getMonth() === today.getMonth() &&
      posted.getDate() === today.getDate() &&
      posted.getHours() === today.getHours();

    if (isNow) return "Just now";

    const diffTime = Math.abs(today - posted);
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));

    if (diffHours < 1) return "Less than an hour ago";
    if (diffHours === 1) return "1 hour ago";
    if (diffHours < 24) return `${diffHours} hours ago`;

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;

    const diffWeeks = Math.floor(diffDays / 7);
    if (diffWeeks === 1) return "1 week ago";
    if (diffWeeks < 4) return `${diffWeeks} weeks ago`;

    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths === 1) return "1 month ago";
    return `${diffMonths} months ago`;
  };

  const getExperienceLevel = (salaryRange) => {
    const salaryMatch = salaryRange?.match(/\d+/);
    let salaryLPA = 0;
    if (salaryMatch) {
      const firstNumber = Number(salaryMatch[0]);
      salaryLPA = firstNumber > 1000 ? firstNumber / 100000 : firstNumber / 10;
    }

    if (salaryLPA < 10) return "0-1 yr Exp";
    if (salaryLPA >= 10 && salaryLPA <= 15) return "1-3 yr Exp";
    return "8+ yr Exp";
  };

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{ 
        minWidth: 200, 
        height: "400px", 
        display: "flex", 
        flexDirection: "column" 
      }}
    >
      <Group
        position="apart"
        mb="xs"
        style={{ justifyContent: "space-between" }}
      >
        {getCompanyLogo(job.company) ? (
          <Image
            src={getCompanyLogo(job.company)}
            width={83}
            height={82}
            alt={job.company}
          />
        ) : (
          <Building size={50} color="#868E96" />
        )}
        <Badge
          variant="filled"
          styles={{
            root: {
              marginLeft: "auto",
              backgroundColor: "#B0D9FF",
              color: "#000000",
              fontWeight: "700",
              padding: "7px 10px",
            }
          }}
        >
          {getDaysAgo(job.createdAt)}
        </Badge>
      </Group>

      <Text size="xl" fw={600} mt="sm" style={{ color: "#494747" }}>
        {job.title}
      </Text>

      <Group spacing="lg" mt="sm" mb="md">
        <Group spacing={6} style={{ gap: "5px" }}>
          <Image src="/explogo.png" width={14} height={14} alt="Experience" />
          <Text size="sm" c="dimmed">
            {getExperienceLevel(job.salaryRange)}
          </Text>
        </Group>

        <Group spacing={6} style={{ gap: "5px" }}>
          <Image src="/jobtypelogo.png" width={14} height={14} alt="Job type" />
          <Text size="sm" c="dimmed">
            {job.jobType}
          </Text>
        </Group>

        <Group spacing={6} style={{ gap: "5px" }}>
          <Image src="/lpalogo.png" width={14} height={14} alt="Salary" />
          <Text size="sm" c="dimmed">
            {(() => {
              const numbers = job.salaryRange?.match(/\d+/g) || [];
              if (numbers.length >= 2) {
                const maxSalary = Math.max(...numbers.map(Number));
                const lpa = maxSalary > 1000 ? maxSalary / 100000 : maxSalary / 10;
                return `${Math.round(lpa)} LPA`;
              }
              return job.salaryRange;
            })()}
          </Text>
        </Group>
      </Group>

      <div style={{ flex: 1, overflow: "hidden", marginTop: "8px" }}>
        {/* All content as bullet points */}
        {[
          ...(job.description ? job.description.split(".").filter(Boolean) : []),
          ...(job.requirements ? job.requirements.split(".").filter(Boolean) : []),
          ...(job.responsibilities ? job.responsibilities.split(".").filter(Boolean) : [])
        ].slice(0, 4).map((point, index) => (
          <Text
            key={index}
            size="sm"
            color="dimmed"
            style={{
              display: "flex",
              alignItems: "flex-start",
              marginBottom: "4px",
              fontWeight: "500",
            }}
          >
            <span
              style={{
                marginRight: "8px",
                marginTop: "6px",
                minWidth: "4px",
                height: "4px",
                backgroundColor: "#868E96",
                borderRadius: "50%",
                display: "inline-block",
              }}
            />
            {point.trim()}
          </Text>
        ))}
      </div>

      <Button 
        variant="filled" 
        fullWidth 
        radius="md" 
        color="blue"
        style={{ marginTop: "auto" }}
      >
        Apply Now
      </Button>
    </Card>
  );
};

export default JobCard;
