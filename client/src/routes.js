import { ORDERSRAFTING_ROUTE, ADMIN_ROUTE, RAFTINGCATALOG_ROUTE, RAFTINGPAGE_ROUTE, REGISTRATION_ROUTE, LOGIN_ROUTE } from "./utils/consts"

export const authRoutes =[
    {
        path: ADMIN_ROUTE,
        Component: Admin,
        protected: false,
        roleRequired:'ADMIN'
    },
    {
        path: ORDERSRAFTING_ROUTE,
        Component: OrdersRafting,
        protected: false
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
    }
]