import { NavLink, Outlet } from 'react-router';
import { FaChalkboardTeacher, FaHome, FaBookOpen, FaPlusCircle, FaClipboardList, FaFolderOpen, FaUpload, FaListUl } from 'react-icons/fa';
import StudyZoneLogo from '../components/StudyZoneLogo';
// import useUserRole from '../hooks/useUserRole';

const DashboardLayout = () => {

    // const { role, roleLoading } = useUserRole();

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
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
                {/* Page content here */}

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <StudyZoneLogo />
                    <li>
                        <NavLink to="/dashboard">
                            <FaHome className="inline-block mr-2" />
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/view-booked-session">
                            <FaBookOpen className="inline-block mr-2" />
                            View Booked Sessions
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/dashboard/create-note">
                            <FaPlusCircle className="inline-block mr-2" />
                            Create Note
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/dashboard/manage-personal-notes">
                            <FaClipboardList className="inline-block mr-2" />
                            Manage Personal Notes
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/dashboard/view-all-study-materials">
                            <FaFolderOpen className="inline-block mr-2" />
                            View All Study Materials
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/create-session">
                            <FaPlusCircle className="inline-block mr-2" />
                            Create Session
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/view-my-sessions">
                            <FaListUl className="inline-block mr-2" />
                            My Created Sessions
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/dashboard/upload-materials">
                            <FaUpload className="inline-block mr-2" />
                            Upload Materials
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/dashboard/view-all-materials">
                            <FaFolderOpen className="inline-block mr-2" />
                            View All Materials
                        </NavLink>
                    </li>




                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;