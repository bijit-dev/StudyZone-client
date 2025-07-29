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
import StudentRoute from "../Routes/StudentRoute";
import AdminRoute from "../Routes/AdminRoute";
import TutorRoute from "../Routes/TutorRoute";
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
import Payment from "../pages/Dashboard/Payment/Payment";
import Forbidden from "../pages/Forbidden/Forbidden";


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
                path: 'forbidden',
                Component: Forbidden
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
                path: "payment/:sessionId",
                element: <StudentRoute><Payment></Payment></StudentRoute>
            },
            {
                path: 'view-booked-session',
                element: <StudentRoute><ViewBookedSession></ViewBookedSession></StudentRoute>
            },
            {
                path: 'booked-session/:id',
                element: <StudentRoute><BookedSessionDetails></BookedSessionDetails></StudentRoute>
            },
            {
                path: 'create-note',
                element: <StudentRoute><CreateNote></CreateNote></StudentRoute>
            },
            {
                path: 'manage-personal-notes',
                element: <StudentRoute><ManagePersonalNotes></ManagePersonalNotes></StudentRoute>
            },
            {
                path: 'view-all-study-materials',
                element: <StudentRoute><ViewAllStudyMaterials></ViewAllStudyMaterials></StudentRoute>
            },
            // ✅ Private routes for tutor
            {
                path: 'create-session',
                element: <TutorRoute><CreateSession></CreateSession></TutorRoute>
            },
            {
                path: "view-my-sessions",
                element: <TutorRoute><MyCreatedSessions></MyCreatedSessions></TutorRoute>
            },
            {
                path: 'upload-materials',
                element: <TutorRoute><UploadMaterials></UploadMaterials></TutorRoute>
            },
            {
                path: 'view-all-materials',
                element: <TutorRoute><ViewAllMaterials></ViewAllMaterials></TutorRoute>
            },
            // ✅ Private routes for admin
            {
                path: 'view-all-users',
                element: <AdminRoute><ViewAllUsers></ViewAllUsers></AdminRoute>
            },
            {
                path: 'view-all-sessions',
                // Component: 
                element: <AdminRoute><ViewAllSessions></ViewAllSessions></AdminRoute>
            },
            {
                path: 'SessionUpdate/:id',
                element: <AdminRoute><SessionUpdate></SessionUpdate></AdminRoute>
            },
            {
                path: 'all-materials',
                element: <AdminRoute><AllMaterials></AllMaterials></AdminRoute>
            }
        ]
    },
    {
        path: "*",
        Component: ErrorPage
    }
]);