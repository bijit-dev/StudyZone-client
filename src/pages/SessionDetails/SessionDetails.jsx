import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

const SessionDetails = () => {
    const { id } = useParams();
    const [session, setSession] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const axiosSecure = useAxios();
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!id || !user?.email) return;

        // Fetch session details
        axiosSecure.get(`/session/${id}`)
            .then((res) => setSession(res.data))
            .catch((err) => {
                console.error("Failed to load session:", err);
            });

        // Fetch current user
        axiosSecure.get(`/users/${user.email}`)
            .then(res => {
                setCurrentUser(res.data);
            })
            .catch(err => console.error("Failed to load user:", err));

    }, [id, user?.email, axiosSecure]);

    const [bookingData, setBookingData] = useState([]);
    useEffect(() => {
        axiosSecure.get(`/bookings`)
            .then(res => setBookingData(res.data))
            .catch(err => console.error("Failed to load bookings:", err));
    }, [user.email, axiosSecure]);

    const newBookingData = bookingData?.find(data => data?.sessionId === session?._id && data?.email === user?.email);

    const handleBooking = () => {
        if (session.registrationFee === 0) {
            // Free session – Book directly
            const { _id, ...bookingInfo } = session;
            bookingInfo.sessionId = id;
            bookingInfo.email = user.email;
            bookingInfo.status = "confirmed";
            bookingInfo.paid = true;
            bookingInfo.registrationDate = new Date();

            axiosSecure.post("/booking", bookingInfo)
                .then((res) => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            title: "Booking Successful",
                            text: "You have successfully booked this session.",
                            icon: "success",
                            confirmButtonText: "OK"
                        });
                        navigate("/dashboard/view-booked-session");
                    }
                })
                .catch(() => {
                    alert("Failed to book the session");
                });

        } else if (session.registrationFee > 0) {
            // Paid session – Redirect to payment
            // navigate(`/payment?sessionId=${session._id}`);
        }
    };

    if (!session) return <Loader />;

    const now = new Date();
    const isRegistrationClosed = new Date(session.registrationEnd) < now;
    const isUpcoming = new Date(session.registrationStart) > now;

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">

                <img
                    src={session?.photoURL}
                    alt={session?.title}
                    className="w-full h-64 object-cover"
                />

                <div className="p-6">
                    <h1 className="text-3xl font-bold text-indigo-700 mb-2">{session?.title}</h1>
                    <p className="text-gray-600 text-sm mb-6">{session?.description}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 mb-4">
                        <p><strong>Tutor:</strong> {session?.tutorName}</p>
                        <p><strong>Email:</strong> {session?.tutorEmail}</p>
                        <p><strong>Rating:</strong> ⭐ {session?.averageRating || "No ratings yet"}</p>
                        <p><strong>Registration Period:</strong><br />
                            {formatDate(session?.registrationStart)} → {formatDate(session?.registrationEnd)}
                        </p>
                        <p><strong>Class Schedule:</strong><br />
                            {formatDate(session?.classStart)} → {formatDate(session?.classEnd)}
                        </p>
                        <p><strong>Session Duration:</strong> {session?.duration}</p>
                        <p><strong>Registration Fee:</strong>{" "}
                            {session?.registrationFee === 0 ? (
                                <span className="text-green-600 font-semibold">Free</span>
                            ) : (
                                `$${session?.registrationFee}`
                            )}
                        </p>
                        <p><strong>Status:</strong>{" "}
                            <span className={`font-semibold ${isUpcoming ? "text-blue-600" : isRegistrationClosed ? "text-gray-500" : "text-green-600"}`}>
                                {isUpcoming ? "Upcoming" : isRegistrationClosed ? "Closed" : "Ongoing"}
                            </span>
                        </p>
                    </div>

                    {/* Reviews */}
                    <div className="mt-8">
                        <h3 className="text-lg font-semibold mb-2">Student Reviews</h3>
                        {session?.reviews && session?.reviews.length > 0 ? (
                            <ul className="space-y-3">
                                {session?.reviews.map((review, index) => (
                                    <li
                                        key={index}
                                        className="bg-gray-50 border border-gray-200 p-3 rounded-md text-sm"
                                    >
                                        {review}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-gray-500">No reviews yet.</p>
                        )}
                    </div>

                    {/* Book Button */}
                    {newBookingData ?
                        <div className="mt-6">
                            <button
                                disabled
                                className="w-full bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed"
                            >
                                Already Booked
                            </button>
                        </div>
                        : <div className="mt-6">
                            {isRegistrationClosed || !user || currentUser?.role !== "student" ? (
                                <button
                                    disabled
                                    className="w-full bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed"
                                >
                                    Registration Closed
                                </button>
                            ) : (
                                <button
                                    onClick={handleBooking}
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
                                >
                                    Book Now
                                </button>
                            )}
                        </div>}
                </div>
            </div>
        </div>
    );
};

export default SessionDetails;