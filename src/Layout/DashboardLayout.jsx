import { NavLink, Outlet } from 'react-router';
import { FaChalkboardTeacher, FaHome, FaBookOpen, FaPlusCircle, FaClipboardList, FaFolderOpen, FaUpload, FaListUl, FaUsers, FaSignOutAlt } from 'react-icons/fa';
import StudyZoneLogo from '../components/StudyZoneLogo';
import useUserRole from '../hooks/useUserRole';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';
import { useRef } from 'react';

const DashboardLayout = () => {
    const { role, roleLoading } = useUserRole();
    const { signOutUser } = useAuth();
    const drawerToggleRef = useRef(null);

    const handleLogOut = () => {
        signOutUser()
            .then(() => {
                Swal.fire({
                    title: 'Logged out successfully',
                    icon: 'success',
                    timer: 1000,
                    showConfirmButton: false
                });
            })
            .catch((error) => {
                console.error("Error signing out:", error);
            });
    }

    const closeDrawer = () => {
        if (drawerToggleRef.current) {
            drawerToggleRef.current.checked = false;
        }
    };

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" ref={drawerToggleRef} />
            <div className="drawer-content flex flex-col">

                {/* Navbar */}
                <div className="navbar bg-base-300 w-full lg:hidden">
                    <div className="flex-none ">
                        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>
                </div>
                {/* Page content here */}
                <Outlet></Outlet>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    <div className="flex justify-end lg:hidden">
                        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </label>
                    </div>
                    {/* Sidebar content here */}
                    <StudyZoneLogo />
                    <li>
                        <NavLink to="/dashboard" onClick={closeDrawer}>
                            <FaHome className="inline-block mr-2" />
                            Home
                        </NavLink>
                    </li>
                    {/* student routes */}
                    {!roleLoading && role === 'student' && <>
                        <li>
                            <NavLink to="/dashboard/view-booked-session" onClick={closeDrawer}>
                                <FaBookOpen className="inline-block mr-2" />
                                View Booked Sessions
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/dashboard/create-note" onClick={closeDrawer}>
                                <FaPlusCircle className="inline-block mr-2" />
                                Create Note
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/dashboard/manage-personal-notes" onClick={closeDrawer}>
                                <FaClipboardList className="inline-block mr-2" />
                                Manage Personal Notes
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/dashboard/view-all-study-materials" onClick={closeDrawer}>
                                <FaFolderOpen className="inline-block mr-2" />
                                View All Study Materials
                            </NavLink>
                        </li></>}

                    {/* tutor routes  */}
                    {role === 'tutor' && !roleLoading && <>
                        <li>
                            <NavLink to="/dashboard/create-session" onClick={closeDrawer}>
                                <FaPlusCircle className="inline-block mr-2" />
                                Create Session
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/view-my-sessions" onClick={closeDrawer}>
                                <FaListUl className="inline-block mr-2" />
                                My Created Sessions
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/dashboard/upload-materials" onClick={closeDrawer}>
                                <FaUpload className="inline-block mr-2" />
                                Upload Materials
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/dashboard/view-all-materials" onClick={closeDrawer}>
                                <FaFolderOpen className="inline-block mr-2" />
                                View All Materials
                            </NavLink>
                        </li>
                    </>}

                    {/* admin routes */}
                    {role === 'admin' && !roleLoading && <>
                        <li>
                            <NavLink to="/dashboard/view-all-users" onClick={closeDrawer}>
                                <FaUsers className="inline-block mr-2" />
                                View All Users
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/dashboard/view-all-sessions" onClick={closeDrawer}>
                                <FaChalkboardTeacher className="inline-block mr-2" />
                                View All Sessions
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/dashboard/all-materials" onClick={closeDrawer}>
                                <FaFolderOpen className="inline-block mr-2" />
                                All Materials
                            </NavLink>
                        </li>
                    </>}

                    <li>
                        <NavLink to="/" onClick={() => { handleLogOut(); closeDrawer(); }}>
                            <FaSignOutAlt className="inline-block mr-2" />
                            Log Out
                        </NavLink>
                    </li>

                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;