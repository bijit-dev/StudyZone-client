import Loader from "../../../components/Loader";
import useUserRole from "../../../hooks/useUserRole";
import ErrorPage from "../../ErrorPage/ErrorPage";
import AdminDashboard from "./AdminDashboard";
import StudentDashboard from "./StudentDashboard";
import TeacherDashboard from "./TeacherDashboard";


const DashboardHome = () => {
    const { role, roleLoading } = useUserRole();

    if (roleLoading) {
        return <Loader></Loader>
    }

    if(role === 'student'){
        return <StudentDashboard></StudentDashboard>
    }
    else if(role === 'teacher'){
        return <TeacherDashboard></TeacherDashboard>
    }
    else if(role ==='admin'){
        return <AdminDashboard></AdminDashboard>
    }
    else {
        return <ErrorPage></ErrorPage>
    }

};

export default DashboardHome;