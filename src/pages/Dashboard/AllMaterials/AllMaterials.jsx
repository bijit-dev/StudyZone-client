import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const AllMaterials = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // Fetch materials
    const { data: materials = [], isLoading, isError } = useQuery({
        queryKey: ["allMaterials"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/materials?email=${user.email}`);
            return res.data;
        },
    });

    // Delete mutation
    const deleteMaterial = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.delete(`/materials/${id}`);
            return res.data;
        },
        onSuccess: () => {
            Swal.fire("Deleted!", "Material removed successfully.", "success");
            queryClient.invalidateQueries(["allMaterials"]);
        },
        onError: () => {
            Swal.fire("Error!", "Could not delete material.", "error");
        },
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: "Delete this material?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMaterial.mutate(id);
            }
        });
    };

    if (isLoading)
        return <div className="text-center py-8 text-blue-600">Loading materials...</div>;
    if (isError)
        return <div className="text-center py-8 text-red-500">Failed to load materials.</div>;

    return (
        <div className=" container px-4 py-6 mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Manage Study Materials</h2>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto shadow rounded-lg">
                <table className="table table-zebra min-w-full text-sm text-left">
                    <thead className="bg-gray-100 text-gray-600">
                        <tr>
                            <th className="p-3">Image</th>
                            <th className="p-3">Title</th>
                            <th className="p-3">Resource</th>
                            <th className="p-3">Uploaded</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {materials.map((mat) => (
                            <tr key={mat._id} className="hover:bg-gray-50">
                                <td className="p-3">
                                    <img
                                        src={mat.imageURL}
                                        alt="Material"
                                        className="w-16 h-16 object-cover rounded border"
                                    />
                                </td>
                                <td className="p-3">{mat.title}</td>
                                <td className="p-3">
                                    <a
                                        href={mat.resourceLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 underline"
                                    >
                                        🔗 Drive Link
                                    </a>
                                </td>
                                <td className="p-3">
                                    {new Date(mat.uploadedAt).toLocaleDateString()}
                                </td>
                                <td className="p-3 text-center">
                                    <button
                                        onClick={() => handleDelete(mat._id)}
                                        className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
                {materials.map((mat) => (
                    <div
                        key={mat._id}
                        className="bg-white shadow rounded-lg p-4 border border-gray-200"
                    >
                        <div className="flex items-center space-x-4">
                            <img
                                src={mat.imageURL}
                                alt="Material"
                                className="w-20 h-20 rounded object-cover border"
                            />
                            <div>
                                <h3 className="font-semibold text-lg">{mat.title}</h3>
                                <p className="text-sm text-gray-600">{mat.tutorEmail}</p>
                                <p className="text-xs text-gray-500">
                                    Uploaded: {new Date(mat.uploadedAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                            <a
                                href={mat.resourceLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline text-sm"
                            >
                                View Resource
                            </a>
                            <button
                                onClick={() => handleDelete(mat._id)}
                                className="bg-red-600 text-white text-sm px-3 py-1 rounded hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {materials.length === 0 && (
                <p className="text-center mt-6 text-gray-500">No materials found.</p>
            )}
        </div>
    );
};

export default AllMaterials;
