import { Link } from "react-router";

const StudyScssionCard = ({ session, now }) => {
    return (
        <div
            className=" relative bg-white shadow-md rounded-xl border border-gray-200 hover:shadow-lg transition overflow-hidden"
        >
            {/* Image */}
            <img
                src={session.photoURL || "/placeholder.jpg"}
                alt={session.title}
                className="w-full h-48 object-cover"
            />
            <span
                className={` absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${new Date(session.registrationEnd) >= now
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                    }`}
            >
                {new Date(session.registrationEnd) >= now ? "Ongoing" : "Closed"}
            </span>
            <div className="p-4">
                {/* Title */}
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    {session.title}
                </h2>

                {/* Tutor & Dates */}
                <div className="text-base text-gray-500 mb-3 space-y-1">
                    <p><span className="font-bold">Tutor:</span> {session.tutorName}</p>
                    <p><span className="font-bold">Registration:</span> {session.registrationStart?.slice(0, 10)} → {session.registrationEnd?.slice(0, 10)}</p>
                    <p><span className="font-bold">Class Starts:</span> {session.classStart?.slice(0, 10)}</p>
                </div>

                {/* Link */}
                <Link
                    to={`/session/${session._id}`}
                    className="btn w-full btn-secondary text-base font-bold hover:underline"
                >
                    Read More →
                </Link>
            </div>
        </div>
    );
};

export default StudyScssionCard;