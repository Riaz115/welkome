// WELKOME Dashboard Data Variables

// Weekly Order Volume Chart Data (Line Chart)
export const welkomeOrderVolumeData = [
  {
    name: "Orders",
    data: [1200, 1850, 2300, 1950, 2800, 3200, 2900, 3500, 4100, 3800, 4500, 4200],
    color: "#4318FF",
  },
  {
    name: "Cancellations",
    data: [150, 200, 180, 220, 190, 240, 200, 180, 220, 190, 210, 200],
    color: "#39B8FF",
  },
];

export const welkomeOrderVolumeOptions = {
  chart: {
    type: "area",
    height: "100%",
    toolbar: {
      show: false,
    },
  },
  legend: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      style: {
        colors: "#A3AED0",
        fontSize: "12px",
        fontWeight: "500",
      },
    },
  },
  yaxis: {
    show: false,
  },
  grid: {
    show: false,
  },
  fill: {
    type: "gradient",
    gradient: {
      type: "vertical",
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.9,
      colorStops: [
        [
          {
            offset: 0,
            color: "#4318FF",
            opacity: 1,
          },
          {
            offset: 100,
            color: "rgba(67, 24, 255, 1)",
            opacity: 0.28,
          },
        ],
      ],
    },
  },
};

// Top Selling Categories Chart Data (Bar Chart)
export const welkomeTopCategoriesData = [
  {
    name: "Electronics",
    data: [400, 370, 330, 390, 320, 350, 360],
    color: "#4318FF",
  },
  {
    name: "Fashion",
    data: [300, 280, 320, 310, 280, 290, 300],
    color: "#39B8FF",
  },
  {
    name: "Home & Garden",
    data: [200, 230, 210, 240, 220, 250, 230],
    color: "#05CD99",
  },
];

export const welkomeTopCategoriesOptions = {
  chart: {
    type: "bar",
    height: "100%",
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "55%",
      endingShape: "rounded",
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ["transparent"],
  },
  xaxis: {
    categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      style: {
        colors: "#A3AED0",
        fontSize: "12px",
        fontWeight: "500",
      },
    },
  },
  yaxis: {
    show: false,
  },
  grid: {
    show: false,
  },
  legend: {
    show: true,
    position: "top",
    horizontalAlign: "right",
  },
};

// User Ratio Breakdown Chart Data (Pie Chart)
export const welkomeUserRatioData = [65, 28, 7];

export const welkomeUserRatioOptions = {
  labels: ["Customers", "Sellers", "Riders"],
  colors: ["#4318FF", "#39B8FF", "#FFA500"],
  chart: {
    width: "100%",
  },
  states: {
    hover: {
      filter: {
        type: "none",
      },
    },
  },
  legend: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    pie: {
      expandOnClick: false,
      donut: {
        labels: {
          show: false,
        },
      },
    },
  },
  fill: {
    colors: ["#4318FF", "#39B8FF", "#FFA500"],
  },
  tooltip: {
    enabled: true,
    theme: "dark",
    y: {
      formatter: function (val) {
        return Math.round(val) + "%";
      },
    },
  },
};

// Latest Orders Table Data (formatted for MostVisited component)
export const welkomeLatestOrdersData = [
  {
    pageName: "#ORD-8847",
    visitors: "Sarah Johnson",
    unique: "$284.50",
    clients: "Completed",
    bounceRate: "+15%",
  },
  {
    pageName: "#ORD-8846",
    visitors: "Michael Chen",
    unique: "$129.99",
    clients: "Processing",
    bounceRate: "+8%",
  },
  {
    pageName: "#ORD-8845",
    visitors: "Emma Williams",
    unique: "$456.75",
    clients: "Shipped",
    bounceRate: "+22%",
  },
  {
    pageName: "#ORD-8844",
    visitors: "David Brown",
    unique: "$89.99",
    clients: "Cancelled",
    bounceRate: "-5%",
  },
  {
    pageName: "#ORD-8843",
    visitors: "Lisa Taylor",
    unique: "$312.25",
    clients: "Completed",
    bounceRate: "+18%",
  },
  {
    pageName: "#ORD-8842",
    visitors: "James Wilson",
    unique: "$199.99",
    clients: "Processing",
    bounceRate: "+12%",
  },
];

// Verified Sellers Data
export const welkomeVerifiedSellersData = [
  {
    name: "TechGear Store",
    category: "Electronics",
    joinDate: "Jan 2024",
    rating: 4.8,
  },
  {
    name: "Fashion Hub",
    category: "Clothing",
    joinDate: "Feb 2024",
    rating: 4.6,
  },
  {
    name: "Home Essentials",
    category: "Home & Garden",
    joinDate: "Mar 2024",
    rating: 4.9,
  },
  {
    name: "Book Corner",
    category: "Books",
    joinDate: "Jan 2024",
    rating: 4.7,
  },
  {
    name: "Sports World",
    category: "Sports",
    joinDate: "Feb 2024",
    rating: 4.5,
  },
];

// Support Tickets Data
export const welkomeSupportTicketsData = [
  {
    id: "TKT-001",
    subject: "Payment Gateway Issue",
    priority: "High",
    platform: "WalletPro",
  },
  {
    id: "TKT-002",
    subject: "Seller Account Verification",
    priority: "Medium",
    platform: "MarketSphere",
  },
  {
    id: "TKT-003",
    subject: "Tutor Profile Setup Help",
    priority: "Low",
    platform: "EduMatch",
  },
  {
    id: "TKT-004",
    subject: "Job Posting Guidelines",
    priority: "Medium",
    platform: "CareerPath",
  },
  {
    id: "TKT-005",
    subject: "Refund Processing Delay",
    priority: "High",
    platform: "WalletPro",
  },
];

// CareerPath Top Candidates Data
export const welkomeTopCandidatesData = [
  {
    name: "Alex Rodriguez",
    position: "Full Stack Developer",
    experience: "5 years",
    skills: ["React", "Node.js", "MongoDB"],
    rating: 4.9,
  },
  {
    name: "Priya Patel",
    position: "UX Designer",
    experience: "3 years",
    skills: ["Figma", "Adobe XD", "Prototyping"],
    rating: 4.8,
  },
  {
    name: "John Smith",
    position: "Data Scientist",
    experience: "4 years",
    skills: ["Python", "Machine Learning", "SQL"],
    rating: 4.7,
  },
];

// EduMatch Tutor Performance Data
export const welkomeEduMatchData = [
  {
    name: "Dr. Maria Garcia",
    subject: "Mathematics",
    students: 42,
    rating: 4.9,
    hours: 120,
  },
  {
    name: "Prof. Ahmed Hassan",
    subject: "Physics",
    students: 38,
    rating: 4.8,
    hours: 95,
  },
  {
    name: "Ms. Jennifer Lee",
    subject: "English Literature",
    students: 35,
    rating: 4.7,
    hours: 110,
  },
];

// Platform Performance Metrics
export const welkomePlatformMetrics = {
  marketSphere: {
    totalSellers: 2847,
    totalProducts: 45620,
    monthlyRevenue: 847200,
    orderVolume: 15628,
  },
  walletPro: {
    totalTransactions: 89543,
    successRate: 98.7,
    averageAmount: 156.40,
    refundRate: 1.2,
  },
  eduMatch: {
    totalTutors: 1245,
    totalStudents: 5680,
    sessionsCompleted: 3420,
    satisfaction: 4.6,
  },
  careerPath: {
    activeJobs: 856,
    totalCandidates: 12450,
    successfulPlacements: 234,
    averageSalary: 75000,
  },
}; 