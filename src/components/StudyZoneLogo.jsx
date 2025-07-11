import { Link } from "react-router";
import Logo from "/Logo.png";

const StudyZoneLogo = () => {
    return (
        <div className="flex items-center">
            <div className="avatar">
                <div className="w-12 rounded-xl">
                    <img src={Logo} alt="Logo" />
                </div>
            </div>
            <Link to="/" className="text-secondary font-extrabold text-lg lg:text-2xl uppercase">
                <span className="text-primary">Study</span>Zone
            </Link>
        </div>
    );
};

export default StudyZoneLogo;