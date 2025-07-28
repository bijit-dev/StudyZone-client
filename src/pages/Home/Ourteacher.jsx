import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { FaEnvelope, FaChalkboardTeacher } from "react-icons/fa";
import Marquee from "react-fast-marquee";

const Ourteacher = () => {
    const axiosSecure = useAxios();

    const { data: teachers = [], isLoading } = useQuery({
        queryKey: ["allTeachers"],
        queryFn: async () => {
            const res = await axiosSecure.get("/tutors");
            return res.data;
        },
    });

    if (isLoading) {
        return <div className="text-center py-10 text-blue-500">Loading teachers...</div>;
    }

    return (
        <section className="container mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                Teachers
            </h1>

            <Marquee direction="left" speed={60} pauseOnHover={true} autoFill={true} className="mb-10">
                {teachers.map((teacher) => (
                    <div
                        key={teacher._id}
                        className="mr-7 bg-white sm:min-w-80  rounded-xl shadow-md hover:shadow-lg transition border border-gray-200 p-5 text-center"
                    >
                        <img
                            src={teacher.photoURL || "https://via.placeholder.com/100"}
                            alt={teacher.name}
                            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border"
                        />
                        <h2 className="text-lg font-semibold text-gray-800">
                            {teacher.name}
                        </h2>
                        <p className="text-sm text-gray-600 mb-2">{teacher.email}</p>
                    </div>
                ))}
            </Marquee>
        </section>
    );
};

export default Ourteacher;