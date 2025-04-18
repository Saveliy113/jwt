import { StrictMode } from 'react';
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import { Toaster } from "@/components/ui/sonner"

import router from './router/router';

import './index.css';

const root: HTMLElement = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(root).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </StrictMode>
);

