import { FaChalkboardTeacher, FaFileAlt, FaUsersCog, FaRegClock } from "react-icons/fa";

const features = [
    {
        icon: <FaChalkboardTeacher className="w-8 h-8 text-blue-600" />,
        title: "Study Session Scheduling",
        desc: "Students can register for tutor-led study sessions with live updates and status tracking.",
    },
    {
        icon: <FaFileAlt className="w-8 h-8 text-green-600" />,
        title: "Material Sharing",
        desc: "Access downloadable resources such as notes, slides, and links after enrolling.",
    },
    {
        icon: <FaUsersCog className="w-8 h-8 text-orange-600" />,
        title: "User Role Management",
        desc: "Admins can update roles and permissions for better system control.",
    },
    {
        icon: <FaRegClock className="w-8 h-8 text-purple-600" />,
        title: "Real-Time Status",
        desc: "Sessions display 'Ongoing' or 'Closed' based on real-time registration dates.",
    },
];

const KeyFeatures = () => {
    return (
        <section className="max-w-6xl mx-auto px-4 py-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-10">
                Key Features of the Platform
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, idx) => (
                    <div
                        key={idx}
                        className="bg-white border rounded-xl shadow hover:shadow-md transition p-6 text-center"
                    >
                        <div className="flex justify-center mb-4">{feature.icon}</div>
                        <h3 className="font-semibold text-lg text-gray-800 mb-2">
                            {feature.title}
                        </h3>
                        <p className="text-sm text-gray-600">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default KeyFeatures;
