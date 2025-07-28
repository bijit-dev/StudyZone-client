import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router";
import useAxios from "../../../hooks/useAxios";

const SessionUpdate = () => {
    const { id } = useParams();
    const axiosSecure = useAxios();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [sessionData, setSessionData] = useState(null);

    const { isLoading, isError, error } = useQuery({
        queryKey: ["session", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/sessions/${id}`);
            setSessionData(res.data);
            return res.data;
        },
        onSuccess: (data) => {
            setSessionData(data);
        },
    });

    const updateMutation = useMutation({
        mutationFn: (updatedSession) => axiosSecure.patch(`/sessions/${id}`, updatedSession),
        onSuccess: () => {
            Swal.fire("Updated!", "Session has been updated.", "success");
            queryClient.invalidateQueries({ queryKey: ["session", id] });
            navigate("../view-all-sessions");
        },
        onError: () => {
            Swal.fire("Error", "Update failed", "error");
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSessionData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateMutation.mutate(sessionData);
    };

    if (isLoading)
        return <div className="text-center py-8 text-blue-500">Loading session...</div>;
    if (isError)
        return (
            <div className="text-center py-8 text-red-500">
                Error: {error.message || "Failed to load session"}
            </div>
        );

    return (
        <div className="max-w-4xl mx-auto p-6 sm:p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-8 text-center text-gray-800">
                Update Session
            </h2>
            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8"
            >
                {/* Session Title */}
                <div>
                    <label
                        htmlFor="title"
                        className="block text-sm sm:text-base font-medium text-gray-700 mb-2"
                    >
                        Session Title
                    </label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        value={sessionData?.title || ""}
                        onChange={handleChange}
                        placeholder="Enter session title"
                        className="w-full border border-gray-300 rounded-md p-2 sm:p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Photo URL */}
                <div>
                    <label
                        htmlFor="photoURL"
                        className="block text-sm sm:text-base font-medium text-gray-700 mb-2"
                    >
                        Photo URL
                    </label>
                    <input
                        id="photoURL"
                        name="photoURL"
                        type="url"
                        value={sessionData?.photoURL || ""}
                        onChange={handleChange}
                        placeholder="Enter photo URL"
                        className="w-full border border-gray-300 rounded-md p-2 sm:p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Tutor Name */}
                <div>
                    <label
                        htmlFor="tutorName"
                        className="block text-sm sm:text-base font-medium text-gray-700 mb-2"
                    >
                        Tutor Name
                    </label>
                    <input
                        id="tutorName"
                        name="tutorName"
                        type="text"
                        value={sessionData?.tutorName || ""}
                        onChange={handleChange}
                        placeholder="Enter tutor name"
                        className="w-full border border-gray-300 rounded-md p-2 sm:p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Tutor Email */}
                <div>
                    <label
                        htmlFor="tutorEmail"
                        className="block text-sm sm:text-base font-medium text-gray-700 mb-2"
                    >
                        Tutor Email
                    </label>
                    <input
                        id="tutorEmail"
                        name="tutorEmail"
                        type="email"
                        value={sessionData?.tutorEmail || ""}
                        onChange={handleChange}
                        placeholder="Enter tutor email"
                        className="w-full border border-gray-300 rounded-md p-2 sm:p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Registration Start Date */}
                <div>
                    <label
                        htmlFor="registrationStart"
                        className="block text-sm sm:text-base font-medium text-gray-700 mb-2"
                    >
                        Registration Start
                    </label>
                    <input
                        id="registrationStart"
                        name="registrationStart"
                        type="date"
                        value={sessionData?.registrationStart?.slice(0, 10) || ""}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2 sm:p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Registration End Date */}
                <div>
                    <label
                        htmlFor="registrationEnd"
                        className="block text-sm sm:text-base font-medium text-gray-700 mb-2"
                    >
                        Registration End
                    </label>
                    <input
                        id="registrationEnd"
                        name="registrationEnd"
                        type="date"
                        value={sessionData?.registrationEnd?.slice(0, 10) || ""}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2 sm:p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Class Start Date */}
                <div>
                    <label
                        htmlFor="classStart"
                        className="block text-sm sm:text-base font-medium text-gray-700 mb-2"
                    >
                        Class Start
                    </label>
                    <input
                        id="classStart"
                        name="classStart"
                        type="date"
                        value={sessionData?.classStart?.slice(0, 10) || ""}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2 sm:p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Class End Date */}
                <div>
                    <label
                        htmlFor="classEnd"
                        className="block text-sm sm:text-base font-medium text-gray-700 mb-2"
                    >
                        Class End
                    </label>
                    <input
                        id="classEnd"
                        name="classEnd"
                        type="date"
                        value={sessionData?.classEnd?.slice(0, 10) || ""}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2 sm:p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Duration */}
                <div>
                    <label
                        htmlFor="duration"
                        className="block text-sm sm:text-base font-medium text-gray-700 mb-2"
                    >
                        Duration
                    </label>
                    <input
                        id="duration"
                        name="duration"
                        type="text"
                        value={sessionData?.duration || ""}
                        onChange={handleChange}
                        placeholder="Enter duration"
                        className="w-full border border-gray-300 rounded-md p-2 sm:p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Registration Fee */}
                <div>
                    <label
                        htmlFor="registrationFee"
                        className="block text-sm sm:text-base font-medium text-gray-700 mb-2"
                    >
                        Registration Fee
                    </label>
                    <input
                        id="registrationFee"
                        name="registrationFee"
                        type="number"
                        min="0"
                        value={sessionData?.registrationFee || 0}
                        onChange={handleChange}
                        placeholder="Enter registration fee"
                        className="w-full border border-gray-300 rounded-md p-2 sm:p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Description (textarea full width) */}
                <div className="sm:col-span-2">
                    <label
                        htmlFor="description"
                        className="block text-sm sm:text-base font-medium text-gray-700 mb-2"
                    >
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        rows={4}
                        value={sessionData?.description || ""}
                        onChange={handleChange}
                        placeholder="Enter description"
                        className="w-full border border-gray-300 rounded-md p-2 sm:p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Submit Button full width */}
                <div className="sm:col-span-2">
                    <button
                        type="submit"
                        disabled={updateMutation.isLoading}
                        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors duration-300"
                    >
                        {updateMutation.isLoading ? "Updating..." : "Update Session"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SessionUpdate;
