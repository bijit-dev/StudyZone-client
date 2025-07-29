import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";

const ViewAllSessions = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    // Fetch all sessions
    const { data: sessions = [], isLoading } = useQuery({
        queryKey: ["allSessions"],
        queryFn: async () => {
            const res = await axiosSecure.get("/sessions");
            return res.data;
        },
    });

    // Approve session
    const approveSession = useMutation({
        mutationFn: async ({ id, payment }) => {
            const res = await axiosSecure.patch(`/sessions/${id}/approve`, payment);
            return res.data;
        },
        onSuccess: () => {
            Swal.fire("Approved!", "Session has been approved.", "success");
            queryClient.invalidateQueries(["allSessions"]);
        },
        onError: (error) => {
            Swal.fire("Error!", error.response?.data?.message || "Approval failed", "error");
        },
    });

    // Reject session
    const handleReject = async (sessionId) => {
        const { value: formValues } = await Swal.fire({
            title: "Reject Session",
            html:
                `<input id="reason" class="swal2-input" placeholder="Rejection Reason">` +
                `<textarea id="feedback" class="swal2-textarea" placeholder="Additional Feedback"></textarea>`,
            focusConfirm: false,
            showCancelButton: true,
            preConfirm: () => {
                const reason = document.getElementById("reason").value;
                const feedback = document.getElementById("feedback").value;
                if (!reason.trim()) {
                    Swal.showValidationMessage("Rejection reason is required");
                    return false;
                }
                return { rejectionReason: reason, rejectionFeedback: feedback };
            }
        });

        console.log(formValues);


        if (formValues) {
            try {
                const res = await axiosSecure.patch(`/sessions/${sessionId}/reject`, formValues);
                if (res.data.modifiedCount > 0) {
                    Swal.fire("Rejected!", "The session has been marked as rejected.", "success");
                    queryClient.invalidateQueries(["allSessions"]);
                }
            } catch (e) {
                Swal.fire("Error", e.response?.data?.message || "Rejection failed", "error");
            }
        }
    };

    // Delete session
    const deleteSession = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.delete(`/sessions/${id}`);
            return res.data;
        },
        onSuccess: () => {
            Swal.fire("Deleted!", "Session has been deleted.", "success");
            queryClient.invalidateQueries(["allSessions"]);
        },
        onError: (error) => {
            Swal.fire("Error!", error.response?.data?.message || "Deletion failed", "error");
        },
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteSession.mutate(id);
            }
        });
    };

    const handleUpdate = (sessionId) => {
        navigate(`/dashboard/SessionUpdate/${sessionId}`);
    };

    const handleApprove = (sessionId) => {
        Swal.fire({
            title: "Is this session free or paid?",
            input: "radio",
            inputOptions: {
                free: "Free",
                paid: "Paid",
            },
            inputValidator: (value) => {
                if (!value) return "You need to choose one!";
            },
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                const sessionType = result.value;
                if (sessionType === "paid") {
                    Swal.fire({
                        title: "Enter Registration Fee",
                        input: "number",
                        inputPlaceholder: "Enter fee",
                        inputAttributes: { min: 1 },
                        showCancelButton: true,
                    }).then((res) => {
                        if (res.isConfirmed) {
                            approveSession.mutate({
                                id: sessionId,
                                payment: { isPaid: true, registrationFee: Number(res.value) },
                            });
                        }
                    });
                } else {
                    approveSession.mutate({
                        id: sessionId,
                        payment: { isPaid: false, registrationFee: 0 },
                    });
                }
            }
        });
    };

    // Render table by status
    const renderTable = (statusLabel, sessionsList) => (
        <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4 capitalize text-gray-800">
                {statusLabel} Sessions
            </h2>

            {sessionsList.length === 0 ? (
                <p className="text-sm text-gray-500">No {statusLabel} sessions found.</p>
            ) : (
                <div className="overflow-x-auto rounded border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200 text-sm text-left text-gray-700">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-3">#</th>
                                <th className="px-4 py-3">Image</th>
                                <th className="px-4 py-3">Title</th>
                                <th className="px-4 py-3">Tutor</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {sessionsList.map((session, index) => (
                                <tr key={session._id} className="hover:bg-blue-50">
                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2">
                                        <img
                                            src={session.photoURL || "/placeholder.jpg"}
                                            alt="session"
                                            className="w-12 h-12 rounded object-cover border"
                                        />
                                    </td>
                                    <td className="px-4 py-2 font-medium">{session.title}</td>
                                    <td className="px-4 py-2">{session.tutorEmail}</td>
                                    <td className="px-4 py-2 capitalize">{session.status}</td>
                                    <td className="px-4 py-2 space-x-2">
                                        {session.status === "pending" && (
                                            <>
                                                <button
                                                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs disabled:opacity-50"
                                                    onClick={() => handleApprove(session._id)}
                                                    disabled={approveSession.isPending}
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                                                    onClick={() => handleReject(session._id)}
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        )}
                                        {session.status === "approved" && (
                                            <>
                                                <button
                                                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs"
                                                    onClick={() => handleUpdate(session._id)}
                                                >
                                                    Update
                                                </button>
                                                <button
                                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs disabled:opacity-50"
                                                    onClick={() => handleDelete(session._id)}
                                                    disabled={deleteSession.isPending}
                                                >
                                                    Delete
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );

    if (isLoading) {
        return (
            <div className="text-center text-blue-500 py-10">Loading sessions...</div>
        );
    }

    const pendingSessions = sessions.filter((s) => s.status === "pending");
    const approvedSessions = sessions.filter((s) => s.status === "approved");

    return (
        <main className="container mx-auto px-4 py-8 bg-white rounded-xl shadow-lg">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                Manage Study Sessions
            </h1>

            {renderTable("pending", pendingSessions)}
            {renderTable("approved", approvedSessions)}
        </main>
    );
};

export default ViewAllSessions;
