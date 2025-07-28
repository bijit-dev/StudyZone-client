import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { Link } from "react-router";

const StudySessions = () => {
    const axiosSecure = useAxios();

    const { data: sessions = [], isLoading } = useQuery({
        queryKey: ["availableSessions"],
        queryFn: async () => {
            const res = await axiosSecure.get("/sessions/available");
            return res.data;
        },
    });

    if (isLoading) {
        return <div className="text-center py-10 text-blue-500">Loading sessions...</div>;
    }

    return (
        <section className="container mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                Available Study Sessions
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sessions.map((session, index) => (
                    <div
                        key={index}
                        className=" relative bg-white shadow-md rounded-xl border border-gray-200 hover:shadow-lg transition overflow-hidden"
                    >
                        {/* Image */}
                        <img
                            src={session.session.photoURL || "/placeholder.jpg"}
                            alt={session.session.title}
                            className="w-full h-48 object-cover"
                        />
                        <span
                            className={`px-3 py-1 absolute top-3 right-3 rounded-full text-xs font-medium ${session.status === "ongoing"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                                }`}
                        >
                            {session.status}
                        </span>
                        <div className="p-4">
                            {/* Title */}
                            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                                {session.session.title}
                            </h2>


                            {/* Tutor & Dates */}
                            <div className="text-base text-gray-500 mb-3 space-y-1">
                                <p><span className="font-bold">Tutor:</span> {session.session.tutorName}</p>
                                <p><span className="font-bold">Registration:</span> {session.session.registrationStart?.slice(0, 10)} → {session.session.registrationEnd?.slice(0, 10)}</p>
                                <p><span className="font-bold">Class Starts:</span> {session.session.classStart?.slice(0, 10)}</p>
                            </div>

                            {/* Link */}
                            <Link
                                to={`/session/${session.session._id}`}
                                className="btn w-full btn-secondary text-base font-bold hover:underline"
                            >
                                Read More →
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default StudySessions;
