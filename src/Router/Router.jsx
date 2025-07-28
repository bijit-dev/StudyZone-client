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
import BookedSessionDetails from "../pages/Dashboard/BookedSessionDetails/BookedSessionDetails";
import ManagePersonalNotes from "../pages/Dashboard/ManagePersonalNotes/ManagePersonalNotes";
import ViewAllStudyMaterials from "../pages/Dashboard/ViewAllStudyMaterials/ViewAllStudyMaterials";
import MyCreatedSessions from "../pages/Dashboard/MyCreatedSessions/MyCreatedSessions";
import UploadMaterials from "../pages/Dashboard/UploadMaterials/UploadMaterials";
import ViewAllMaterials from "../pages/Dashboard/ViewAllMaterials/ViewAllMaterials";
import ViewAllUsers from "../pages/Dashboard/ViewAllUsers/ViewAllUsers";
import ViewAllSessions from "../pages/Dashboard/ViewAllSessions/ViewAllSessions";
import SessionUpdate from "../pages/Dashboard/ViewAllSessions/SessionUpdate";
import AllMaterials from "../pages/Dashboard/AllMaterials/AllMaterials";


export const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        children: [
            {
                index: true,
                Component: Home,
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
            // ✅ Private routes for student
            {
                path: 'view-booked-session',
                Component: ViewBookedSession
            },
            {
                path: 'booked-session/:id',
                Component: BookedSessionDetails
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
                Component: ViewAllStudyMaterials
            },
            // ✅ Private routes for tutor
            {
                path: 'create-session',
                Component: CreateSession
            },
            {
                path: "view-my-sessions",
                Component: MyCreatedSessions
            },
            {
                path: 'upload-materials',
                Component: UploadMaterials
            },
            {
                path: 'view-all-materials',
                Component: ViewAllMaterials
            },
            // ✅ Private routes for admin
            {
                path: 'view-all-users',
                Component: ViewAllUsers
            },
            {
                path: 'view-all-sessions',
                Component: ViewAllSessions
            },
            {
                path: 'SessionUpdate/:id',
                Component: SessionUpdate
            },
            {
                path: 'all-materials',
                Component: AllMaterials
            }
        ]
    },
    {
        path: "*",
        Component: ErrorPage
    }
]);