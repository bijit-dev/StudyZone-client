import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

const CreateSession = () => {
    const { user } = useAuth();
    const [photoURL, setPhotoURL] = useState("");
    const [uploading, setUploading] = useState(false);
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();

    const imgbbApiKey = "3c823c20841b57865bed1f6729b05fca";

    // 📤 Upload Photo
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);
        try {
            setUploading(true);
            const res = await axios.post(
                `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
                formData
            );
            setPhotoURL(res.data.data.url);
            setUploading(false);
        } catch (error) {
            console.error("Image upload failed", error);
            setUploading(false);
        }
    };
    // 📅 Handle Form Submission
    const onSubmit = async (data) => {
        const sessionData = {
            title: data.title,
            photoURL: photoURL,
            description: data.description,
            tutorName: user?.displayName,
            tutorEmail: user?.email,
            registrationStart: data.registrationStart,
            registrationEnd: data.registrationEnd,
            classStart: data.classStart,
            classEnd: data.classEnd,
            duration: data.duration,
            registrationFee: 0, // default value
            status: "pending",
            createdAt: new Date(),
        };

        try {
            const response = await axiosSecure.post("/session", sessionData); // Update your endpoint
            if (response) {
                Swal.fire({
                    icon: "success",
                    title: "Session created successfully!",
                    timer: 2000,
                    showConfirmButton: false,
                });
                navigate("/dashboard");
                reset();
            }
        } catch (error) {
            console.error("Error creating session:", error);
            Swal.fire({
                icon: "error",
                title: "Failed to create session",
                text: error.message,
            });
        }
    };

    return (
        <div className="w-full max-w-screen-xl mx-auto mt-10 bg-white px-4 md:px-8 py-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-center mb-6">Create Study Session</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {/* Session Title */}
                <div>
                    <label className="block text-sm font-medium mb-1">Session Title</label>
                    <input
                        {...register("title", { required: true })}
                        type="text"
                        className="w-full border rounded-md px-3 py-2"
                    />
                </div>
                {/* Upload Photo */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Upload Photo</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                        required
                    />
                    {uploading && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}
                    {photoURL && (
                        <img
                            src={photoURL}
                            alt="Uploaded"
                            className="mt-2 rounded-lg w-24 h-24 object-cover"
                        />
                    )}
                </div>

                {/* Tutor Name */}
                <div>
                    <label className="block text-sm font-medium mb-1">Tutor Name</label>
                    <input
                        type="text"
                        value={user?.displayName}
                        readOnly
                        className="w-full border rounded-md px-3 py-2 bg-gray-100"
                    />
                </div>

                {/* Tutor Email */}
                <div>
                    <label className="block text-sm font-medium mb-1">Tutor Email</label>
                    <input
                        type="email"
                        value={user?.email}
                        readOnly
                        className="w-full border rounded-md px-3 py-2 bg-gray-100"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                        {...register("description", { required: true })}
                        className="w-full border rounded-md px-3 py-2"
                        rows="4"
                    />
                </div>

                {/* Registration & Class Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Registration Start</label>
                        <input type="date" {...register("registrationStart", { required: true })} className="w-full border rounded-md px-3 py-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Registration End</label>
                        <input type="date" {...register("registrationEnd", { required: true })} className="w-full border rounded-md px-3 py-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Class Start</label>
                        <input type="date" {...register("classStart", { required: true })} className="w-full border rounded-md px-3 py-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Class End</label>
                        <input type="date" {...register("classEnd", { required: true })} className="w-full border rounded-md px-3 py-2" />
                    </div>
                </div>

                {/* Duration */}
                <div>
                    <label className="block text-sm font-medium mb-1">Session Duration</label>
                    <input
                        type="text"
                        {...register("duration", { required: true })}
                        className="w-full border rounded-md px-3 py-2"
                    />
                </div>

                {/* Registration Fee (read-only) */}
                <div>
                    <label className="block text-sm font-medium mb-1">Registration Fee (Admin only)</label>
                    <input
                        type="number"
                        value={0}
                        readOnly
                        className="w-full border rounded-md px-3 py-2 bg-gray-100"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-semibold"
                >
                    Create Session
                </button>
            </form>
        </div>
    );
};

export default CreateSession;