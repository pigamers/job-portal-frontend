# 🚀 CyberMinds Job Portal - Frontend

A modern, responsive job portal built with Next.js and Mantine UI, designed to provide an exceptional user experience for job seekers and employers.

## ✨ Features

### 🎯 Core Functionality
- **Job Listings**: Browse and search through available job opportunities
- **Advanced Filtering**: Filter jobs by title, location, job type, and salary range
- **Job Creation**: Post new job openings with comprehensive details
- **Draft Management**: Save job drafts and resume editing later
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 🎨 User Interface
- **Modern Design**: Clean, professional interface with Mantine components
- **Company Branding**: Dynamic logos for major companies (Tesla, Amazon, Swiggy)
- **Interactive Cards**: Consistent job card layout with fixed heights
- **Mobile Navigation**: Collapsible sidebar for mobile users
- **Real-time Updates**: Live job posting and filtering

### 🔧 Technical Features
- **Form Validation**: Comprehensive form handling with React Hook Form
- **State Management**: Context API for global job state
- **Local Storage**: Draft saving functionality
- **Image Optimization**: Next.js Image component for performance
- **TypeScript Ready**: Structured for easy TypeScript migration

## 🛠️ Tech Stack

- **Framework**: Next.js 15.3.1
- **UI Library**: Mantine v7.17.4
- **React**: v19.0.0
- **Form Handling**: React Hook Form v7.56.1
- **Icons**: Lucide React v0.503.0 & Tabler Icons v3.31.0
- **HTTP Client**: Axios v1.8.4
- **Date Handling**: Day.js v1.11.18
- **Styling**: CSS Modules + Mantine Styles

## 📁 Project Structure

```
frontend/
├── components/           # Reusable UI components
│   ├── Header.js        # Navigation with mobile sidebar
│   ├── JobCard.js       # Individual job display card
│   └── JobFilters.js    # Search and filter controls
├── context/
│   └── JobProvider.js   # Global state management
├── lib/
│   └── db.js           # Database connection (legacy)
├── pages/
│   ├── api/            # API routes (legacy)
│   ├── _app.js         # App wrapper with providers
│   ├── CreateJob.js    # Job creation form
│   └── index.js        # Main homepage
├── public/             # Static assets
│   ├── cyberminds.png  # Company logo
│   ├── explogo.png     # Experience icon
│   ├── salaryicon.png  # Salary icon
│   └── calendericon.png # Calendar icon
└── styles/             # Global styles
    ├── globals.css
    └── Home.module.css
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL database (for backend connection)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL=postgresql://postgres:password@localhost:5432/job_management
   NEXT_PUBLIC_API_URL=http://localhost:3001/jobs
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Key Components

### JobCard Component
- **Fixed Height**: 400px for consistent layout
- **Company Logos**: Dynamic logo display for major companies
- **Experience Calculation**: Auto-calculated from salary range
- **Responsive Design**: Adapts to different screen sizes

### JobFilters Component
- **Real-time Filtering**: Instant job filtering as you type
- **Salary Range Slider**: Visual salary range selection
- **Location Search**: Searchable location dropdown
- **Job Type Filter**: Filter by employment type

### CreateJob Component
- **Multi-step Form**: Comprehensive job creation form
- **Draft Saving**: Save progress and resume later
- **Form Validation**: Client-side validation with error handling
- **Date Picker**: Calendar integration for deadlines

## 🌐 API Integration

The frontend connects to a NestJS backend running on port 3001:

- **GET /jobs** - Fetch all jobs
- **POST /jobs** - Create new job
- **Environment Variable**: `NEXT_PUBLIC_API_URL`

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: 
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px
- **Navigation**: Collapsible sidebar for mobile

## 🎯 Features in Detail

### Job Filtering
- **Title Search**: Real-time search by job title
- **Location Filter**: Filter by city/location
- **Job Type**: Full-time, Part-time, Contract, Internship
- **Salary Range**: Visual slider for salary filtering (0-50 LPA)

### Company Logos
Supported companies with custom logos:
- Tesla, Amazon, Swiggy
- Fallback: Building icon for other companies

### Draft Management
- **Auto-save**: Drafts saved to localStorage
- **Auto-restore**: Form data restored on reopening
- **Clear on Submit**: Drafts cleared after successful job posting

## 🔒 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | - |
| `NEXT_PUBLIC_API_URL` | Backend API endpoint | `/api/jobs` |

## 🚀 Deployment

### Production Build
```bash
npm run build
npm run start
```

### Environment Setup
- Set production environment variables
- Configure database connection
- Update API URLs for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Built with ❤️ by the CyberMinds Team**