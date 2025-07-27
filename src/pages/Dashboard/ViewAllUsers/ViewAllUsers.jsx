import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import useAxios from "../../../hooks/useAxios";
import Swal from "sweetalert2";
import { FaUserEdit, FaSearch } from "react-icons/fa";

const ViewAllUsers = () => {
    const axiosSecure = useAxios();
    const queryClient = useQueryClient();
    const [search, setSearch] = useState("");

    // Fetch users with optional search
    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ["allUsers", search],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users${search ? `?search=${search}` : ""}`);
            return res.data;
        },
    });

    // Mutation to update role
    const updateRoleMutation = useMutation({
        mutationFn: async ({ id, newRole }) => {
            const res = await axiosSecure.patch(`/users/${id}/role`, { role: newRole });
            return res.data;
        },
        onSuccess: () => {
            Swal.fire("Updated!", "User role updated successfully.", "success");
            queryClient.invalidateQueries({ queryKey: ["allUsers"] });
        },
        onError: (error) => {
            Swal.fire("Error", error.message || "Role update failed", "error");
        },
    });

    // Handle role update
    const handleUpdateRole = (id, currentRole) => {
        Swal.fire({
            title: "Update Role",
            input: "select",
            inputOptions: {
                admin: "Admin",
                tutor: "Tutor",
                student: "Student",
            },
            inputPlaceholder: "Select a new role",
            inputValue: currentRole,
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed && result.value !== currentRole) {
                updateRoleMutation.mutate({ id, newRole: result.value });
            }
        });
    };

    // Handle search input
    const handleSearch = (e) => {
        e.preventDefault();
        refetch();
    };

    return (
        <div className="px-4 py-8 container mx-auto bg-white rounded-xl shadow-lg">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-800">
                All Users
            </h2>

            {/* Search Bar */}
            <form
                onSubmit={handleSearch}
                className="mb-6 flex flex-col sm:flex-row justify-end items-center gap-3"
            >
                <input
                    type="text"
                    placeholder="Search by name or email..."
                    className="w-full sm:w-1/4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button
                    type="submit"
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    <FaSearch /> Search
                </button>
            </form>

            {isLoading ? (
                <p className="text-center text-blue-500 animate-pulse">Loading users...</p>
            ) : users.length === 0 ? (
                <p className="text-center text-gray-500">No users found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-gray-700 border rounded-md">
                        <thead className="bg-gray-100 text-left text-xs uppercase">
                            <tr>
                                <th className="px-4 py-3">#</th>
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">Email</th>
                                <th className="px-4 py-3">Role</th>
                                <th className="px-4 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user._id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3">{index + 1}</td>
                                    <td className="px-4 py-3 font-medium">{user.name || "N/A"}</td>
                                    <td className="px-4 py-3">{user.email}</td>
                                    <td className="px-4 py-3 capitalize">{user.role}</td>
                                    <td className="px-4 py-3">
                                        <button
                                            className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-xs"
                                            onClick={() => handleUpdateRole(user._id, user.role)}
                                        >
                                            <FaUserEdit /> Update Role
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ViewAllUsers;