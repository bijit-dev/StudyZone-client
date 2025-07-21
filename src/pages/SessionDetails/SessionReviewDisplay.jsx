import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import useAxios from "../../hooks/useAxios";

const SessionReviewDisplay = ({ sessionId }) => {
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const axiosSecure = useAxios();

    useEffect(() => {
        if (!sessionId) return;

        axiosSecure.get(`/reviews?sessionId=${sessionId}`).then((res) => {
            const data = res.data || [];
            setReviews(data);

            if (data.length > 0) {
                const avg =
                    data.reduce((sum, review) => sum + review.rating, 0) / data.length;
                setAverageRating(parseFloat(avg.toFixed(1)));
            } else {
                setAverageRating(0);
            }
        });
    }, [sessionId, axiosSecure]);

    return (
        <div className="w-full mt-10">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Student Reviews</h2>

            {/* Average Rating Display */}
            <div className="flex items-center gap-2 mb-6">
                <span className="text-xl font-semibold text-indigo-600">
                    Average Rating:
                </span>
                <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                        <FaStar
                            key={i}
                            className={`text-lg ${i < Math.round(averageRating)
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }`}
                        />
                    ))}
                </div>
                <span className="text-gray-600">({averageRating} / 5)</span>
            </div>

            {reviews.length === 0 ? (
                <p className="text-gray-500">No reviews yet for this session.</p>
            ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {reviews.map((r, i) => (
                        <li
                            key={i}
                            className="bg-white border-l-4 border-indigo-500 shadow-md rounded-lg p-5 hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={r.reviewerPhoto || "/default-avatar.png"}
                                        alt={r.reviewerName}
                                        className="w-10 h-10 rounded-full object-cover border-2 border-indigo-300"
                                    />
                                    <p className="font-semibold text-indigo-700 text-md">
                                        {r.reviewerName}
                                    </p>
                                </div>
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, index) => (
                                        <FaStar
                                            key={index}
                                            className={`text-lg ${index < r.rating ? "text-yellow-400" : "text-gray-300"
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>
                            <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                                {r.comment}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SessionReviewDisplay;
