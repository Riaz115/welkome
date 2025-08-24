const sellersData = [
  {
    id: 1,
    name: [
      "Ahmed Electronics Store", 
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1780&q=80"
    ],
    ownerName: "Ahmed Hassan",
    email: "ahmed.hassan@electronics.ug",
    phone: "+256701234567",
    status: "verified",
    joinDate: "Nov 15, 2024",
    location: "Kampala, Uganda",
    businessType: "Electronics",
    totalProducts: 145,
    totalSales: "UGX 15,420,000",
    verificationDate: "Nov 20, 2024",
    lastActive: "2 hours ago"
  },
  {
    id: 2,
    name: [
      "Fashion Hub Uganda", 
      "https://images.unsplash.com/photo-1494790108755-2616b612b100?ixlib=rb-1.2.1&auto=format&fit=crop&w=1780&q=80"
    ],
    ownerName: "Sarah Nakamura",
    email: "sarah@fashionhub.ug",
    phone: "+256702345678",
    status: "requested",
    joinDate: "Dec 1, 2024",
    location: "Entebbe, Uganda",
    businessType: "Fashion & Clothing",
    totalProducts: 0,
    totalSales: "UGX 0",
    verificationDate: null,
    lastActive: "1 day ago"
  },
  {
    id: 3,
    name: [
      "Organic Foods Co.", 
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1780&q=80"
    ],
    ownerName: "David Mukasa",
    email: "david@organicfoods.ug",
    phone: "+256703456789",
    status: "verified",
    joinDate: "Oct 10, 2024",
    location: "Mbarara, Uganda",
    businessType: "Food & Beverages",
    totalProducts: 89,
    totalSales: "UGX 8,750,000",
    verificationDate: "Oct 15, 2024",
    lastActive: "30 minutes ago"
  },
  {
    id: 4,
    name: [
      "Tech Solutions Ltd", 
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=1780&q=80"
    ],
    ownerName: "Grace Achieng",
    email: "grace@techsolutions.ug",
    phone: "+256704567890",
    status: "blocked",
    joinDate: "Sep 5, 2024",
    location: "Jinja, Uganda",
    businessType: "Technology",
    totalProducts: 67,
    totalSales: "UGX 12,300,000",
    verificationDate: "Sep 8, 2024",
    lastActive: "1 week ago",
    blockReason: "Policy violation - counterfeit products"
  },
  {
    id: 5,
    name: [
      "Home & Garden Supplies", 
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1780&q=80"
    ],
    ownerName: "Robert Kiprotich",
    email: "robert@homegardens.ug",
    phone: "+256705678901",
    status: "declined",
    joinDate: "Nov 25, 2024",
    location: "Gulu, Uganda",
    businessType: "Home & Garden",
    totalProducts: 0,
    totalSales: "UGX 0",
    verificationDate: null,
    lastActive: "3 days ago",
    declineReason: "Incomplete documentation"
  },
  {
    id: 6,
    name: [
      "Beauty & Cosmetics Hub", 
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1780&q=80"
    ],
    ownerName: "Patricia Namutebi",
    email: "patricia@beautyhub.ug",
    phone: "+256706789012",
    status: "verified",
    joinDate: "Aug 20, 2024",
    location: "Fortportal, Uganda",
    businessType: "Beauty & Personal Care",
    totalProducts: 156,
    totalSales: "UGX 9,850,000",
    verificationDate: "Aug 25, 2024",
    lastActive: "4 hours ago"
  },
  {
    id: 7,
    name: [
      "Sports & Fitness Store", 
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1780&q=80"
    ],
    ownerName: "Michael Ocen",
    email: "michael@sportsfitness.ug",
    phone: "+256707890123",
    status: "requested",
    joinDate: "Dec 5, 2024",
    location: "Masaka, Uganda",
    businessType: "Sports & Recreation",
    totalProducts: 0,
    totalSales: "UGX 0",
    verificationDate: null,
    lastActive: "6 hours ago"
  },
  {
    id: 8,
    name: [
      "Books & Stationery Plus", 
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1780&q=80"
    ],
    ownerName: "Jennifer Atim",
    email: "jennifer@booksstationery.ug",
    phone: "+256708901234",
    status: "verified",
    joinDate: "Jul 15, 2024",
    location: "Mbale, Uganda",
    businessType: "Books & Education",
    totalProducts: 234,
    totalSales: "UGX 6,420,000",
    verificationDate: "Jul 18, 2024",
    lastActive: "1 hour ago"
  },
  {
    id: 9,
    name: [
      "Auto Parts Center", 
      "https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-1.2.1&auto=format&fit=crop&w=1244&q=80"
    ],
    ownerName: "James Kato",
    email: "james@autoparts.ug",
    phone: "+256709012345",
    status: "blocked",
    joinDate: "Jun 10, 2024",
    location: "Arua, Uganda",
    businessType: "Automotive",
    totalProducts: 98,
    totalSales: "UGX 18,760,000",
    verificationDate: "Jun 12, 2024",
    lastActive: "2 weeks ago",
    blockReason: "Fraudulent activity reported"
  },
  {
    id: 10,
    name: [
      "Crafts & Handmade", 
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=1780&q=80"
    ],
    ownerName: "Mary Nalwanga",
    email: "mary@craftshandmade.ug",
    phone: "+256700123456",
    status: "declined",
    joinDate: "Nov 28, 2024",
    location: "Soroti, Uganda",
    businessType: "Arts & Crafts",
    totalProducts: 0,
    totalSales: "UGX 0",
    verificationDate: null,
    lastActive: "5 days ago",
    declineReason: "Business license not provided"
  },
  {
    id: 11,
    name: [
      "Mobile Accessories Plus", 
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2670&q=80"
    ],
    ownerName: "Peter Ssemakula",
    email: "peter@mobileaccessories.ug",
    phone: "+256701987654",
    status: "requested",
    joinDate: "Dec 8, 2024",
    location: "Lira, Uganda",
    businessType: "Electronics",
    totalProducts: 0,
    totalSales: "UGX 0",
    verificationDate: null,
    lastActive: "12 hours ago"
  },
  {
    id: 12,
    name: [
      "Kitchen Essentials Store", 
      "https://images.unsplash.com/photo-1573766064535-6d5d4e62bf9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1315&q=80"
    ],
    ownerName: "Susan Akello",
    email: "susan@kitchenessentials.ug",
    phone: "+256702876543",
    status: "verified",
    joinDate: "May 25, 2024",
    location: "Hoima, Uganda",
    businessType: "Home & Kitchen",
    totalProducts: 178,
    totalSales: "UGX 11,280,000",
    verificationDate: "May 28, 2024",
    lastActive: "15 minutes ago"
  }
];

// Status options for filtering
export const statusOptions = [
  { value: "all", label: "All Sellers", count: sellersData.length },
  { value: "requested", label: "Requested", count: sellersData.filter(s => s.status === "requested").length },
  { value: "verified", label: "Verified", count: sellersData.filter(s => s.status === "verified").length },
  { value: "blocked", label: "Blocked", count: sellersData.filter(s => s.status === "blocked").length },
  { value: "declined", label: "Declined", count: sellersData.filter(s => s.status === "declined").length }
];

// Business type options
export const businessTypes = [
  "Electronics",
  "Fashion & Clothing", 
  "Food & Beverages",
  "Technology",
  "Home & Garden",
  "Beauty & Personal Care",
  "Sports & Recreation",
  "Books & Education",
  "Automotive",
  "Arts & Crafts",
  "Home & Kitchen"
];

export default sellersData; 