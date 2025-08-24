// MarketSphere Dashboard Data Variables

// Weekly Sales Volume Chart Data (Line Chart)
export const marketSphereWeeklySalesData = [
  {
    name: "Sales Volume",
    data: [2400, 2850, 3100, 2950, 3600, 4200, 3900, 4500, 5100, 4800, 5500, 5200],
    color: "#4318FF",
  },
  {
    name: "Returns",
    data: [120, 180, 150, 200, 160, 220, 180, 160, 200, 170, 190, 180],
    color: "#FF6B6B",
  },
];

export const marketSphereWeeklySalesOptions = {
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

// Top 5 Product Categories by Sales Chart Data (Bar Chart)
export const marketSphereTopCategoriesData = [
  {
    name: "Electronics",
    data: [850, 920, 1100, 980, 1200, 1350, 1280],
    color: "#4318FF",
  },
  {
    name: "Fashion",
    data: [650, 720, 800, 760, 850, 920, 880],
    color: "#39B8FF",
  },
  {
    name: "Home & Garden",
    data: [450, 480, 520, 500, 580, 620, 590],
    color: "#05CD99",
  },
  {
    name: "Sports",
    data: [320, 350, 380, 360, 400, 420, 410],
    color: "#FFB547",
  },
  {
    name: "Books",
    data: [220, 240, 260, 250, 280, 300, 290],
    color: "#EE5D52",
  },
];

export const marketSphereTopCategoriesOptions = {
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

// Order Status Breakdown Chart Data (Donut Chart)
export const marketSphereOrderStatusData = [65, 25, 10];

export const marketSphereOrderStatusOptions = {
  labels: ["Delivered", "Pending", "Cancelled"],
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

// Latest Orders Table Data
export const marketSphereLatestOrdersData = [
  {
    pageName: "#MS-8847",
    visitors: "Sarah Johnson",
    unique: "TechGear Store",
    clients: "$284.50",
    bounceRate: "Delivered",
  },
  {
    pageName: "#MS-8846",
    visitors: "Michael Chen",
    unique: "Fashion Hub",
    clients: "$129.99",
    bounceRate: "Pending",
  },
  {
    pageName: "#MS-8845",
    visitors: "Emma Williams",
    unique: "Home Essentials",
    clients: "$456.75",
    bounceRate: "Delivered",
  },
  {
    pageName: "#MS-8844",
    visitors: "David Brown",
    unique: "Book Corner",
    clients: "$89.99",
    bounceRate: "Cancelled",
  },
  {
    pageName: "#MS-8843",
    visitors: "Lisa Taylor",
    unique: "Sports World",
    clients: "$312.25",
    bounceRate: "Delivered",
  },
  {
    pageName: "#MS-8842",
    visitors: "James Wilson",
    unique: "TechGear Store",
    clients: "$199.99",
    bounceRate: "Pending",
  },
];

// Active Sellers Table Data
export const marketSphereActiveSellersData = [
  {
    pageName: "TechGear Store",
    visitors: "Jan 15, 2024",
    unique: "1,247",
    clients: "$125,480",
    bounceRate: "Verified",
  },
  {
    pageName: "Fashion Hub",
    visitors: "Feb 02, 2024",
    unique: "892",
    clients: "$89,250",
    bounceRate: "Verified",
  },
  {
    pageName: "Home Essentials",
    visitors: "Mar 10, 2024",
    unique: "634",
    clients: "$67,890",
    bounceRate: "Verified",
  },
  {
    pageName: "Book Corner",
    visitors: "Jan 20, 2024",
    unique: "445",
    clients: "$45,670",
    bounceRate: "Verified",
  },
  {
    pageName: "Sports World",
    visitors: "Feb 18, 2024",
    unique: "589",
    clients: "$78,920",
    bounceRate: "Pending",
  },
  {
    pageName: "Beauty Zone",
    visitors: "Mar 05, 2024",
    unique: "312",
    clients: "$34,560",
    bounceRate: "Verified",
  },
];

// Recent Activity Data for MarketSphere
export const marketSphereRecentActivity = [
  {
    name: "New Seller: TechStore Plus",
    date: "Today, 16:36",
    sum: "Registration",
    type: "seller",
  },
  {
    name: "Product Added: iPhone 15 Case",
    date: "Today, 14:22",
    sum: "Electronics",
    type: "product",
  },
  {
    name: "Seller Verification: Fashion Outlet",
    date: "Today, 11:15",
    sum: "Approved",
    type: "verification",
  },
  {
    name: "Large Order: #MS-8950",
    date: "Yesterday, 18:30",
    sum: "$2,450",
    type: "order",
  },
  {
    name: "Category Update: Home Decor",
    date: "Yesterday, 15:45",
    sum: "Updated",
    type: "category",
  },
];

// MarketSphere KPI Metrics
export const marketSphereKPIData = {
  totalSellers: 3247,
  totalProducts: 52860,
  totalOrders: 18750,
  revenueThisMonth: 942800,
  sellerOnboardingProgress: {
    profileCompletion: 87,
    documentVerification: 92,
    storeSetup: 64,
    paymentSetup: 78,
  },
}; 