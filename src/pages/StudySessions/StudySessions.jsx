import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import StudyScssionCard from "./StudyScssionCard";
import Loader from "../../components/Loader";

const StudySessions = () => {
    const axiosSecure = useAxios();

    const { data: sessions = [], isLoading, isError } = useQuery({
        queryKey: ["studySessions"],
        queryFn: async () => {
            const res = await axiosSecure.get("/sessions"); // Adjust API endpoint
            return res.data;
        },
    });

    if (isLoading) return <Loader/>;

    if (isError) {
        return (
            <div className="text-center py-10 text-red-500">Failed to load sessions.</div>
        );
    }

    const now = new Date();

    // Separate sessions by status
    const upcomingSessions = sessions.filter(
        (s) => new Date(s.registrationStart) > now
    );
    const ongoingSessions = sessions.filter(
        (s) =>
            new Date(s.registrationStart) <= now && new Date(s.registrationEnd) >= now
    );
    const closedSessions = sessions.filter(
        (s) => new Date(s.registrationEnd) < now
    );



    return (
        <div className="container mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-center mb-10">Study Sessions</h2>

            {/* Ongoing */}
            {ongoingSessions.length > 0 && (
                <>
                    <h3 className="text-2xl font-semibold mb-6 text-green-700">Ongoing</h3>
                    <div className="grid gap-8 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mb-12">
                        {
                            ongoingSessions.map(session => (
                            <StudyScssionCard key={session._id} session={session} now={now} />
                            ))
                        }
                    </div>
                </>
            )}

            {/* Upcoming */}
            {upcomingSessions.length > 0 && (
                <>
                    <h3 className="text-2xl font-semibold mb-6 text-indigo-700">Upcoming</h3>
                    <div className="grid gap-8 grid-cols-1 md:grid-cols-3 lg:grid-cols-4  mb-12">
                        {upcomingSessions.map(session => (
                            <StudyScssionCard key={session._id} session={session} now={now} />
                            ))}
                    </div>
                </>
            )}

            {/* Closed */}
            {closedSessions.length > 0 && (
                <>
                    <h3 className="text-2xl font-semibold mb-6 text-red-700">Closed</h3>
                    <div className="grid gap-8 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
                        {closedSessions.map(session => (
                            <StudyScssionCard key={session._id} session={session} now={now} />
                            ))}
                    </div>
                </>
            )}

            {/* No sessions at all */}
            {sessions.length === 0 && (
                <p className="text-center text-gray-500">No study sessions found.</p>
            )}
        </div>
    );
};

export default StudySessions;
