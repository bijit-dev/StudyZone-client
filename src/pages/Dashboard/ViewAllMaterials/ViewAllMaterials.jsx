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

    // Fetch materials
    const { data: materials = [], isLoading } = useQuery({
        queryKey: ["myMaterials", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/materials?tutorEmail=${user.email}`);
            return res.data;
        },
    });

    // Delete
    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.delete(`/materials/${id}`);
            return res.data;
        },
        onSuccess: () => {
            Swal.fire("Deleted!", "Material deleted successfully.", "success");
            queryClient.invalidateQueries(["myMaterials"]);
        },
    });

    // Update
    const updateMutation = useMutation({
        mutationFn: async ({ id, updatedData }) => {
            const res = await axiosSecure.patch(`/materials/${id}`, updatedData);
            return res.data;
        },
        onSuccess: () => {
            Swal.fire("Updated!", "Material updated successfully.", "success");
            queryClient.invalidateQueries(["myMaterials"]);
            setEditingMaterial(null);
        },
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
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
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">My Uploaded Materials</h2>

            {isLoading ? (
                <p>Loading...</p>
            ) : materials.length === 0 ? (
                <p>No materials found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border p-2">#</th>
                                <th className="border p-2">Title</th>
                                <th className="border p-2">Image</th>
                                <th className="border p-2">Link</th>
                                <th className="border p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {materials.map((mat, index) => (
                                <tr key={mat._id} className="text-center">
                                    <td className="border p-2">{index + 1}</td>
                                    <td className="border p-2">{mat.title}</td>
                                    <td className="border p-2">
                                        <img
                                            src={mat.imageURL}
                                            alt="Material"
                                            className="w-20 h-12 object-cover mx-auto rounded"
                                        />
                                    </td>
                                    <td className="border p-2">
                                        <a
                                            href={mat.resourceLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 underline"
                                        >
                                            Open
                                        </a>
                                    </td>
                                    <td className="border p-2 space-x-2">
                                        <button
                                            onClick={() => setEditingMaterial(mat)}
                                            className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleDelete(mat._id)}
                                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Update Modal */}
            {editingMaterial && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">Update Material</h3>
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <input
                                type="text"
                                name="title"
                                defaultValue={editingMaterial.title}
                                required
                                className="w-full p-2 border rounded"
                            />
                            <input
                                type="url"
                                name="resourceLink"
                                defaultValue={editingMaterial.resourceLink}
                                required
                                className="w-full p-2 border rounded"
                            />
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                className="w-full p-2 border rounded"
                            />
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setEditingMaterial(null)}
                                    className="px-4 py-2 bg-gray-400 text-white rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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