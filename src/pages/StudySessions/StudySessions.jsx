// import { useEffect, useState } from "react";
import { Link } from "react-router";
// import axios from "axios";
// import moment from "moment";

const StudySessions = () => {
    // const [sessions, setSessions] = useState([]);

    // useEffect(() => {
    //     axios.get("/sessions") // Replace with your actual API
    //         .then(res => setSessions(res.data))
    //         .catch(err => console.error(err));
    // }, []);

    const sessions = [
        {
            id: "1",
            title: "Introduction to React",
            tutorName: "Jane Doe",
            rating: 4.7,
            description: "Learn the basics of React including components, state, and props.",
            registrationStart: "2025-07-01",
            registrationEnd: "2025-07-20",
            classStart: "2025-07-22",
            classEnd: "2025-08-10",
            duration: "3 weeks",
            fee: "Free",
            reviews: [
                {
                    name: "Student A",
                    comment: "Great introduction to React!",
                    rating: 5,
                },
                {
                    name: "Student B",
                    comment: "Well-structured and easy to follow.",
                    rating: 4,
                },
            ],
        },
        {
            id: "2",
            title: "Advanced JavaScript",
            tutorName: "John Smith",
            rating: 4.9,
            description: "Deep dive into ES6+, closures, async/await, and performance tuning.",
            registrationStart: "2025-06-10",
            registrationEnd: "2025-07-10",
            classStart: "2025-07-15",
            classEnd: "2025-08-05",
            duration: "3 weeks",
            fee: "$29",
            reviews: [
                {
                    name: "Student C",
                    comment: "Helped me understand async JS better!",
                    rating: 5,
                },
                {
                    name: "Student D",
                    comment: "Challenging but very rewarding.",
                    rating: 5,
                },
            ],
        },
        {
            id: "3",
            title: "Full Stack Project Bootcamp",
            tutorName: "Sarah Khan",
            rating: 4.8,
            description:
                "Build and deploy a full stack project using React, Node.js, Express, and MongoDB.",
            registrationStart: "2025-08-01",
            registrationEnd: "2025-08-15",
            classStart: "2025-08-18",
            classEnd: "2025-09-15",
            duration: "4 weeks",
            fee: "$49",
            reviews: [
                {
                    name: "Student E",
                    comment: "Best hands-on course!",
                    rating: 5,
                },
            ],
        },
    ];


    const isClosed = (session) => {
        return new Date() > new Date(session.registrationEnd);
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {sessions.map(session => {
                // const isClosed = moment().isAfter(moment(session.registrationEnd));
                return (
                    <div key={session.id} className="border rounded-xl shadow-lg p-4">
                        <h2 className="text-xl font-bold text-indigo-600">{session.title}</h2>
                        <p className="text-gray-600 mt-2">{session.description.slice(0, 100)}...</p>
                        <span className={`inline-block mt-3 text-sm px-3 py-1 rounded-full ${isClosed ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                            {isClosed ? 'Closed' : 'Ongoing'}
                        </span>
                        <div className="mt-4">
                            <Link to={`/sessions/${session.id}`}>
                                <button className="btn btn-accent w-full">Read More</button>
                            </Link>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default StudySessions;