import { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loader from "../../../components/Loader";

const ViewBookedSession = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    useEffect(() => {
        if (!user?.email) return;

        axiosSecure.get(`/booked?email=${user.email}`)
            .then(res => {
                setBookings(res.data || []);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch bookings", err);
                setLoading(false);
            });
    }, [user?.email, axiosSecure]);

    if (loading) return <Loader />;

    return (
        <div className="w-full px-2 sm:px-6 lg:px-10 py-10">
            <h1 className="text-2xl font-bold mb-6 text-center">My Booked Sessions</h1>

            {bookings.length === 0 ? (
                <p className="text-gray-500 text-center">You haven’t booked any sessions yet.</p>
            ) : (
                <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
                    <table className="w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-3 text-left font-semibold text-gray-600">#</th>
                                <th className="px-4 py-3 text-left font-semibold text-gray-600">Session Title</th>
                                <th className="px-4 py-3 text-left font-semibold text-gray-600">Tutor</th>
                                <th className="px-4 py-3 text-left font-semibold text-gray-600">Status</th>
                                <th className="px-4 py-3 text-left font-semibold text-gray-600">Paid</th>
                                <th className="px-4 py-3 text-left font-semibold text-gray-600">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {bookings.map((booking, index) => (
                                <tr key={booking._id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3">{index + 1}</td>
                                    <td className="px-4 py-3 font-medium text-gray-900">
                                        {booking.title || "Untitled"}
                                    </td>
                                    <td className="px-4 py-3">{booking.tutorName || "Unknown"}</td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`inline-block px-2 py-1 rounded text-xs font-medium ${booking.status === "confirmed"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                                }`}
                                        >
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        {booking.paid ? (
                                            <span className="text-green-600 font-semibold">Yes</span>
                                        ) : (
                                            <span className="text-red-500 font-semibold">No</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">
                                        <Link
                                            to={`/dashboard/booked-session/${booking.sessionId}`}
                                            className="text-indigo-600 hover:underline font-medium"
                                        >
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>

    );
};

export default ViewBookedSession;