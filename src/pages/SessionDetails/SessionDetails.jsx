import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import SessionReviewDisplay from "./SessionReviewDisplay";

const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

const SessionDetails = () => {
    const { id } = useParams();
    const [session, setSession] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [bookingData, setBookingData] = useState([]);

    useEffect(() => {
        if (!id || !user?.email) return;

        axiosSecure.get(`/session/${id}`)
            .then((res) => setSession(res.data))
            .catch(() => { });

        axiosSecure.get(`/users/${user.email}`)
            .then((res) => setCurrentUser(res.data))
            .catch(() => { });
    }, [id, user?.email, axiosSecure]);

    useEffect(() => {
        if (!user?.email) return;

        axiosSecure.get(`/booked?email=${user.email}`)
            .then((res) => setBookingData(res.data))
            .catch(() => { });
    }, [user?.email, axiosSecure]);

    const newBookingData = bookingData.find(
        (data) => data?.sessionId === session?._id && data?.email === user?.email
    );

    const handleBooking = () => {
        if (!id) return;

        if (session.registrationFee === 0) {
            const { _id, ...bookingInfo } = session;
            bookingInfo.sessionId = id;
            bookingInfo.email = user.email;
            bookingInfo.status = "confirmed";
            bookingInfo.paid = true;
            bookingInfo.registrationDate = new Date();

            axiosSecure.post("/booking", bookingInfo).then((res) => {
                if (res.data.insertedId) {
                    Swal.fire("Booking Successful", "You’ve booked the session.", "success");
                    navigate("/dashboard/view-booked-session");
                }
            });
        } else {
            navigate(`/dashboard/payment/${id}`);
        }
    };

    if (!session || !currentUser) return <Loader />;

    const now = new Date();
    const isClosed = new Date(session.registrationEnd) < now;
    const isUpcoming = new Date(session.registrationStart) > now;
    const canBook = !isClosed && user && currentUser?.role === "student" && !newBookingData;

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200 transition hover:shadow-2xl">
                <img
                    src={session.photoURL}
                    alt={session.title}
                    className="w-full h-[300px] sm:h-[400px] object-cover rounded-t-3xl"
                />

                <div className="p-6 sm:p-8">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-700 mb-3">
                        {session.title}
                    </h1>

                    <p className="text-gray-600 mb-6 text-sm sm:text-base leading-relaxed">
                        {session.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm sm:text-base text-gray-700 mb-6">
                        <div>
                            <span className="font-medium">👨‍🏫 Tutor:</span> {session.tutorName}
                        </div>
                        <div>
                            <span className="font-medium">📧 Email:</span> {session.tutorEmail}
                        </div>
                        <div>
                            <span className="font-medium">🗓️ Registration:</span><br />
                            {formatDate(session.registrationStart)} → {formatDate(session.registrationEnd)}
                        </div>
                        <div>
                            <span className="font-medium">🕘 Class Schedule:</span><br />
                            {formatDate(session.classStart)} → {formatDate(session.classEnd)}
                        </div>
                        <div>
                            <span className="font-medium">⏱️ Duration:</span> {session.duration}
                        </div>
                        <div>
                            <span className="font-medium">💵 Fee:</span>{" "}
                            {session.registrationFee === 0 ? (
                                <span className="text-green-600 font-semibold">Free</span>
                            ) : (
                                <span className="text-gray-800 font-semibold">${session.registrationFee}</span>
                            )}
                        </div>
                        <div>
                            <span className="font-medium">📌 Status:</span>{" "}
                            <span className={`font-semibold ${isUpcoming
                                ? "text-blue-600"
                                : isClosed
                                    ? "text-gray-500"
                                    : "text-green-600"
                                }`}>
                                {isUpcoming ? "Upcoming" : isClosed ? "Closed" : "Ongoing"}
                            </span>
                        </div>
                    </div>

                    {/* Booking Button */}
                    <div className="mt-6">
                        {newBookingData ? (
                            <div className="flex flex-col gap-2">
                                <button
                                    disabled
                                    className="w-full bg-gray-300 text-gray-600 font-semibold px-4 py-3 rounded-xl cursor-not-allowed"
                                >
                                    ✅ Already Booked
                                </button>
                                {newBookingData.paid ? (
                                    <span className="text-green-600 font-medium">💰 Payment Complete</span>
                                ) : (
                                    <span className="text-yellow-600 font-medium">⌛ Payment Pending</span>
                                )}
                            </div>
                        ) : (
                            <button
                                onClick={handleBooking}
                                disabled={!canBook}
                                className={`w-full px-4 py-3 rounded-xl transition duration-300 font-semibold 
                    ${canBook ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                                        : "bg-gray-300 text-gray-600 cursor-not-allowed"
                                    }`}
                            >
                                {canBook ? "🚀 Book Now" : "🚫 DO NOT BOOK SESSION"}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-12">
                <SessionReviewDisplay sessionId={id} />
            </div>
        </div>
    );
};

export default SessionDetails;
