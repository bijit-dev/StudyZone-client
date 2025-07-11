import { NavLink } from "react-router";
import useAuth from "../hooks/useAuth";
import StudyZoneLogo from "./StudyZoneLogo";


const Navbar = () => {
    const { user, signOutUser } = useAuth();

    const handleLogOut = () => {
        signOutUser()
            .then(() => {
                // Optionally, you can add a success message or redirect here
            })
            .catch((error) => {
                console.error("Error signing out:", error);
            });
    }

    const lists = <>
        <li><NavLink to="/" className={({ isActive }) => isActive ? "text-green-600 underline text-lg font-bold" : "text-lg font-medium"}>Home</NavLink></li>
        <li><NavLink to="/tutors" className={({ isActive }) => isActive ? "text-[#0EA106] underline text-lg font-bold" : "text-lg font-medium"}>Tutors</NavLink></li>
        <li><NavLink to="/study-sessions" className={({ isActive }) => isActive ? "text-green-600 underline text-lg font-bold" : "text-lg font-medium"}>Study Sessions</NavLink></li>

        {
            user && <li><NavLink to="/dashboard" className={({ isActive }) => isActive ? "text-green-600 underline text-lg font-bold" : "text-lg font-medium"}>Dashboard</NavLink></li>
        }
    </>

    return (
        <div className="navbar bg-base-100 shadow-sm font-poppins">
            <div className="navbar-start">
                <StudyZoneLogo />
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {lists}
                </ul>
            </div>

            <div className="navbar-end">
                {
                    user ?
                        <div className="flex gap-2">
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img title={user.displayName} alt={user.displayName} src={user?.photoURL} />
                                    </div>
                                </div>

                            </div>
                            <div>
                                <NavLink onClick={handleLogOut} className={({ isActive }) => isActive ? "active btn btn-success rounded-lg" : "btn btn-primary hover:btn-success rounded-lg"}>Log Out</NavLink>
                            </div>
                        </div>
                        :
                        <>
                            <div className=" hidden lg:flex gap-2 font-bold">
                                <NavLink to="/login" className={({ isActive }) => isActive ? "active btn btn-success rounded-lg" : "btn btn-warning hover:btn-success rounded-lg"}>LogIn</NavLink>
                                <NavLink to="/register" className={({ isActive }) => isActive ? "active btn btn-success rounded-lg" : "btn btn-warning btn-outline hover:btn-success rounded-lg"}>Register</NavLink>
                            </div>

                            <div className="dropdown">
                                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                    {lists}
                                    <div className="flex flex-col gap-2 mt-2">
                                        <NavLink to="/login" className={({ isActive }) => isActive ? "active btn btn-success rounded-lg" : "btn btn-primary hover:btn-success rounded-lg"}>LogIn</NavLink>
                                        <NavLink to="/register" className={({ isActive }) => isActive ? "active btn btn-success rounded-lg" : "btn btn-primary hover:btn-success rounded-lg"}>Register</NavLink>
                                    </div>
                                </ul>
                            </div>
                        </>
                }
            </div>
        </div>
    );
};

export default Navbar;