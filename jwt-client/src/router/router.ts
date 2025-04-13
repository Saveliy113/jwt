import { createBrowserRouter, RouteObject } from "react-router";

// Components
import AuthPage from '../pages/AuthPage.tsx';
import MainLayout from '../layouts/MainLayout.tsx'

const routes: RouteObject[] = [
  {
    path: "/",
    Component: MainLayout,
    children: [
        {
            path: "signIn",
            Component: AuthPage,
        }
    ]
  },
];

const router = createBrowserRouter(routes);

export default router;