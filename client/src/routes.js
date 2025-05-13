import Admin from "./pages/Admin"
import Auth from "./pages/Auth"
import UserProfile from "./pages/UserProfile"
import OrdersRafting from "./pages/OrdersRafting"
import OrdersRent from "./pages/OrdersRent"
import RaftingCatalog from "./pages/RaftingCatalog"
import RaftingPage from "./pages/RaftingPage"
import RaftingRating from "./pages/RaftingRating"
import RentCatalog from "./pages/RentCatalog"
import RentPage from "./pages/RentPage"
import HomePage from "./pages/HomePage"
import FAQPage from "./pages/FAQPage"
import UserManagement from "./pages/UserManagement"
import RaftingManagement from "./pages/RaftingManagement"
import RentManagement from "./pages/RentManagement"

import {
    ADMIN_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    ORDERSRAFTING_ROUTE,
    ORDERSRENT_ROUTE,
    RAFTINGCATALOG_ROUTE,  
    RAFTINGPAGE_ROUTE,
    RATING_ROUTE,
    RENTCATALOG_ROUTE,
    RENTPAGE_ROUTE,
    HOME_ROUTE,
    FAQ_ROUTE,
    PROFILE_ROUTE,
    USERMANAGEMENT_ROUTE,
    RAFTINGMANAGEMENT_ROUTE,
    RENTMANAGEMENT_ROUTE
} from "./utils/consts"
import { Component } from "react"

export const authRoutes =[
    {
        path: ADMIN_ROUTE,
        Component: Admin,
        protected: false,
        roleRequired:'ADMIN'
    },
    {
        path: PROFILE_ROUTE,
        Component: UserProfile,
        protected: false,
        roleRequired: 'ADMIN' || 'USER'
    },
    {
        path: ORDERSRAFTING_ROUTE,
        Component: OrdersRafting,
        protected: false
    },
    {
        path: ORDERSRENT_ROUTE,
        Component: OrdersRent,
        protected: false
    },
    {
        path: RATING_ROUTE + '/:id',
        Component: RaftingRating,
        protected: false
    },
    {
       path: USERMANAGEMENT_ROUTE,
       Component: UserManagement,
       protected: false,
       roleRequired:'ADMIN' 
    },
    {
       path: RAFTINGMANAGEMENT_ROUTE,
       Component: RaftingManagement,
       protected: false,
       roleRequired:'ADMIN' 
    },
    {
       path: RENTMANAGEMENT_ROUTE,
       Component: RentManagement,
       protected: false,
       roleRequired:'ADMIN' 
    }

]

export const publicRoutes =[
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: RAFTINGCATALOG_ROUTE,
        Component: RaftingCatalog
    },
    {
        path: RAFTINGPAGE_ROUTE + '/:id',
        Component: RaftingPage
    },
    {
        path: RENTCATALOG_ROUTE,
        Component: RentCatalog
    },
    {
        path: RENTPAGE_ROUTE + '/:id',
        Component: RentPage
    },
    {
        path: HOME_ROUTE,
        Component: HomePage
    },
    {
        path: FAQ_ROUTE,
        Component: FAQPage
    }
]