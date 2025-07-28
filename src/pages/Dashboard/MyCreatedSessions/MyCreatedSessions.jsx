import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import Swal from "sweetalert2";

const MyCreatedSessions = () => {
    const { user } = useAuth();
    const axiosSecure = useAxios();
    const queryClient = useQueryClient();

    const { data: sessions = [], isLoading } = useQuery({
        queryKey: ["myCreatedSessions", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-sessions?email=${user.email}`);
            return res.data;
        },
    });

    const approved = sessions.filter(session => session.status === "approved");
    const rejected = sessions.filter(session => session.status === "rejected");

    const resendMutation = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.patch(`/sessions/${id}/resend`, { status: "pending", rejectionFeedback: "", rejectionReason: "" });
            return res.data;
        },
        onSuccess: () => {
            Swal.fire("Resent!", "Approval request has been resent.", "success");
            queryClient.invalidateQueries(["myCreatedSessions"]);
        },
        onError: (error) => {
            Swal.fire("Error", error.message || "Failed to resend request.", "error");
        },
    });

    const handleResendRequest = (id) => {
        Swal.fire({
            title: "Resend Approval Request?",
            text: "Notify admin to re-review your session.",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#aaa",
            confirmButtonText: "Yes, Resend!",
        }).then((result) => {
            if (result.isConfirmed) {
                resendMutation.mutate(id);
            }
        });
    };

    const renderTable = (data, title, badgeColor, allowResend = false, showRejectionDetails = false) => (
        <div className="mb-10 w-full overflow-x-auto">
            <h3 className={`text-xl font-semibold mb-4 text-${badgeColor}-600`}>{title}</h3>
            {data.length === 0 ? (
                <p className="text-gray-500 text-sm">No sessions found.</p>
            ) : (
                <table className="min-w-full text-sm text-gray-800 divide-y divide-gray-200 rounded-lg border border-gray-200">
                    <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="px-4 py-3">#</th>
                            <th className="px-4 py-3">Image</th>
                            <th className="px-4 py-3">Title</th>
                            <th className="px-4 py-3">Registration Start</th>
                            <th className="px-4 py-3">Registration End</th>
                            <th className="px-4 py-3">Class Start</th>
                            <th className="px-4 py-3">Status</th>
                            {showRejectionDetails && (
                                <>
                                    <th className="px-4 py-3">Rejection Reason</th>
                                    <th className="px-4 py-3">Feedback</th>
                                </>
                            )}
                            {allowResend && <th className="px-4 py-3">Action</th>}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {data.map((session, index) => (
                            <tr key={session._id} className="hover:bg-blue-50">
                                <td className="px-4 py-3">{index + 1}</td>
                                <td className="px-4 py-3">
                                    {session.photoURL ? (
                                        <img
                                            src={session?.photoURL}
                                            alt={session.title}
                                            className="h-12 w-12 object-cover rounded"
                                        />
                                    ) : (
                                        <div className="h-12 w-12 bg-gray-200 flex items-center justify-center rounded text-gray-400 text-xs">
                                            No Image
                                        </div>
                                    )}
                                </td>
                                <td className="px-4 py-3 font-semibold">{session.title}</td>
                                <td className="px-4 py-3">{session.registrationStart}</td>
                                <td className="px-4 py-3">{session.registrationEnd}</td>
                                <td className="px-4 py-3">{session.classStart}</td>
                                <td className="px-4 py-3">
                                    <span className={`inline-block px-2 py-1 text-xs rounded-full bg-${badgeColor}-100 text-${badgeColor}-700`}>
                                        {session.status}
                                    </span>
                                </td>
                                {showRejectionDetails && (
                                    <>
                                        <td className="px-4 py-3 text-red-600">
                                            {session.rejectionReason || "N/A"}
                                        </td>
                                        <td className="px-4 py-3 text-gray-700">
                                            {session.rejectionFeedback || "No feedback"}
                                        </td>
                                    </>
                                )}
                                {allowResend && (
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() => handleResendRequest(session._id)}
                                            className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded"
                                        >
                                            Resend Request
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8 bg-white rounded-xl shadow-xl">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-gray-800">
                My Created Sessions
            </h2>

            {isLoading ? (
                <div className="text-center text-blue-500 font-medium animate-pulse">
                    Loading your sessions...
                </div>
            ) : (
                <>
                    {renderTable(approved, "Approved Sessions", "green")}
                    {renderTable(rejected, "Rejected Sessions", "red", true, true)}
                </>
            )}
        </div>
    );
};

export default MyCreatedSessions;