import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const SessionDetails = () => {
    const { id } = useParams();
    const [session, setSession] = useState(null);

    useEffect(() => {
        axios.get(`/sessions/${id}`)
            .then(res => setSession(res.data))
            .catch(err => console.error(err));
    }, [id]);

    if (!session) return <p className="text-center py-10">Loading...</p>;

    const isRegistrationClosed = moment().isAfter(moment(session.registrationEnd));

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-bold text-indigo-700">{session.title}</h1>
            <p className="text-gray-600 mt-2">{session.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-gray-700">
                <p><strong>Tutor:</strong> {session.tutorName}</p>
                <p><strong>Rating:</strong> {session.averageRating || 'No ratings yet'}</p>
                <p><strong>Registration:</strong> {moment(session.registrationStart).format("LL")} to {moment(session.registrationEnd).format("LL")}</p>
                <p><strong>Class Duration:</strong> {moment(session.classStart).format("LL")} – {moment(session.classEnd).format("LL")}</p>
                <p><strong>Duration:</strong> {session.duration}</p>
                <p><strong>Fee:</strong> {session.fee === 0 ? "Free" : `$${session.fee}`}</p>
            </div>

            <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Student Reviews</h3>
                <ul className="space-y-2">
                    {session.reviews && session.reviews.length > 0 ? session.reviews.map((review, index) => (
                        <li key={index} className="p-3 bg-gray-100 rounded-lg">{review}</li>
                    )) : <p>No reviews yet.</p>}
                </ul>
            </div>

            <div className="mt-6">
                {isRegistrationClosed ? (
                    <button disabled className="btn btn-disabled w-full">Registration Closed</button>
                ) : (
                    <button className="btn btn-accent w-full">Book Now</button>
                )}
            </div>
        </div>
    );
};

export default SessionDetails;
