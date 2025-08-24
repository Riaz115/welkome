/* eslint-disable */
import React from "react";
import { Link, useLocation } from "react-router-dom";
import DashIcon from "components/icons/DashIcon";
import { FaCircle } from "react-icons/fa";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/accordion";
import { 
  MdHome, 
  MdDirectionsBus, 
  MdLock,
  MdOutlineShoppingCart 
} from 'react-icons/md';
import {
  FaBriefcase,
  FaGraduationCap,
  FaHeadphones,
  FaHeart,
  FaShoppingBag,
  FaStream,
  FaUserFriends,
  FaWallet,
} from 'react-icons/fa';
import ProfileIcon from 'components/icons/ProfileIcon';

export function SidebarLinks(props) {
  let location = useLocation();
  const { hovered, mini } = props;
  
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname.includes(routeName);
  };

  // Helper function to check if any nested item is active
  const hasActiveNestedRoute = (items) => {
    return items?.some(item => {
      if (item.type === 'sub-accordion') {
        return item.items?.some(nestedItem => activeRoute(nestedItem.path));
      }
      return activeRoute(item.path);
    });
  };

  // Static menu items
  const staticMenuItems = [
    {
      name: 'Dashboard',
      path: '/admin/dashboards/welkome',
      icon: <MdHome className="text-inherit h-5 w-5" />,
      type: 'single'
    },
    // {
    //   name: 'Profile',
    //   path: '/admin/profile',
    //   icon: <ProfileIcon />,
    //   type: 'single'
    // },
    {
      name: 'User Management',
      icon: <FaUserFriends />,
      type: 'accordion',
      items: [
        { name: 'Roles & Permissions', path: '/admin/main/userManagement/roles-permissions' },
        { name: 'Sub Admins', path: '/admin/main/userManagement/subadmins/list' },
        { name: 'Users', path: '/admin/main/userManagement/users' },
        { name: 'Sellers', path: '/admin/main/userManagement/sellers' },
        { name: 'Riders', path: '/admin/main/userManagement/riders' }
      ]
    },
    {
      name: 'MarketSphere',
      icon: <FaShoppingBag />,
      type: 'accordion',
      items: [
        { name: 'MarketSphere Dashboard', path: '/admin/dashboards/marketsphere' },
        { name: 'Category Management', path: '/admin/main/marketsphere/category-management' },
        { name: 'Product Management', path: '/admin/main/marketsphere/product-management' },
        { name: 'Orders', path: '/admin/main/ecommerce/order-details' },
        { name: 'Promotions', path: '/admin/main/ecommerce/referrals' }
      ]
    },
    {
      name: 'Transit Plus',
      icon: <MdDirectionsBus />,
      type: 'accordion',
      items: [
        { name: 'Ride requests', path: '/admin/main/account/billing' },
        { name: 'Drivers', path: '/admin/main/account/application' },
        { name: 'Route History', path: '/admin/main/account/invoice' },
        { name: 'Live Mapping/Tracking', path: '/admin/main/account/settings' },
        { name: 'Delivery Partners', path: '/admin/main/account/all-courses' }
      ]
    },
    {
      name: 'StreamLink',
      icon: <FaStream />,
      type: 'accordion',
      items: [
        { name: 'Feed Moderation', path: '/admin/main/account/billing' },
        { name: 'Comments & Reactions', path: '/admin/main/account/application' },
        { name: 'Group Management', path: '/admin/main/account/invoice' },
        { name: 'Reported Content', path: '/admin/main/account/settings' }
      ]
    },
    {
      name: 'HeartSync',
      icon: <FaHeart />,
      type: 'accordion',
      items: [
        { name: 'User Profiles', path: '/admin/main/account/billing' },
        { name: 'Matchmaking Logs', path: '/admin/main/account/application' },
        { name: 'Reports / Abuse', path: '/admin/main/account/invoice' },
        { name: 'AI Settings', path: '/admin/main/account/settings' },
        { name: 'Preferences Management', path: '/admin/main/account/settings' }
      ]
    },
    {
      name: 'CareerPath',
      icon: <FaBriefcase />,
      type: 'accordion',
      items: [
        { name: 'Job Listings', path: '/admin/main/account/billing' },
        { name: 'Resume Submissions', path: '/admin/main/account/application' },
        { name: 'Employer Profiles', path: '/admin/main/account/invoice' },
        { name: 'Applications Review', path: '/admin/main/account/settings' },
        { name: 'Job Curation Rules', path: '/admin/main/account/settings' }
      ]
    },
    {
      name: 'EduMatch',
      icon: <FaGraduationCap />,
      type: 'accordion',
      items: [
        { name: 'Scholarship Database', path: '/admin/main/account/billing' },
        { name: 'AI Crawler Logs', path: '/admin/main/account/application' },
        { name: 'Matching Rules', path: '/admin/main/account/invoice' },
        { name: 'Applications Submitted', path: '/admin/main/account/settings' }
      ]
    },
    {
      name: 'AudioStream',
      icon: <FaHeadphones />,
      type: 'accordion',
      items: [
        { name: 'Audiobook Library', path: '/admin/main/account/billing' },
        { name: 'Categories', path: '/admin/main/account/application' },
        { name: 'Upload Requests', path: '/admin/main/account/invoice' },
        { name: 'Streaming Stats', path: '/admin/main/account/settings' }
      ]
    },
    {
      name: 'WalletPro',
      icon: <FaWallet />,
      type: 'accordion',
      items: [
        { name: 'Transactions', path: '/admin/main/account/billing' },
        { name: 'Wallet Balances', path: '/admin/main/account/application' },
        { name: 'Payouts & Refunds', path: '/admin/main/account/invoice' },
        { name: 'KYC Verifications', path: '/admin/main/account/settings' },
        { name: 'Subscriptions', path: '/admin/main/account/settings' }
      ]
    },
    // {
    //   name: 'Login',
    //   path: '/auth/sign-in/default',
    //   icon: <MdLock className="text-inherit h-5 w-5" />,
    //   type: 'single'
    // }
  ];

  const createStaticLinks = () => {
    return staticMenuItems.map((item, key) => {
      if (item.type === 'accordion') {
        return (
          <Accordion
            defaultIndex={hasActiveNestedRoute(item.items) ? 0 : "unset"}
            allowToggle
            key={key}
          >
            <AccordionItem mb="8px" border="none" key={key}>
              <AccordionButton
                display="flex"
                _hover={{
                  bg: "unset",
                }}
                _focus={{
                  boxShadow: "none",
                }}
                borderRadius="8px"
                w={{
                  sm: "100%",
                  xl: "100%",
                }}
                px="0px"
                py="0px"
                bg={"transparent"}
                ms={0}
                mb="4px"
              >
                <div
                  className={`mb-1.5 flex w-full items-center pl-8 pr-3 ${
                    mini === false
                      ? " justify-between"
                      : mini === true && hovered === true
                      ? " justify-between"
                      : " justify-center"
                  }`}
                >
                  <div>
                    <div className="align-center flex w-full justify-center">
                      <div
                        className={`flex items-center justify-center ${
                          mini === false
                            ? "mr-3.5"
                            : mini === true && hovered
                            ? "mr-3.5"
                            : "mx-auto"
                        } ${
                          hasActiveNestedRoute(item.items)
                            ? "text-brand-500 dark:text-white"
                            : "text-gray-600"
                        }`}
                      >
                        {item.icon}
                      </div>
                      <p
                        className={`mr-auto
                        ${
                          mini === false
                            ? "block"
                            : mini === true && hovered === true
                            ? "block"
                            : "block xl:hidden"
                        } ${
                          hasActiveNestedRoute(item.items)
                            ? "text-700 font-medium text-navy-700 dark:text-white"
                            : "font-medium text-gray-600"
                        } `}
                      >
                        {item.name}
                      </p>
                    </div>
                  </div>
                  <AccordionIcon
                    ms="auto"
                    className={`!text-gray-600 
                        ${
                          mini === false
                            ? "block"
                            : mini === true && hovered === true
                            ? "block"
                            : "block xl:hidden"
                        }`}
                    display={
                      mini === false
                        ? "block"
                        : mini === true && hovered === true
                        ? "block"
                        : { base: "block", xl: "none" }
                    }
                  />
                </div>
              </AccordionButton>
              <AccordionPanel
                py="0px"
                ps={
                  mini === false
                    ? "8px"
                    : mini === true && hovered === true
                    ? "8px"
                    : "base:8px xl:0px"
                }
                display={
                  mini === false
                    ? "block"
                    : mini === true && hovered === true
                    ? "block"
                    : "base:block xl:flex"
                }
              >
                <ul>
                  {item.items?.map((subItem, subKey) => {
                    // Check if this is a sub-accordion
                    if (subItem.type === 'sub-accordion') {
                      return (
                        <Accordion
                          defaultIndex={subItem.items?.some(nestedItem => activeRoute(nestedItem.path)) ? 0 : "unset"}
                          allowToggle
                          key={subKey}
                          className="ml-0"
                        >
                          <AccordionItem border="none">
                            <AccordionButton
                              display="flex"
                              _hover={{ bg: "unset" }}
                              _focus={{ boxShadow: "none" }}
                              borderRadius="8px"
                              px="0px"
                              py="8px"
                              bg="transparent"
                            >
                              <div className="flex w-full items-center justify-between pl-8 pr-2">
                                <div className="flex items-center">
                                  <span className="text-brand-500 dark:text-white mr-2">
                                    <FaCircle className="h-1.5 w-1.5" />
                                  </span>
                                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                    {subItem.name}
                                  </span>
                                </div>
                                <AccordionIcon className="text-gray-600 ml-2" />
                              </div>
                            </AccordionButton>
                            <AccordionPanel py="0px" ps="16px">
                              <ul>
                                {subItem.items?.map((nestedItem, nestedKey) => (
                                  <Link key={nestedKey} to={nestedItem.path}>
                                    <div className="relative ml-4 mb-1 flex hover:cursor-pointer">
                                      <li className="my-[3px] flex cursor-pointer items-center px-4">
                                        <span className="text-brand-500 dark:text-white">
                                          <FaCircle className="mr-0.5 h-1 w-1" />
                                        </span>
                                        <span
                                          className={`ml-2 flex text-xs ${
                                            activeRoute(nestedItem.path) === true
                                              ? "font-medium text-navy-700 dark:text-white"
                                              : "font-medium text-gray-500"
                                          }`}
                                        >
                                          {nestedItem.name}
                                        </span>
                                      </li>
                                    </div>
                                  </Link>
                                ))}
                              </ul>
                            </AccordionPanel>
                          </AccordionItem>
                        </Accordion>
                      );
                    } else {
                      // Regular sub-item
                      return (
                        <Link key={subKey} to={subItem.path}>
                          <div
                            className={`relative ${
                              mini === false
                                ? "ml-0"
                                : mini === true && hovered === true
                                ? "ml-0"
                                : "ml-0 xl:ml-0"
                            } mb-1 flex hover:cursor-pointer`}
                          >
                            <li
                              className="my-[3px] flex cursor-pointer items-center px-8"
                              key={subKey}
                            >
                              <span className={`text-brand-500 dark:text-white`}>
                                <FaCircle className={`mr-0.5 h-1.5 w-1.5`} />
                              </span>
                              <span
                                className={`ml-2 flex text-sm ${
                                  activeRoute(subItem.path) === true
                                    ? "font-medium text-navy-700 dark:text-white"
                                    : "font-medium text-gray-600"
                                }`}
                              >
                                {mini === false
                                  ? subItem.name
                                  : mini === true && hovered === true
                                  ? subItem.name
                                  : subItem.name[0]}
                              </span>
                            </li>
                          </div>
                        </Link>
                      );
                    }
                  })}
                </ul>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        );
      } else {
        // Single link
        return (
          <Link to={item.path} key={key}>
            <div className="relative mb-3 flex hover:cursor-pointer">
              <li className="my-[3px] flex cursor-pointer items-center px-[30px]">
                <span
                  className={`${
                    activeRoute(item.path) === true
                      ? "font-bold text-brand-500 dark:text-white"
                      : "font-medium text-gray-600"
                  }`}
                >
                  {item.icon ? item.icon : <DashIcon />}{" "}
                </span>
                <p
                  className={`leading-1 ml-4 flex ${
                    activeRoute(item.path) === true
                      ? "font-bold text-navy-700 dark:text-white"
                      : "font-medium text-gray-600"
                  }`}
                >
                  {item.name}
                </p>
              </li>
              {activeRoute(item.path) ? (
                <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400" />
              ) : null}
            </div>
          </Link>
        );
      }
    });
  };

  return <>{createStaticLinks()}</>;
}

export default SidebarLinks;
