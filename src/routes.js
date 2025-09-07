import {
  MdDashboard,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
} from 'react-icons/md';

// Admin Imports
import DashboardsDefault from 'views/admin/dashboards/default';
import DashboardsRTLDefault from 'views/admin/dashboards/rtl';
import DashboardsCarInterface from 'views/admin/dashboards/carInterface';
import DashboardsSmartHome from 'views/admin/dashboards/smartHome';
import WelkomeDashboard from 'views/admin/dashboards/welkome';
import MarketSphereDashboard from 'views/admin/dashboards/marketsphere';
import UserManagementDashboard from 'views/admin/dashboards/userManagement';

// NFT Imports
import NFTMarketplace from 'views/admin/nfts/marketplace';
import NFTPage from 'views/admin/nfts/page';
import NFTCollection from 'views/admin/nfts/collection';
import NFTProfile from 'views/admin/nfts/profile';

// Main Imports
import AccountBilling from 'views/admin/main/account/billing';
import AccountApplications from 'views/admin/main/account/application';
import AccountInvoice from 'views/admin/main/account/invoice';
import AccountSettings from 'views/admin/main/account/settings';
import AccountAllCourses from 'views/admin/main/account/courses';
import AccountCoursePage from 'views/admin/main/account/coursePage';

import UserNew from 'views/admin/main/users/newUser';
import UsersOverview from 'views/admin/main/users/overview';
import UsersReports from 'views/admin/main/users/reports';

// User Management Imports
import UserManagement from 'views/admin/main/userManagement';
import SubAdminList from 'views/admin/main/userManagement/SubAdminList';
import UsersList from 'views/admin/main/userManagement/UsersList';
import RolePermissionEditor from 'views/admin/main/userManagement/components/RolePermissionEditor';
import RolesPermissions from 'views/admin/main/userManagement/RolesPermissions';
import Customers from 'views/admin/main/userManagement/Customers';
import Sellers from 'views/admin/main/userManagement/Sellers';
import SellerDetail from 'views/admin/main/userManagement/SellerDetail';
import BecomeASeller from 'views/admin/main/userManagement/BecomeASeller';
import Riders from 'views/admin/main/userManagement/Riders';
import EditUser from 'views/admin/main/userManagement/editUser';
import UserDetail from 'views/admin/main/userManagement/UserDetail';

import ProfileSettings from 'views/admin/main/profile/settings';
import ProfileOverview from 'views/admin/main/profile/overview';
import ProfileNewsfeed from 'views/admin/main/profile/newsfeed';

import ApplicationsKanban from 'views/admin/main/applications/kanban';
import ApplicationsDataTables from 'views/admin/main/applications/dataTables';
import ApplicationsCalendar from 'views/admin/main/applications/calendar';

import EcommerceProductSettings from 'views/admin/main/ecommerce/settingsProduct';
import EcommerceProductPage from 'views/admin/main/ecommerce/productPage';
import EcommerceOrderList from 'views/admin/main/ecommerce/orderList';
import EcommerceOrderDetails from 'views/admin/main/ecommerce/orderDetails';
import EcommerceReferrals from 'views/admin/main/ecommerce/referrals';

import CategoryManagement from 'views/admin/main/marketshphere/categoryManagement';
import BrandsManagement from 'views/admin/main/marketshphere/brandsManagement';
import ProductManagement from 'views/admin/main/marketshphere/productManagement';
import ProductSettings from 'views/admin/main/marketshphere/productManagement/productSettings';
import NewProduct from 'views/admin/main/marketshphere/newProduct';
import ProductView from 'views/admin/main/marketshphere/productView';

// Others
import OthersNotifications from 'views/admin/main/others/notifications';
//import OthersPricing from 'views/admin/main/others/pricing';
import OthersPricing from 'views/admin/main/others/pricing';
import OthersError from 'views/admin/main/others/404';
import Buttons from 'views/admin/main/others/buttons';
import Messages from 'views/admin/main/others/messages';

// Auth Imports
import ForgotPasswordCentered from 'views/auth/forgotPassword/ForgotPasswordCenter.jsx';
import ForgotPasswordDefault from 'views/auth/forgotPassword/ForgotPasswordDefault.jsx';
import LockCentered from 'views/auth/lock/LockCenter.jsx';
import LockDefault from 'views/auth/lock/LockDefault.jsx';
import SignInCentered from 'views/auth/signIn/SignInCenter.jsx';
import SignInDefault from 'views/auth/signIn/SignInDefault.jsx';
import SignUpCentered from 'views/auth/signUp/SignUpCenter.jsx';
import SignUpDefault from 'views/auth/signUp/SignUpDefault.jsx';
import VerificationCentered from 'views/auth/verification/VerificationCenter.jsx';
import VerificationDefault from 'views/auth/verification/VerificationDefault.jsx';
import ProfileIcon from 'components/icons/ProfileIcon';

const routes = [
  // {
  // 	name: 'Main Dashboard',
  // 	layout: '/admin',
  // 	path: 'default',
  // 	icon: <DashIcon />,
  // 	component: <NftCollection />
  // },
  // {
  // 	name: 'NFT Marketplace',
  // 	layout: '/admin',
  // 	path: 'nft-marketplace',
  // 	icon: <MarketIcon />,
  // 	component: <NftProfile />,
  // 	secondary: true
  // },
  // {
  // 	name: 'Data Tables',
  // 	layout: '/admin',
  // 	icon: <TablesIcon />,
  // 	path: 'data-tables',
  // 	component: <Alerts />
  // },
  {
    name: 'Profile',
    layout: '/admin',
    path: 'profile',
    icon: <ProfileIcon />,
    component: <ProfileOverview />,
  },
  // {
  // 	name: 'Sign In',
  // 	layout: '/auth',
  // 	path: 'sign-in',
  // 	icon: <SignInIcon />,
  // 	component: <ForgotPasswordCentered />
  // },
  // {
  // 	name: 'Default',
  // 	layout: '/auth',
  // 	path: '/sign-in/default',
  // 	component: <LockCentered />
  // },
  // --- Dashboards ---
  {
    name: 'Dashboards',
    path: '/dashboards',
    icon: <MdHome className="text-inherit h-5 w-5" />,
    collapse: true,
    items: [
      {
        name: 'Welkome Dashboard',
        layout: '/admin',
        path: '/dashboards/welkome',
        component: <WelkomeDashboard />,
      },
      {
        name: 'MarketSphere Dashboard',
        layout: '/admin',
        path: '/dashboards/marketsphere',
        component: <MarketSphereDashboard />,
      },

      {
        name: 'Main Dashboard',
        layout: '/admin',
        path: '/dashboards/default',
        component: <DashboardsDefault />,
      },
      {
        name: 'Car Interface',
        layout: '/admin',
        path: '/dashboards/car-interface',
        component: <DashboardsCarInterface />,
      },
      {
        name: 'Smart Home',
        layout: '/admin',
        path: '/dashboards/smart-home',
        component: <DashboardsSmartHome />,
      },
      {
        name: 'RTL',
        layout: '/rtl',
        path: '/dashboards/rtl',
        component: <DashboardsRTLDefault />,
      },
    ],
  },
  // --- NFTs ---
  {
    name: 'NFTs',
    path: '/nfts',
    icon: <MdOutlineShoppingCart className="text-inherit h-5 w-5" />,
    collapse: true,
    items: [
      {
        name: 'Marketplace',
        layout: '/admin',
        path: '/nfts/marketplace',
        component: <NFTMarketplace />,
        secondary: true,
      },
      {
        name: 'Collection',
        layout: '/admin',
        path: '/nfts/collection',
        component: <NFTCollection />,
        secondary: true,
      },
      {
        name: 'NFT Page',
        layout: '/admin',
        path: '/nfts/page',
        component: <NFTPage />,
        secondary: true,
      },
      {
        name: 'Profile',
        layout: '/admin',
        path: '/nfts/profile',
        component: <NFTProfile />,
        secondary: true,
      },
    ],
  },
  // --- Main pages ---
  {
    name: 'Main Pages',
    path: '/main',
    icon: <MdDashboard className="text-inherit h-5 w-5" />,
    collapse: true,
    items: [
      {
        name: 'Account',
        path: '/main/account',
        collapse: true,
        items: [
          {
            name: 'Billing',
            layout: '/admin',
            path: '/main/account/billing',
            exact: false,
            component: <AccountBilling />,
          },
          {
            name: 'Application',
            layout: '/admin',
            path: '/main/account/application',
            exact: false,
            component: <AccountApplications />,
          },
          {
            name: 'Invoice',
            layout: '/admin',
            path: '/main/account/invoice',
            exact: false,
            component: <AccountInvoice />,
          },
          {
            name: 'Settings',
            layout: '/admin',
            path: '/main/account/settings',
            exact: false,
            component: <AccountSettings />,
          },
          {
            name: 'All Courses',
            layout: '/admin',
            path: '/main/account/all-courses',
            exact: false,
            component: <AccountAllCourses />,
          },
          {
            name: 'Course Page',
            layout: '/admin',
            path: '/main/account/course-page',
            exact: false,
            component: <AccountCoursePage />,
          },
        ],
      },
      {
        name: 'Ecommerce',
        path: '/ecommerce',
        collapse: true,
        items: [
          {
            name: 'Product Settings',
            layout: '/admin',
            path: '/main/ecommerce/settings',
            exact: false,
            component: <EcommerceProductSettings />,
          },
          {
            name: 'Product Page',
            layout: '/admin',
            path: '/main/ecommerce/page-example',
            exact: false,
            component: <EcommerceProductPage />,
          },
          {
            name: 'Order List',
            layout: '/admin',
            path: '/main/ecommerce/order-list',
            exact: false,
            component: <EcommerceOrderList />,
          },
          {
            name: 'Order Details',
            layout: '/admin',
            path: '/main/ecommerce/order-details',
            exact: false,
            component: <EcommerceOrderDetails />,
          },
          {
            name: 'Referrals',
            layout: '/admin',
            path: '/main/ecommerce/referrals',
            exact: false,
            component: <EcommerceReferrals />,
          },
        ],
      },

      // ----------------------------------------------//
      // start from here//
      // ----------------------------------------------//

      //MARKETSPHERE//

      {
        name: 'MarketSphere',
        path: '/marketsphere',
        collapse: true,
        items: [
          {
            name: 'MarketSphere Dashboard',
            layout: '/admin',
            path: '/dashboards/marketsphere',
            exact: false,
            component: <MarketSphereDashboard />,
          },
          {
            name: 'Category Management',
            layout: '/admin',
            path: '/main/marketsphere/category-management',
            exact: false,
            component: <CategoryManagement />,
          },
          {
            name: 'Brands Management',
            layout: '/admin',
            path: '/main/marketsphere/brands-management',
            exact: false,
            component: <BrandsManagement />,
          },
          {
            name: 'Product Management',
            layout: '/admin',
            path: '/main/marketsphere/product-management',
            exact: false,
            component: <ProductManagement />,
          },
          {
            name: 'New Product',
            layout: '/admin',
            path: '/main/marketsphere/new-product',
            exact: false,
            component: <NewProduct />,
            hide: true, // Hide from navigation menu
          },
          {
            name: 'Product Settings',
            layout: '/admin',
            path: '/main/marketsphere/product-settings/:id',
            exact: false,
            component: <ProductSettings />,
            hide: true, // Hide from navigation menu
          },
          {
            name: 'Product View',
            layout: '/admin',
            path: '/main/marketsphere/product-view/:id',
            exact: false,
            component: <ProductView />,
            hide: true, // Hide from navigation menu
          },
        ],
      },
      {
        name: 'User Management',
        path: '/main/userManagement',
        collapse: true,
        items: [
          {
            name: 'Roles & Permissions',
            layout: '/admin',
            path: '/main/userManagement/roles-permissions',
            exact: false,
            component: <RolesPermissions />,
          },
          {
            name: 'Sub-admin List',
            layout: '/admin',
            path: '/main/userManagement/subadmins/list',
            exact: false,
            component: <SubAdminList />,
          },
          {
            name: 'Role & Permission Editor',
            layout: '/admin',
            path: '/main/userManagement/subadmins/role-permissions',
            exact: false,
            component: <RolePermissionEditor />,
          },
          {
            name: 'Users',
            layout: '/admin',
            path: '/main/userManagement/users',
            exact: false,
            component: <UsersList />,
          },
          {
            name: 'Become a Seller',
            layout: '/auth',
            path: '/become-a-seller',
            exact: false,
            component: <BecomeASeller />,
          },
          {
            name: 'Customers',
            layout: '/admin',
            path: '/main/userManagement/customers',
            exact: false,
            component: <Customers />,
          },
          {
            name: 'Sellers',
            layout: '/admin',
            path: '/main/userManagement/sellers',
            exact: false,
            component: <Sellers />,
          },
          {
            name: 'Seller Detail',
            layout: '/admin',
            path: '/main/userManagement/sellers/:id',
            exact: false,
            component: <SellerDetail />,
          },
          {
            name: 'Riders',
            layout: '/admin',
            path: '/main/userManagement/riders',
            exact: false,
            component: <Riders />,
          },
          {
            name: 'Edit User',
            layout: '/admin',
            path: '/main/userManagement/edit-user/:id',
            exact: false,
            component: <EditUser />,
            hide: true,
          },
          {
            name: 'User Detail',
            layout: '/admin',
            path: '/main/userManagement/user-detail/:id',
            exact: false,
            component: <UserDetail />,
            hide: true,
          },
        ],
      },

      // ----------------------------------------------//
      //  to here//
      // ----------------------------------------------//


      {
        name: "Users",
        path: "/main/users",
        collapse: true,
        items: [
          {
            name: "New User",
            layout: "/admin",
            path: "/main/users/new-user",
            exact: false,
            component: <UserNew />,
          },
          {
            name: "Users Overview",
            layout: "/admin",
            path: "/main/users/users-overview",
            exact: false,
            component: <UsersOverview />,
          },
          {
            name: "Users Reports",
            layout: "/admin",
            path: "/main/users/users-reports",
            exact: false,
            component: <UsersReports />,
          },
        ],
      },
      {
        name: 'Applications',
        path: '/main/applications',
        collapse: true,
        items: [
          {
            name: 'Kanban',
            layout: '/admin',
            path: '/main/applications/kanban',
            exact: false,
            component: <ApplicationsKanban />,
          },
          {
            name: 'Data Tables',
            layout: '/admin',
            path: '/main/applications/data-tables',
            exact: false,
            component: <ApplicationsDataTables />,
          },
          {
            name: 'Calendar',
            layout: '/admin',
            path: '/main/applications/calendar',
            exact: false,
            component: <ApplicationsCalendar />,
          },
        ],
      },
      {
        name: 'Profile',
        path: '/main/profile',
        collapse: true,
        items: [
          {
            name: 'Profile Overview',
            layout: '/admin',
            path: '/main/profile/overview',
            exact: false,
            component: <ProfileOverview />,
          },
          {
            name: 'Profile Settings',
            layout: '/admin',
            path: '/main/profile/settings',
            exact: false,
            component: <ProfileSettings />,
          },
          {
            name: 'News Feed',
            layout: '/admin',
            path: '/main/profile/newsfeed',
            exact: false,
            component: <ProfileNewsfeed />,
          },
        ],
      },
      {
        name: 'Others',
        path: '/main/others',
        collapse: true,
        items: [
          {
            name: 'Notifications',
            layout: '/admin',
            path: '/main/others/notifications',
            exact: false,
            component: <OthersNotifications />,
          },
          {
            name: 'Pricing',
            layout: '/auth',
            path: '/main/others/pricing',
            exact: false,
            component: <OthersPricing />,
          },
          {
            name: '404',
            layout: '/admin',
            path: '/main/others/404',
            exact: false,
            component: <OthersError />,
          },
          {
            name: 'Buttons',
            layout: '/admin',
            path: '/main/others/buttons',
            exact: false,
            component: <Buttons />,
          },
          {
            name: 'Messages',
            layout: '/admin',
            path: '/main/others/messages',
            exact: false,
            component: <Messages />,
          },
        ],
      },
    ],
  },
  // --- Authentication ---
  {
    name: 'Authentication',
    path: '/auth',
    icon: <MdLock className="text-inherit h-5 w-5" />,
    collapse: true,
    items: [
      // --- Sign In ---
      {
        name: 'Sign In',
        path: '/sign-in',
        collapse: true,
        items: [
          {
            name: 'Default',
            layout: '/auth',
            path: '/sign-in/default',
            component: <SignInDefault />,
          },
          {
            name: 'Centered',
            layout: '/auth',
            path: '/sign-in/centered',
            component: <SignInCentered />,
          },
        ],
      },
      // --- Sign Up ---
      {
        name: 'Sign Up',
        path: '/sign-up',
        collapse: true,
        items: [
          {
            name: 'Default',
            layout: '/auth',
            path: '/sign-up/default',
            component: <SignUpDefault />,
          },
          {
            name: 'Centered',
            layout: '/auth',
            path: '/sign-up/centered',
            component: <SignUpCentered />,
          },
        ],
      },
      // --- Verification ---
      {
        name: 'Verification',
        path: '/verification',
        collapse: true,
        items: [
          {
            name: 'Default',
            layout: '/auth',
            path: '/verification/default',
            component: <VerificationDefault />,
          },
          {
            name: 'Centered',
            layout: '/auth',
            path: '/verification/centered',
            component: <VerificationCentered />,
          },
        ],
      },
      // --- Lock ---
      {
        name: 'Lock',
        path: '/lock',
        collapse: true,
        items: [
          {
            name: 'Default',
            layout: '/auth',
            path: '/lock/default',
            component: <LockDefault />,
          },
          {
            name: 'Centered',
            layout: '/auth',
            path: '/lock/centered',
            component: <LockCentered />,
          },
        ],
      },
      // --- Forgot Password ---
      {
        name: 'Forgot Password',
        path: '/forgot-password',
        collapse: true,
        items: [
          {
            name: 'Default',
            layout: '/auth',
            path: '/forgot-password/default',
            component: <ForgotPasswordDefault />,
          },
          {
            name: 'Centered',
            layout: '/auth',
            path: '/forgot-password/centered',
            component: <ForgotPasswordCentered />,
          },
        ],
      },
    ],
  },
  // {
  // 	name: 'RTL Admin',
  // 	layout: '/rtl',
  // 	path: 'rtl-default',
  // 	// icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
  // 	component: () => <MainDashboard /> RTL
  // }
];
export default routes;
