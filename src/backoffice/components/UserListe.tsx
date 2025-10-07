import React, { useState } from "react";
import { User } from "../types/user";
import { useNavigate } from "react-router-dom";
import {
    Edit2,
    Trash2,
    Eye,
    User as UserIcon,
    Mail,
    MapPin,
} from "lucide-react";
import EditUserModal from "./EditUserModal";

type UserListProps = {
    users: User[];
    onUpdate: (id: number, data: any) => void;
    onDelete: (id: number) => void;
    onView?: (id: number) => void;
};

const UserList: React.FC<UserListProps> = ({
    users,
    onUpdate,
    onDelete,
    onView,
}) => {
    const navigate = useNavigate();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    if (users.length === 0) {
        return (
            <div className="text-center py-12">
                <UserIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                    Aucun utilisateur
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                    Commencez par créer un nouvel utilisateur.
                </p>
            </div>
        );
    }
    const handleEdit = (user: User) => {
        setSelectedUser(user);
        setIsEditModalOpen(true);
    };

    const handleDelete = (user: User) => {
        setSelectedUser(user);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!selectedUser) return;

        setIsLoading(true);
        try {
            await onDelete(selectedUser.id);
            setIsDeleteModalOpen(false);
            setSelectedUser(null);
        } catch (error) {
            console.error("Erreur lors de la suppression:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                    {users.map((user) => (
                        <li
                            key={user.id}
                            className="hover:bg-gray-50 transition-colors duration-150"
                        >
                            <div className="px-4 py-4 sm:px-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4 flex-1">
                                        <div className="flex-shrink-0">
                                            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                                <UserIcon className="h-6 w-6 text-gray-600" />
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center space-x-2">
                                                <p className="text-sm font-medium text-gray-900 truncate">
                                                    {user.nom} {user.prenom}
                                                </p>
                                                <span
                                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                        user.role === "ADMIN"
                                                            ? "bg-purple-100 text-purple-800"
                                                            : "bg-green-100 text-green-800"
                                                    }`}
                                                >
                                                    {user.role === "ADMIN"
                                                        ? "🛡️ Admin"
                                                        : "👤 Utilisateur"}
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-4 mt-1">
                                                <p className="flex items-center text-sm text-gray-500">
                                                    <Mail className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                                    {user.email}
                                                </p>
                                                {user.pays && (
                                                    <p className="flex items-center text-sm text-gray-500">
                                                        <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                                        {user.pays.nom}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() =>
                                                navigate(`/users/${user.id}`)
                                            }
                                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        >
                                            <Eye className="w-3 h-3 mr-1" />
                                            Voir
                                        </button>
                                        <button
                                            onClick={() => handleEdit(user)}
                                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        >
                                            <Edit2 className="w-3 h-3 mr-1" />
                                            Modifier
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user)}
                                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                        >
                                            <Trash2 className="w-3 h-3 mr-1" />
                                            Supprimer
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Modal d'édition */}
            {isEditModalOpen && selectedUser && (
                <EditUserModal
                    user={selectedUser}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setSelectedUser(null);
                    }}
                    onSave={async (data) => {
                        await onUpdate(selectedUser.id, data);
                        setIsEditModalOpen(false);
                        setSelectedUser(null);
                    }}
                />
            )}

            {/* Modal de confirmation de suppression */}
            {isDeleteModalOpen && selectedUser && (
                <div className="fixed inset-0 bg-black/60 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3 text-center">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                                <Trash2 className="h-6 w-6 text-red-600" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mt-5">
                                Supprimer l'utilisateur
                            </h3>
                            <div className="mt-2 px-7 py-3">
                                <p className="text-sm text-gray-500">
                                    Êtes-vous sûr de vouloir supprimer
                                    l'utilisateur{" "}
                                    <span className="font-medium">
                                        {selectedUser.nom} {selectedUser.prenom}
                                    </span>{" "}
                                    ? Cette action ne peut pas être annulée.
                                </p>
                            </div>
                            <div className="flex gap-3 px-4 py-3">
                                <button
                                    onClick={() => {
                                        setIsDeleteModalOpen(false);
                                        setSelectedUser(null);
                                    }}
                                    className="flex-1 px-4 py-2 bg-white text-gray-700 text-base font-medium rounded-md border border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                >
                                    Annuler
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    disabled={isLoading}
                                    className="flex-1 px-4 py-2 bg-red-600 text-white text-base font-medium rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? "Suppression..." : "Supprimer"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default UserList;
