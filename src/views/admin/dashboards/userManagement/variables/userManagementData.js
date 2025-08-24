// User Management Dashboard Data Variables

// User Growth Over Time Chart Data (Line Chart)
export const userGrowthData = [
  {
    name: "Total Users",
    data: [1200, 1350, 1480, 1620, 1780, 1950, 2120, 2300, 2480, 2650, 2820, 3000],
    color: "#4318FF",
  },
  {
    name: "Verified Users",
    data: [980, 1100, 1220, 1340, 1460, 1580, 1700, 1820, 1940, 2060, 2180, 2300],
    color: "#05CD99",
  },
];

export const userGrowthOptions = {
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

// User Status Distribution Chart Data (Donut Chart)
export const userStatusData = [75, 15, 10];

export const userStatusOptions = {
  labels: ["Active", "Suspended", "Deleted"],
  colors: ["#05CD99", "#FFB547", "#EE5D52"],
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
    colors: ["#05CD99", "#FFB547", "#EE5D52"],
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

// Users by Role Chart Data (Bar Chart)
export const usersByRoleData = [
  {
    name: "Buyers",
    data: [1850, 1920, 2100, 2200, 2350, 2450, 2580],
    color: "#4318FF",
  },
  {
    name: "Sellers",
    data: [420, 450, 480, 510, 540, 570, 600],
    color: "#39B8FF",
  },
  {
    name: "Admins",
    data: [25, 28, 30, 32, 35, 38, 40],
    color: "#05CD99",
  },
];

export const usersByRoleOptions = {
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

// Users Table Data
export const usersTableData = [
  {
    pageName: "Sarah Johnson",
    visitors: "sarah.johnson@email.com",
    unique: "+1 234-567-8901",
    clients: "Active",
    bounceRate: "Buyer",
    signupDate: "Jan 15, 2024",
    id: "user_001",
  },
  {
    pageName: "Michael Chen",
    visitors: "michael.chen@email.com",
    unique: "+1 234-567-8902",
    clients: "Active",
    bounceRate: "Seller",
    signupDate: "Feb 02, 2024",
    id: "user_002",
  },
  {
    pageName: "Emma Williams",
    visitors: "emma.williams@email.com",
    unique: "+1 234-567-8903",
    clients: "Suspended",
    bounceRate: "Buyer",
    signupDate: "Mar 10, 2024",
    id: "user_003",
  },
  {
    pageName: "David Brown",
    visitors: "david.brown@email.com",
    unique: "+1 234-567-8904",
    clients: "Active",
    bounceRate: "Admin",
    signupDate: "Jan 20, 2024",
    id: "user_004",
  },
  {
    pageName: "Lisa Taylor",
    visitors: "lisa.taylor@email.com",
    unique: "+1 234-567-8905",
    clients: "Active",
    bounceRate: "Seller",
    signupDate: "Feb 18, 2024",
    id: "user_005",
  },
  {
    pageName: "James Wilson",
    visitors: "james.wilson@email.com",
    unique: "+1 234-567-8906",
    clients: "Deleted",
    bounceRate: "Buyer",
    signupDate: "Mar 05, 2024",
    id: "user_006",
  },
  {
    pageName: "Anna Martinez",
    visitors: "anna.martinez@email.com",
    unique: "+1 234-567-8907",
    clients: "Active",
    bounceRate: "Seller",
    signupDate: "Jan 28, 2024",
    id: "user_007",
  },
  {
    pageName: "Robert Garcia",
    visitors: "robert.garcia@email.com",
    unique: "+1 234-567-8908",
    clients: "Active",
    bounceRate: "Buyer",
    signupDate: "Feb 14, 2024",
    id: "user_008",
  },
];

// Recent User Activity Data
export const recentUserActivity = [
  {
    name: "New User: Alice Cooper",
    date: "Today, 16:36",
    sum: "Registration",
    type: "signup",
  },
  {
    name: "Email Verified: John Smith",
    date: "Today, 14:22",
    sum: "Verified",
    type: "verification",
  },
  {
    name: "Account Suspended: Mark Johnson",
    date: "Today, 11:15",
    sum: "Suspended",
    type: "suspension",
  },
  {
    name: "Role Changed: Mary Davis",
    date: "Yesterday, 18:30",
    sum: "Seller → Admin",
    type: "role_change",
  },
  {
    name: "Password Reset: Tom Wilson",
    date: "Yesterday, 15:45",
    sum: "Security",
    type: "security",
  },
];

// User Management KPI Metrics
export const userManagementKPIData = {
  totalUsers: 3220,
  verifiedUsers: 2580,
  suspendedUsers: 185,
  newSignupsThisMonth: 247,
  userGrowthRate: 12.8,
  verificationRate: 89.2,
}; 