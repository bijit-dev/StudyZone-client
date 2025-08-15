import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { NavLink } from "react-router";

const Profile = () => {
    const { user, signOutUser } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleLogOut = () => {
        setLoading(true);
        signOutUser()
            .then(() => setLoading(false))
            .catch((error) => {
                console.error("Error signing out:", error);
                setLoading(false);
            });
    };

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <p className="text-lg font-medium">You are not logged in.</p>
                <NavLink
                    to="/login"
                    className="btn btn-primary rounded-lg"
                >
                    Go to Login
                </NavLink>
            </div>
        );
    }

    return (
        <div className="max-w-lg mx-auto bg-base-100 shadow-lg rounded-xl p-6 mt-8 font-poppins">
            <div className="flex flex-col items-center text-center">
                {/* Profile Avatar */}
                <div className="w-24 h-24 rounded-full overflow-hidden shadow-md border-2 border-primary">
                    <img
                        src={user?.photoURL || "https://via.placeholder.com/150"}
                        alt={user?.displayName || "User"}
                        className="object-cover w-full h-full"
                    />
                </div>

                {/* Name & Email */}
                <h2 className="mt-4 text-xl font-bold">{user?.displayName || "User"}</h2>
                <p className="text-sm text-gray-500">{user?.email}</p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6 w-full">
                    <NavLink
                        to="/edit-profile"
                        className="btn btn-secondary flex-1"
                    >
                        Edit Profile
                    </NavLink>
                    <button
                        onClick={handleLogOut}
                        disabled={loading}
                        className="btn btn-error flex-1"
                    >
                        {loading ? "Logging Out..." : "Log Out"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
