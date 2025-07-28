import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import Swal from "sweetalert2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const ViewAllMaterials = () => {
    const { user } = useAuth();
    const axiosSecure = useAxios();
    const queryClient = useQueryClient();
    const [editingMaterial, setEditingMaterial] = useState(null);

    const { data: materials = [], isLoading } = useQuery({
        queryKey: ["myMaterials", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/materials?email=${user.email}`);
            return res.data;
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (id) => await axiosSecure.delete(`/materials/${id}`),
        onSuccess: () => {
            Swal.fire("Deleted!", "Material deleted successfully.", "success");
            queryClient.invalidateQueries(["myMaterials"]);
        },
    });

    const updateMutation = useMutation({
        mutationFn: async ({ id, updatedData }) =>
            await axiosSecure.patch(`/materials/${id}`, updatedData),
        onSuccess: () => {
            Swal.fire("Updated!", "Material updated successfully.", "success");
            queryClient.invalidateQueries(["myMaterials"]);
            setEditingMaterial(null);
        },
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won’t be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            confirmButtonColor: "#e11d48",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMutation.mutate(id);
            }
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const form = e.target;
        const updatedData = {
            title: form.title.value,
            resourceLink: form.resourceLink.value,
        };

        const imageFile = form.image.files[0];
        if (imageFile) {
            const imageFormData = new FormData();
            imageFormData.append("image", imageFile);
            const imgRes = await fetch(
                `https://api.imgbb.com/1/upload?key=3c823c20841b57865bed1f6729b05fca`,
                {
                    method: "POST",
                    body: imageFormData,
                }
            );
            const imgData = await imgRes.json();
            if (imgData.success) {
                updatedData.imageURL = imgData.data.display_url;
            }
        }

        updateMutation.mutate({ id: editingMaterial._id, updatedData });
    };

    return (
        <div className="p-4 md:p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">📚 My Uploaded Materials</h2>

            {isLoading ? (
                <p>Loading materials...</p>
            ) : materials.length === 0 ? (
                <p className="text-center text-gray-600">You haven't uploaded any materials yet.</p>
            ) : (
                <div className="overflow-x-auto rounded shadow border">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gradient-to-r from-blue-100 to-indigo-100">
                            <tr>
                                <th className="p-3 text-left text-xs font-bold text-gray-600">#</th>
                                <th className="p-3 text-left text-xs font-bold text-gray-600">Title</th>
                                <th className="p-3 text-left text-xs font-bold text-gray-600">Image</th>
                                <th className="p-3 text-left text-xs font-bold text-gray-600">Link</th>
                                <th className="p-3 text-center text-xs font-bold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {materials.map((mat, index) => (
                                <tr key={mat._id} className="hover:bg-gray-50 transition">
                                    <td className="p-3">{index + 1}</td>
                                    <td className="p-3 font-medium">{mat.title}</td>
                                    <td className="p-3">
                                        <img
                                            src={mat.imageURL}
                                            alt="thumbnail"
                                            className="w-16 h-10 object-cover rounded shadow-sm hover:scale-105 transition duration-200"
                                        />
                                    </td>
                                    <td className="p-3">
                                        <a
                                            href={mat.resourceLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded hover:bg-blue-200"
                                        >
                                            🔗 Drive Link
                                        </a>
                                    </td>
                                    <td className="p-3 text-center space-y-1 md:space-y-0 md:space-x-2 flex flex-col md:flex-row justify-center">
                                        <button
                                            onClick={() => setEditingMaterial(mat)}
                                            className="bg-yellow-400 text-white px-3 py-1 rounded text-xs hover:bg-yellow-500"
                                        >
                                            ✏️ Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(mat._id)}
                                            className="bg-rose-500 text-white px-3 py-1 rounded text-xs hover:bg-rose-600"
                                        >
                                            🗑️ Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* 🔄 Modal */}
            {editingMaterial && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">Update Material</h3>
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <input
                                type="text"
                                name="title"
                                defaultValue={editingMaterial.title}
                                className="w-full border px-3 py-2 rounded"
                                required
                            />
                            <input
                                type="url"
                                name="resourceLink"
                                defaultValue={editingMaterial.resourceLink}
                                className="w-full border px-3 py-2 rounded"
                                required
                            />
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                className="w-full border px-3 py-2 rounded"
                            />
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setEditingMaterial(null)}
                                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewAllMaterials;