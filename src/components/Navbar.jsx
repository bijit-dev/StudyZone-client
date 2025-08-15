import { Link, NavLink, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import StudyZoneLogo from "./StudyZoneLogo";
import { useState } from "react";

const Navbar = () => {
    const { user, signOutUser } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogOut = () => {
        signOutUser()
            .then(() => setIsMobileMenuOpen(false))
            .catch((error) => console.error("Error signing out:", error));
    };
    const handleProfile =()=>{
        navigate("/profile")
    }

    const lists = (
        <>
            <li>
                <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                        isActive ? "text-accent underline text-lg font-bold" : "text-lg font-medium"}>
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/tutors" onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                        isActive ? "text-accent underline text-lg font-bold" : "text-lg font-medium"}>
                    Tutors
                </NavLink>
            </li>
            <li>
                <NavLink to="/study-sessions" onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                        isActive ? "text-accent underline text-lg font-bold" : "text-lg font-medium"}>
                    Study Sessions
                </NavLink>
            </li>
            <li>
                <NavLink to="/contact" onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                        isActive ? "text-accent underline text-lg font-bold" : "text-lg font-medium"}>
                    Contact-us
                </NavLink>
            </li>

            {user && (
                <li>
                    <NavLink to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}
                        className={({ isActive }) =>
                            isActive ? "text-accent underline text-lg font-bold" : "text-lg font-medium"}>
                        Dashboard
                    </NavLink>
                </li>
            )}
        </>
    );

    return (
        <div className="bg-base-100 shadow-sm font-poppins w-full sticky top-0 z-50">
            <div className="navbar container mx-auto px-4">
                {/* Left */}
                <div className="navbar-start">
                    <StudyZoneLogo />
                </div>

                {/* Desktop menu */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">{lists}</ul>
                </div>

                {/* Right */}
                <div className="navbar-end">
                    {user ? (
                        <div className="flex gap-2">
                            {/* Avatar */}
                            <div onClick={handleProfile}  className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img
                                            title={user.displayName}
                                            alt={user.displayName}
                                            src={user?.photoURL}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Mobile Menu Toggle */}
                            <div className="lg:hidden">
                                <button className="btn btn-ghost"
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                                    {isMobileMenuOpen ? "✖" : "☰"}
                                </button>
                            </div>

                            {/* Desktop Logout */}
                            <div className="hidden lg:flex">
                                <NavLink onClick={handleLogOut}
                                    className={({ isActive }) =>
                                        isActive ? "active btn btn-success rounded-lg" : "btn btn-primary hover:btn-success rounded-lg"}>
                                    Log Out
                                </NavLink>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="hidden lg:flex gap-2 font-bold">
                                <NavLink to="/login"
                                    className={({ isActive }) =>
                                        isActive ? "active btn btn-secondary rounded-lg" : "btn btn-secondary hover:btn-accent rounded-lg"}>
                                    LogIn
                                </NavLink>
                            </div>

                            {/* Mobile Menu Toggle */}
                            <div className="lg:hidden">
                                <button className="btn btn-ghost"
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                                    {isMobileMenuOpen ? "✖" : "☰"}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-base-100 shadow-md p-4">
                    <ul className="menu menu-vertical gap-2">
                        {lists}
                        {user ? (
                            <li>
                                <NavLink onClick={handleLogOut}
                                    className={({ isActive }) =>
                                        isActive ? "active btn btn-success rounded-lg mt-2" : "btn btn-primary hover:btn-success rounded-lg mt-2"}>
                                    Log Out
                                </NavLink>
                            </li>
                        ) : (
                            <li>
                                <NavLink to="/login" onClick={() => setIsMobileMenuOpen(false)}
                                    className={({ isActive }) =>
                                        isActive ? "active btn btn-success rounded-lg mt-2" : "btn btn-primary hover:btn-success rounded-lg mt-2"}>
                                    LogIn
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Navbar;