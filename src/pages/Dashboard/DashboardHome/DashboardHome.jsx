import Loader from "../../../components/Loader";
import useUserRole from "../../../hooks/useUserRole";
import ErrorPage from "../../ErrorPage/ErrorPage";
import AdminDashboard from "./AdminDashboard";
import StudentDashboard from "./StudentDashboard";
import TutorDashboard from "./TutorDashboard";


const DashboardHome = () => {
    const { role, roleLoading } = useUserRole();

    if (roleLoading) {
        return <Loader></Loader>
    }

    if (role === 'student') {
        return <StudentDashboard></StudentDashboard>
    }
    else if (role === 'Tutor') {
        return <TutorDashboard></TutorDashboard>
    }
    else if (role === 'admin') {
        return <AdminDashboard></AdminDashboard>
    }
    else {
        return <ErrorPage></ErrorPage>
    }

};

export default DashboardHome;