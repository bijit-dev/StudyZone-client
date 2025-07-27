import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";

const MyCreatedSessions = () => {
    const { user } = useAuth();
    const axiosSecure = useAxios();
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [resendingId, setResendingId] = useState(null); // track which session is resending

    // Load sessions created by this tutor
    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const res = await axiosSecure.get(`/my-sessions?email=${user.email}`);
                setSessions(res.data);
            } catch (error) {
                console.error("Failed to load sessions", error);
                Swal.fire("Error", "Could not load your sessions.", "error");
            } finally {
                setLoading(false);
            }
        };

        if (user?.email) {
            fetchSessions();
        }
    }, [user, axiosSecure]);

    // Re-send request for rejected session
    const handleResendRequest = async (sessionId) => {
        const confirm = await Swal.fire({
            title: "Reapply for Approval?",
            text: "This will send a new request for the rejected session.",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, Reapply",
        });

        if (!confirm.isConfirmed) return;

        try {
            setResendingId(sessionId);
            const res = await axiosSecure.put(`/reapply-session/${sessionId}`);

            if (res.data.result?.modifiedCount > 0) {
                Swal.fire("Sent!", "Approval request has been re-sent.", "success");

                // Update status locally
                setSessions(prev =>
                    prev.map(session =>
                        session._id === sessionId
                            ? { ...session, status: "pending" }
                            : session
                    )
                );
            } else {
                Swal.fire("Info", "No changes made. Session might already be pending.", "info");
            }
        } catch (error) {
            console.error("Failed to resend request", error);
            Swal.fire("Error", "Something went wrong. Try again.", "error");
        } finally {
            setResendingId(null);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">My Created Sessions</h2>

            {loading ? (
                <p>Loading...</p>
            ) : sessions.length === 0 ? (
                <p>No sessions created yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sessions.map((session) => (
                        <div
                            key={session._id}
                            className="border p-4 rounded-xl shadow hover:shadow-md transition"
                        >
                            <h3 className="text-xl font-semibold">{session.title}</h3>
                            <p className="text-sm text-gray-600 mb-2">{session.description}</p>
                            <p>
                                <strong>Status:</strong>{" "}
                                <span
                                    className={`capitalize font-medium ${session.status === "approved"
                                        ? "text-green-600"
                                        : session.status === "rejected"
                                            ? "text-red-600"
                                            : "text-yellow-500"
                                        }`}
                                >
                                    {session.status}
                                </span>
                            </p>

                            {session.status === "rejected" && (
                                <button
                                    className="mt-3 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 disabled:opacity-50"
                                    onClick={() => handleResendRequest(session._id)}
                                    disabled={resendingId === session._id}
                                >
                                    {resendingId === session._id ? "Resending..." : "Resend Approval Request"}
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyCreatedSessions;