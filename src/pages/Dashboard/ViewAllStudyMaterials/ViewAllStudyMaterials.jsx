import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";

const ViewAllStudyMaterials = () => {
    const { user } = useAuth();
    const axiosSecure = useAxios();

    // Fetch booked sessions
    const { data: bookedSessions = [], isLoading: loadingSessions } = useQuery({
        queryKey: ["bookedSessions", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/booked?email=${user.email}`);
            return res.data;
        },
    });

    // Fetch study materials
    const { data: materials = [], isLoading: loadingMaterials } = useQuery({
        queryKey: ["studyMaterials", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/materials?email=${user.email}`);
            return res.data;
        },
    });

    // Get all sessionIds the user has booked
    const bookedSessionIds = bookedSessions.map((s) => s.sessionId);

    // Filter only materials from booked sessions
    const filteredMaterials = materials.filter((material) =>
        bookedSessionIds.includes(material.sessionId)
    );

    // JS-based download (works with external URLs too)
    const handleDownload = async (url) => {
        try {
            const response = await fetch(url, { mode: "cors" });
            const blob = await response.blob();
            const blobURL = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = blobURL;

            // Extract file name from URL or use default
            const filename = url.split("/").pop()?.split("?")[0] || "material-image.jpg";
            link.download = filename;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobURL);
        } catch (err) {
            console.error("Download failed:", err);
            alert("Failed to download image. Please try again.");
        }
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-2xl font-bold text-center mb-6">Study Materials</h2>

            {loadingSessions || loadingMaterials ? (
                <p className="text-center">Loading materials...</p>
            ) : filteredMaterials.length === 0 ? (
                <p className="text-center text-gray-500">
                    No materials available for your booked sessions.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {filteredMaterials.map((material) => (
                        <div
                            key={material._id}
                            className="border p-3 rounded bg-gray-50 shadow-sm hover:shadow-md transition"
                        >
                            <img
                                src={material.imageURL}
                                alt="Study Material"
                                className="w-full h-48 object-cover rounded mb-3"
                            />
                            <h1 className="font-bold text-xl py-4">{material.title}</h1>
                            <div className="flex justify-between items-center gap-2">
                                <button
                                    onClick={() => handleDownload(material.imageURL)}
                                    className="btn btn-sm btn-outline w-1/2"
                                >
                                    Download
                                </button>
                                <a
                                    href={material.resourceLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-sm btn-success w-1/2"
                                >
                                    Drive Link
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ViewAllStudyMaterials;