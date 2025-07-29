import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";

const Tutors = () => {
    const axiosSecure = useAxios();

    const {
        data: tutors = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["tutors"],
        queryFn: async () => {
            const res = await axiosSecure.get("/tutors");
            return res.data;
        },
    });

    if (isLoading) {
        return (
            <div className="text-center py-10 text-lg text-blue-500">
                Loading tutors...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center py-10 text-red-500">
                Failed to load tutors.
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-center mb-10">All Tutors</h2>

            {tutors.length === 0 ? (
                <p className="text-center text-gray-500">No tutors found.</p>
            ) : (
                <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {tutors.map((tutor) => (
                        <div
                            key={tutor._id}
                            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                        >
                            <div className="flex flex-col items-center p-6">
                                <div className="w-24 h-24 mb-4">
                                    <img
                                        src={
                                            tutor.photoURL ||
                                            "https://i.ibb.co/0Jmshvb/default-avatar.jpg"
                                        }
                                        alt="Tutor"
                                        className="w-full h-full object-cover rounded-full border-4 border-blue-100 shadow-sm"
                                    />
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-800">
                                    Name: {tutor?.name}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Tutors;
