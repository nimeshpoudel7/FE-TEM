import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/dataTables";
import RTL from "views/admin/rtl";

// Auth Imports
import SignInCentered from "views/auth/signIn";
import LoginCentered from "views/loginPage/index";
import LandingPage from "views/landingpage";
import KYC from "views/onboarding/KYC";

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "/default",
    role:"MS",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "NFT Marketplace",
    layout: "/admin",
    role:"MS",
    path: "/nft-marketplace",
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    component: NFTMarketplace,
    secondary: true,
  },
  {
    name: "Investor List",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
    path: "/data-tables",
    role:"MS",
    component: DataTables,
  },
  {
    name: "Patner List",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
    path: "/data-listttt",
    role:"MS",
    component: DataTables,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "/profile",
    role:"MS",
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: Profile,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: SignInCentered,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "/login",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: LoginCentered,
  },
  {
    name: "Sign Up",
    layout: "/auth",
    path: "/cp-sign-in",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: LandingPage,
  },
  {
    name: "KYC",
    layout: "/auth",
    path: "/kycdetails",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: KYC,
  },
  {
    name: "RTL Admin",
    layout: "/rtl",
    path: "/rtl-default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: RTL,
  },
];

export default routes;
