import { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const UploadMaterials = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [selectedSessionId, setSelectedSessionId] = useState("");
    const [loading, setLoading] = useState(false);

    // ✅ Fetch approved sessions using TanStack Query
    const { data: approvedSessions = [], isLoading: sessionsLoading } = useQuery({
        queryKey: ["approvedSessions", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-sessions?email=${user.email}`);
            return res.data.filter((session) => session.status === "approved");
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const title = form.title.value.trim();
        const sessionId = form.sessionId.value;
        const tutorEmail = form.tutorEmail.value;
        const driveLink = form.driveLink.value.trim();
        const imageFile = form.image.files[0];

        if (!imageFile) {
            Swal.fire("Error", "Please select an image file.", "error");
            setLoading(false);
            return;
        }

        try {
            // ✅ Upload image to ImgBB
            const imageFormData = new FormData();
            imageFormData.append("image", imageFile);

            const imgRes = await fetch(
                `https://api.imgbb.com/1/upload?key=3c823c20841b57865bed1f6729b05fca`,
                {
                    method: "POST",
                    body: imageFormData,
                }
            );

            const imgData = await imgRes.json();
            if (!imgData.success) throw new Error("Image upload failed");

            const imageURL = imgData.data.display_url;

            // ✅ Send material to backend
            const material = {
                title,
                sessionId,
                tutorEmail,
                imageURL,
                resourceLink: driveLink,
                uploadedAt: new Date(),
            };

            const res = await axiosSecure.post("/materials", material);
            if (res.data.insertedId) {
                Swal.fire("Success", "Material uploaded successfully!", "success");
                form.reset();
                setSelectedSessionId(""); // optional reset
            } else {
                throw new Error("Failed to save material");
            }
        } catch (err) {
            console.error("Upload failed", err);
            Swal.fire("Error", err.message || "Upload failed", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Upload Study Materials</h2>

            <label className="block mb-2 font-medium">Select Approved Session:</label>
            <select
                onChange={(e) => setSelectedSessionId(e.target.value)}
                value={selectedSessionId}
                className="w-full p-2 mb-6 border rounded"
                disabled={sessionsLoading}
            >
                <option value="">-- Choose a session --</option>
                {approvedSessions.map((session) => (
                    <option key={session._id} value={session._id}>
                        {session.title}
                    </option>
                ))}
            </select>

            {selectedSessionId && (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="title"
                        placeholder="Material Title"
                        className="w-full p-2 border rounded"
                        required
                        disabled={loading}
                    />

                    <input
                        type="text"
                        name="sessionId"
                        value={selectedSessionId}
                        readOnly
                        className="w-full p-2 border rounded bg-gray-100"
                    />

                    <input
                        type="email"
                        name="tutorEmail"
                        value={user.email}
                        readOnly
                        className="w-full p-2 border rounded bg-gray-100"
                    />

                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        className="w-full p-2 border rounded"
                        required
                        disabled={loading}
                    />

                    <input
                        type="url"
                        name="driveLink"
                        placeholder="Google Drive Link"
                        className="w-full p-2 border rounded"
                        required
                        disabled={loading}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 rounded text-white ${loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                            }`}
                    >
                        {loading ? "Uploading..." : "Upload Material"}
                    </button>
                </form>
            )}
        </div>
    );
};

export default UploadMaterials;