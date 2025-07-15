import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import StudySessions from "../pages/StudySessions/StudySessions";
import Dashboard from "../pages/Dashboard/Dashboard";
import Tutors from "../pages/Tutors/Tutors";
import AuthLayout from "../Layout/AuthLayout";
import Register from "../pages/AuthLayout/Register/Register";
import LogIn from "../pages/AuthLayout/LogIn/LogIn";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        children: [
            {
                index: true,
                Component: Home,
                // loader: () => fetch(`${import.meta.env.VITE_API_URL}/events`)
            },
            {
                path: 'tutors',
                Component: Tutors
            },
            {
                path: 'study-sessions',
                Component: StudySessions
            },
            {
                path: 'dashboard',
                Component: Dashboard
            }
            
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: 'register',
                Component: Register
            },
            {
                path: 'login',
                Component: LogIn
            }
        ]
    },
    {
        path: "*",
        Component: ErrorPage
    }
]);