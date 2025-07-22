import { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";

const CreateNote = () => {
    const { user } = useAuth();
    const axiosSecure = useAxios();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newNote = {
            email: user?.email,
            title,
            description,
            createdAt: new Date()
        };

        try {
            const res = await axiosSecure.post("/notes", newNote);
            if (res.data.insertedId) {
                Swal.fire("Success", "Note created successfully!", "success");
                setTitle("");
                setDescription("");
            }
        } catch (err) {
            console.error(err);
            Swal.fire("Error", "Failed to create note.", "error");
        }
    };

    return (
        <div className="w-full px-4 py-10">
            <div className="bg-white shadow-lg rounded-2xl border border-gray-200 p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">📝 Create a New Note</h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email (Read Only) */}
                    <div>
                        <label className="block mb-1 font-medium text-sm text-gray-700">Your Email</label>
                        <input
                            type="email"
                            value={user?.email}
                            readOnly
                            className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
                        />
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block mb-1 font-medium text-sm text-gray-700">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            placeholder="Enter note title"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block mb-1 font-medium text-sm text-gray-700">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={5}
                            required
                            placeholder="Write your note here..."
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        ></textarea>
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-lg transition duration-300"
                        >
                            ➕ Create Note
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateNote;