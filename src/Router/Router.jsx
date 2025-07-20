import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import StudySessions from "../pages/StudySessions/StudySessions";
import Tutors from "../pages/Tutors/Tutors";
import AuthLayout from "../Layout/AuthLayout";
import Register from "../pages/AuthLayout/Register/Register";
import LogIn from "../pages/AuthLayout/LogIn/LogIn";
import PrivateRoute from "../Routes/PrivateRoute";
import DashboardLayout from "../Layout/DashboardLayout";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import CreateSession from "../pages/Dashboard/CreateSession/CreateSession";
import SessionDetails from "../pages/SessionDetails/SessionDetails";
import ViewBookedSession from "../pages/Dashboard/ViewBookedSession/ViewBookedSession";
import CreateNote from "../pages/Dashboard/CreateNote/CreateNote";
import ManagePersonalNotes from "../pages/Dashboard/ManagePersonalNotes/ManagePersonalNotes";

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
                path: 'session/:id',
                Component: SessionDetails,
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
    }, {
        path: '/dashboard',
        element: <PrivateRoute>
            <DashboardLayout></DashboardLayout>
        </PrivateRoute>,
        children: [
            {
                index: true,
                Component: DashboardHome
            },
            {
                path: 'create-session',
                Component: CreateSession
            },
            {
                path: 'view-booked-session',
                Component: ViewBookedSession
            },            
            {
                path: 'create-note',
                Component: CreateNote
            },
            {
                path: 'manage-personal-notes',
                Component: ManagePersonalNotes
            },
            {
                path: 'view-all-study-materials',
                Component: ManagePersonalNotes
            },
            
        ]
    },
    {
        path: "*",
        Component: ErrorPage
    }
]);