import { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import Loader from "../../../components/Loader";

const ViewBookedSession = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxios();
    const { user } = useAuth();

    useEffect(() => {
        if (!user?.email) return;

        axiosSecure.get(`/bookings?email=${user.email}`)
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
        <div className="max-w-4xl mx-auto px-4 py-10">
            <h1 className="text-2xl font-bold mb-6">My Booked Sessions</h1>
            {bookings.length === 0 ? (
                <p className="text-gray-500">You haven’t booked any sessions yet.</p>
            ) : (
                <ul className="space-y-4">
                    {bookings.map(booking => (
                        <li key={booking._id} className="border p-4 rounded shadow">
                            <h2 className="text-xl font-semibold">{booking.title}</h2>
                            <p className="text-sm text-gray-600">{booking.tutorName}</p>
                            <Link
                                to={`/session-details/${booking.sessionId}`}
                                className="text-indigo-600 font-medium mt-2 inline-block"
                            >
                                View Details
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ViewBookedSession;