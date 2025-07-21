import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";

const SessionReviewSection = ({ sessionId }) => {
    const [reviews, setReviews] = useState([]);
    const [userReview, setUserReview] = useState(null);
    const [newReview, setNewReview] = useState("");
    const [rating, setRating] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const { user } = useAuth();
    const axiosSecure = useAxios();

    useEffect(() => {
        axiosSecure.get(`/reviews?sessionId=${sessionId}`).then((res) => {
            setReviews(res.data);
            const found = res.data.find((r) => r.reviewerEmail === user?.email);
            setUserReview(found || null);
        });
    }, [sessionId, user?.email, axiosSecure]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newReview || rating < 1 || rating > 5) return;

        setSubmitting(true);
        const reviewData = {
            sessionId,
            reviewerEmail: user.email,
            reviewerName: user.displayName,
            reviewerPhoto: user.photoURL,
            comment: newReview,
            rating,
        };

        try {
            await axiosSecure.post("/reviews", reviewData);
            setNewReview("");
            setRating(0);
            const res = await axiosSecure.get(`/reviews?sessionId=${sessionId}`);
            setReviews(res.data);
            const found = res.data.find((r) => r.reviewerEmail === user?.email);
            setUserReview(found || null);
        } catch (err) {
            console.error("Review submit error", err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="w-full mt-10 px-4 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Reviews & Ratings</h2>

            {reviews.length === 0 ? (
                <p className="text-gray-500 mb-6">No reviews yet. Be the first to review.</p>
            ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
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
                                    <p className="font-semibold text-indigo-700 text-md">{r.reviewerName}</p>
                                </div>
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, index) => (
                                        <FaStar
                                            key={index}
                                            className={`text-lg transition-colors ${index < r.rating ? "text-yellow-400" : "text-gray-300"
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>
                            <p className="mt-3 text-gray-600 text-sm leading-relaxed">{r.comment}</p>
                        </li>
                    ))}
                </ul>
            )}

            {user && !userReview && (
                <form
                    onSubmit={handleSubmit}
                    className="bg-gray-50 border rounded-xl p-6 space-y-4"
                >
                    <h3 className="text-lg font-semibold text-gray-700">Write Your Review</h3>
                    <div>
                        <label className="block text-sm font-medium mb-1">Your Rating</label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((num) => (
                                <FaStar
                                    key={num}
                                    size={24}
                                    onClick={() => setRating(num)}
                                    className={`cursor-pointer transition ${rating >= num ? "text-yellow-500" : "text-gray-300"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Your Review</label>
                        <textarea
                            rows={4}
                            value={newReview}
                            onChange={(e) => setNewReview(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
                            placeholder="Share your thoughts about this session..."
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
                    >
                        {submitting ? "Submitting..." : "Submit Review"}
                    </button>
                </form>
            )}

            {userReview && (
                <div className="mt-6 text-green-600 font-medium text-sm">
                    ✅ You have already submitted a review for this session.
                </div>
            )}
        </div>
    );
};

export default SessionReviewSection;
