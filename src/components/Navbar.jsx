import { NavLink } from "react-router";
import Logo from "./Logo.png";
import useAuth from "../hooks/useAuth";


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
        <li><NavLink to="/" className={({ isActive }) => isActive ? "text-[#0EA106] underline text-lg font-bold" : "text-lg font-medium"}>Home</NavLink></li>
        <li><NavLink to="/eventsPage" className={({ isActive }) => isActive ? "text-[#0EA106] underline text-lg font-bold" : "text-lg font-medium"}>Events Page</NavLink></li>
        {
        user && <li><NavLink to="/create-event" className={({ isActive }) => isActive ? "text-[#0EA106] underline text-lg font-bold" : "text-lg font-medium"}>Create Event</NavLink></li>

        }
    </>

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="flex items-center">
                    <img src={Logo} alt="Logo" className="w-10 h-10 mr-2" />
                    <h1 className="font-extrabold text-lg lg:text-2xl">BD <span className="text-green-600">Olympics</span></h1>
                </div>

            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {lists}
                </ul>
            </div>

            <div className="navbar-end">

                {
                    user ? <div className="flex gap-2">
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img title={user.displayName} alt={user.displayName} src={user?.photoURL} />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                <span className="lg:hidden">
                                    {lists}
                                </span>
                                {/* profile list items  */}
                                <li><NavLink to="/bookEvent" className={({ isActive }) => isActive ? "text-[#0EA106] text-lg font-bold" : "text-lg font-medium"}>Book Event</NavLink></li>
                                <li><NavLink to="/myBookings" className={({ isActive }) => isActive ? "text-[#0EA106] text-lg font-bold" : "text-lg font-medium"}>My Bookings</NavLink></li>
                                <li><NavLink to="/manageEvents" className={({ isActive }) => isActive ? "text-[#0EA106] text-lg font-bold" : "text-lg font-medium"}>Manage Events</NavLink></li>

                            </ul>
                        </div>
                        <div>
                            <NavLink onClick={handleLogOut} className={({ isActive }) => isActive ? "active btn btn-success rounded-lg" : "btn btn-primary hover:btn-success rounded-lg"}>Log Out</NavLink>
                        </div>
                    </div>
                        :
                        <>
                            <NavLink to="/login" className={({ isActive }) => isActive ? "active btn btn-success rounded-lg" : "btn btn-primary hover:btn-success rounded-lg"}>LogIn</NavLink>
                            <div className="dropdown">
                                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                    {lists}
                                </ul>
                            </div>
                        </>
                }
            </div>
        </div>
    );
};

export default Navbar;