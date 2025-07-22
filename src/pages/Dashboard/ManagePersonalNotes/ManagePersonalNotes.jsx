import { useState } from "react";
import Swal from "sweetalert2";
import { MdDelete, MdEdit } from "react-icons/md";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Loader from "../../../components/Loader";

const ManagePersonalNotes = () => {
    const { user } = useAuth();
    const axiosSecure = useAxios();
    const queryClient = useQueryClient();
    const [editNote, setEditNote] = useState(null);

    // Fetch notes with TanStack Query
    const { data: notes = [], isLoading } = useQuery({
        queryKey: ["personalNotes", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/notes?email=${user.email}`);
            return res.data;
        },
    });

    // Delete Note Mutation
    const deleteMutation = useMutation({
        mutationFn: (id) => axiosSecure.delete(`/notes/${id}`),
        onSuccess: () => {
            Swal.fire("Deleted!", "Your note has been deleted.", "success");
            queryClient.invalidateQueries(["personalNotes", user?.email]);
        },
        onError: () => {
            Swal.fire("Error", "Failed to delete note", "error");
        },
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to delete this note?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMutation.mutate(id);
            }
        });
    };

    // Update Note Mutation
    const updateMutation = useMutation({
        mutationFn: (updatedNote) =>
            axiosSecure.put(`/notes/${updatedNote._id}`, {
                title: updatedNote.title,
                description: updatedNote.description,
            }),
        onSuccess: () => {
            Swal.fire("Updated!", "Note updated successfully", "success");
            setEditNote(null);
            queryClient.invalidateQueries(["personalNotes", user?.email]);
        },
        onError: () => {
            Swal.fire("Error", "Failed to update note", "error");
        },
    });

    const handleEditSubmit = (e) => {
        e.preventDefault();
        updateMutation.mutate(editNote);
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">📚 Manage Your Notes</h2>

            {isLoading ? <Loader/>
            : notes.length === 0 ? (
                <p className="text-center text-gray-500">You haven't added any notes yet.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {notes.map((note) => (
                        <div
                            key={note._id}
                            className="bg-white shadow border rounded-xl p-5 w-full relative"
                        >
                            <div className="absolute top-3 right-3 flex gap-2">
                                <button
                                    onClick={() => setEditNote(note)}
                                    className="text-blue-600 hover:text-blue-800"
                                    title="Edit Note"
                                >
                                    <MdEdit size={20} />
                                </button>
                                <button
                                    onClick={() => handleDelete(note._id)}
                                    className="text-red-500 hover:text-red-700"
                                    title="Delete Note"
                                >
                                    <MdDelete size={20} />
                                </button>
                            </div>

                            <h3 className="text-xl font-semibold text-indigo-600 mb-2">
                                {note.title}
                            </h3>
                            <p className="text-gray-700 text-sm whitespace-pre-line overflow-auto">{note.description}</p>
                            <p className="text-xs text-gray-400 mt-3">
                                Created on:{" "}
                                {new Date(note.createdAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                })}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            {/* Edit Modal */}
            {editNote && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-4">
                        <h3 className="text-xl font-bold text-indigo-700 mb-4">Edit Note</h3>
                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <div>
                                <label className="text-sm font-medium">Title</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                                    value={editNote.title}
                                    onChange={(e) => setEditNote({ ...editNote, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Description</label>
                                <textarea
                                    rows={4}
                                    className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                                    value={editNote.description}
                                    onChange={(e) => setEditNote({ ...editNote, description: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setEditNote(null)}
                                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManagePersonalNotes;