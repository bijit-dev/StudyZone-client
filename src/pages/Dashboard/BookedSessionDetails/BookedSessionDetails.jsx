import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import Loader from "../../../components/Loader";
import SessionReviewSection from "./SessionReviewSection";

const BookedSessionDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxios();
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosSecure.get(`/booked/${id}`)
            .then(res => {
                setBooking(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch booked session", err);
                setLoading(false);
            });
    }, [id, axiosSecure]);

    if (loading) return <Loader />;
    if (!booking) return <p className="text-center text-red-500">Booking not found</p>;

    return (
        <div className="w-full px-4 py-10">
            <div className="w-full bg-white rounded-lg shadow p-6 max-w-screen-xl mx-auto">
                <div className="flex flex-col md:flex-row gap-6">
                    <img
                        src={booking?.photoURL}
                        alt={booking?.title}
                        className="w-full md:w-80 h-56 object-cover rounded-lg"
                    />
                    <div className="flex-1 space-y-2">
                        <h1 className="text-3xl font-bold">{booking.title}</h1>
                        <p><strong className="text-gray-700">Tutor:</strong> {booking.tutorName}</p>
                        <p>
                            <strong className="text-gray-700">Status:</strong>{" "}
                            <span className={`font-semibold ${booking.status === "confirmed" ? "text-green-600" : "text-yellow-500"}`}>
                                {booking.status}
                            </span>
                        </p>
                        <p>
                            <strong className="text-gray-700">Paid:</strong>{" "}
                            <span className={booking.paid ? "text-green-600 font-semibold" : "text-red-500 font-semibold"}>
                                {booking.paid ? "Yes" : "No"}
                            </span>
                        </p>
                        <p><strong className="text-gray-700">Registration Date:</strong> {new Date(booking.registrationDate).toLocaleDateString()}</p>
                    </div>
                </div>

                <div className="mt-6 border-t pt-4 space-y-2 text-gray-800 text-sm md:text-base">
                    <p><strong>Description:</strong> {booking.description || "N/A"}</p>
                    <p><strong>Duration:</strong> {booking.duration || "N/A"}</p>
                    
                    <p><strong>Class Time:</strong> {booking.classStart} → {booking.classEnd}</p>
                    
                </div>
            </div>
            <SessionReviewSection sessionId={booking.sessionId} />
        </div>
    );
};

export default BookedSessionDetails;
