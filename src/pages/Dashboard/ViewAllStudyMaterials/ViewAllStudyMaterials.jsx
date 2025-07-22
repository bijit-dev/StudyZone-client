import { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";


const ViewAllStudyMaterials = () => {
    const { user } = useAuth();
    const axiosSecure = useAxios();

    const [bookedSessions, setBookedSessions] = useState([]);
    const [selectedSessionId, setSelectedSessionId] = useState(null);
    const [materials, setMaterials] = useState([]);

    // Load booked sessions
    useEffect(() => {
        axiosSecure.get(`/booked-sessions?email=${user?.email}`)
            .then(res => {
                setBookedSessions(res.data);
            });
    }, [axiosSecure, user?.email]);

    // Load materials for selected session
    useEffect(() => {
        if (selectedSessionId) {
            axiosSecure.get(`/study-materials/${selectedSessionId}`)
                .then(res => setMaterials(res.data));
        }
    }, [axiosSecure, selectedSessionId]);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Your Booked Sessions</h2>

            {/* Booked Session Buttons */}
            <div className="flex flex-wrap gap-3 mb-6">
                {bookedSessions.map(session => (
                    <button
                        key={session._id}
                        className={`px-4 py-2 rounded-lg border ${selectedSessionId === session.sessionId
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 hover:bg-blue-100"
                            }`}
                        onClick={() => setSelectedSessionId(session.sessionId)}
                    >
                        {session.sessionTitle}
                    </button>
                ))}
            </div>

            {/* Study Materials */}
            {selectedSessionId && (
                <div>
                    <h3 className="text-xl font-semibold mb-4">Study Materials</h3>
                    {materials.length === 0 ? (
                        <p>No materials found for this session.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {materials.map((item, index) => (
                                <div key={index} className="border rounded-lg p-3 shadow-md">
                                    <img
                                        src={item.imageUrl}
                                        alt="Study Material"
                                        className="w-full h-48 object-cover rounded"
                                    />
                                    <div className="mt-2 flex justify-between items-center">
                                        <a
                                            href={item.imageUrl}
                                            download
                                            className="text-sm text-blue-600 hover:underline"
                                        >
                                            ⬇ Download
                                        </a>
                                        <a
                                            href={item.driveLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-green-600 hover:underline"
                                        >
                                            🔗 Drive Link
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ViewAllStudyMaterials;