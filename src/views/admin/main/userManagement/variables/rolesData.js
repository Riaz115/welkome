// Available permissions in the system organized by categories
export const availablePermissions = [
  {
    category: "User Management",
    permissions: [
      { id: "user_view", name: "View Users", description: "View user profiles and details" },
      { id: "user_create", name: "Create Users", description: "Add new users to the system" },
      { id: "user_edit", name: "Edit Users", description: "Modify user information" },
      { id: "user_delete", name: "Delete Users", description: "Remove users from the system" },
      { id: "user_block", name: "Block/Unblock Users", description: "Block or unblock user accounts" }
    ]
  },
  {
    category: "Role Management",
    permissions: [
      { id: "role_view", name: "View Roles", description: "View all system roles" },
      { id: "role_create", name: "Create Roles", description: "Create new roles" },
      { id: "role_edit", name: "Edit Roles", description: "Modify existing roles" },
      { id: "role_delete", name: "Delete Roles", description: "Remove roles from system" },
      { id: "role_assign", name: "Assign Roles", description: "Assign roles to users" }
    ]
  },
  {
    category: "Content Management",
    permissions: [
      { id: "content_view", name: "View Content", description: "View platform content" },
      { id: "content_create", name: "Create Content", description: "Add new content" },
      { id: "content_edit", name: "Edit Content", description: "Modify existing content" },
      { id: "content_delete", name: "Delete Content", description: "Remove content" },
      { id: "content_moderate", name: "Moderate Content", description: "Review and moderate content" }
    ]
  },
  {
    category: "Financial Management",
    permissions: [
      { id: "finance_view", name: "View Financial Data", description: "Access financial reports" },
      { id: "finance_manage", name: "Manage Transactions", description: "Handle financial transactions" },
      { id: "finance_reports", name: "Generate Reports", description: "Create financial reports" },
      { id: "finance_audit", name: "Audit Access", description: "Access audit logs" }
    ]
  },
  {
    category: "System Management",
    permissions: [
      { id: "system_settings", name: "System Settings", description: "Configure system settings" },
      { id: "system_backup", name: "Backup Management", description: "Manage system backups" },
      { id: "system_logs", name: "View Logs", description: "Access system logs" },
      { id: "system_maintenance", name: "Maintenance Mode", description: "Control system maintenance" }
    ]
  },
  {
    category: "MarketSphere Management",
    permissions: [
      { id: "marketplace_view", name: "View MarketSphere", description: "Access marketplace dashboard" },
      { id: "marketplace_products", name: "Manage Products", description: "Add, edit, and remove products" },
      { id: "marketplace_orders", name: "Manage Orders", description: "Process and track orders" },
      { id: "marketplace_sellers", name: "Manage Sellers", description: "Approve and manage seller accounts" },
      { id: "marketplace_categories", name: "Manage Categories", description: "Create and organize product categories" }
    ]
  },
  {
    category: "Analytics & Reports",
    permissions: [
      { id: "analytics_view", name: "View Analytics", description: "Access analytics dashboard" },
      { id: "analytics_export", name: "Export Data", description: "Export analytics data" },
      { id: "reports_create", name: "Create Reports", description: "Generate custom reports" },
      { id: "reports_schedule", name: "Schedule Reports", description: "Set up automated reports" }
    ]
  }
];

// Get all permission IDs for super admin
const getAllPermissions = () => {
  return availablePermissions.flatMap(cat => cat.permissions.map(p => p.id));
};

// Initial roles data
const rolesData = [
  {
    id: 1,
    name: "Super Admin",
    description: "Full system access with all permissions",
    permissions: getAllPermissions(),
    userCount: 2,
    status: "Active",
    createdDate: "Dec 1, 2024",
    isSystem: true
  },
  {
    id: 2,
    name: "User Manager",
    description: "Manage users and basic content moderation",
    permissions: ["user_view", "user_create", "user_edit", "user_block", "content_view", "content_moderate"],
    userCount: 5,
    status: "Active",
    createdDate: "Dec 3, 2024",
    isSystem: false
  },
  {
    id: 3,
    name: "Content Moderator",
    description: "Moderate and manage platform content",
    permissions: ["content_view", "content_edit", "content_moderate", "content_delete", "user_view"],
    userCount: 8,
    status: "Active",
    createdDate: "Dec 5, 2024",
    isSystem: false
  },
  {
    id: 4,
    name: "Finance Admin",
    description: "Manage financial operations and reports",
    permissions: ["finance_view", "finance_manage", "finance_reports", "finance_audit", "user_view"],
    userCount: 3,
    status: "Active",
    createdDate: "Dec 7, 2024",
    isSystem: false
  },
  {
    id: 5,
    name: "MarketSphere Manager",
    description: "Full access to MarketSphere marketplace management",
    permissions: [
      "marketplace_view", "marketplace_products", "marketplace_orders", 
      "marketplace_sellers", "marketplace_categories", "user_view", "analytics_view"
    ],
    userCount: 6,
    status: "Active",
    createdDate: "Dec 8, 2024",
    isSystem: false
  },
  {
    id: 6,
    name: "Analytics Admin",
    description: "Manage analytics and generate reports",
    permissions: ["analytics_view", "analytics_export", "reports_create", "reports_schedule", "user_view"],
    userCount: 4,
    status: "Active",
    createdDate: "Dec 10, 2024",
    isSystem: false
  },
  {
    id: 7,
    name: "Support Admin",
    description: "Handle customer support and basic user management",
    permissions: ["user_view", "user_edit", "content_view", "content_moderate"],
    userCount: 6,
    status: "Inactive",
    createdDate: "Dec 12, 2024",
    isSystem: false
  },
  {
    id: 8,
    name: "Seller Manager",
    description: "Manage marketplace sellers and their verification",
    permissions: ["marketplace_view", "marketplace_sellers", "user_view", "user_edit"],
    userCount: 3,
    status: "Active",
    createdDate: "Dec 14, 2024",
    isSystem: false
  }
];

export default rolesData; 