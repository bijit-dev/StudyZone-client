
// Sample session data
const sessions = [
    {
        id: 1,
        title: "JavaScript Basics",
        description: "Learn the fundamentals of JavaScript with hands-on examples.",
        registrationDeadline: "2025-07-15",
    },
    {
        id: 2,
        title: "React Advanced",
        description: "Dive deep into React hooks, context API, and optimization.",
        registrationDeadline: "2025-07-10",
    },
    {
        id: 3,
        title: "Python for Data Science",
        description: "Explore data analysis and visualization using Python libraries.",
        registrationDeadline: "2025-07-20",
    },
    {
        id: 4,
        title: "Web Design Principles",
        description: "Master UI/UX and responsive design using modern tools.",
        registrationDeadline: "2025-07-05",
    },
    {
        id: 5,
        title: "Django Full Stack",
        description: "Build complete web apps with Django and React.",
        registrationDeadline: "2025-07-25",
    },
    {
        id: 6,
        title: "Machine Learning Intro",
        description: "Understand ML concepts and build basic models with scikit-learn.",
        registrationDeadline: "2025-07-12",
    },
];

const StudySessions = () => {
    const currentDate = new Date();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {sessions.map((session) => {
                const deadline = new Date(session.registrationDeadline);
                const isOngoing = currentDate <= deadline;

                return (
                    <div key={session.id} className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-primary">{session.title}</h2>
                            <p>{session.description}</p>
                            <div className="flex justify-between items-center mt-4">
                                <span
                                    className={`badge ${isOngoing ? "badge-success" : "badge-error"
                                        } text-white`}
                                >
                                    {isOngoing ? "Ongoing" : "Closed"}
                                </span>
                                <button className="btn btn-sm btn-outline btn-primary">
                                    Read More
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default StudySessions;