import { createBrowserRouter, RouteObject } from "react-router";

// Components
import AuthPage from '../pages/AuthPage.tsx';
import MainLayout from '../layouts/MainLayout.tsx'
import ActivationPage from "@/pages/ActivationPage.tsx";
import MainPage from "@/pages/MainPage.tsx";

const routes: RouteObject[] = [
  {
    path: "/",
    Component: MainLayout,
    children: [
        {
          index: true,
          Component: MainPage
        },
        {
            path: "signIn",
            Component: AuthPage,
        },
        {
            path: "signUp",
            Component: AuthPage,
        },
        {
            path: "activate",
            Component: ActivationPage,
        }
    ]
  },
];

const router = createBrowserRouter(routes);

export default router;