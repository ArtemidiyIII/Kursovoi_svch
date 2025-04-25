export const authRoutes =[
    {
            path: ADMIT_ROUTE,
            Component: Admin,
            protected: false,
            roleRequired:'ADMIN'
    }
]

export const publicRoutes =[
    
]