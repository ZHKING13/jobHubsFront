import React from "react";
import { User } from "../types/user";
import { useNavigate } from "react-router-dom";



type UserListProps = {
    users: User[];
    onView?: (id: number) => void; // callback optionnel
};

const UserList: React.FC<UserListProps> = ({ users, onView }) => {
    if (users.length === 0) {
        return (
            <p className="text-center text-gray-500 py-6">
                Aucun utilisateur trouvé.
            </p>
        );
    }
const navigate = useNavigate();
    return (
        <div className="overflow-x-auto rounded shadow">
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        {[
                            "Nom",
                            "Prénom",
                            "Email",
                            "Pays",
                            "Profil",
                            "Actions",
                        ].map((header) => (
                            <th
                                key={header}
                                className="px-3 py-2 bg-gray-100 text-left text-xs font-semibold text-gray-700"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, idx) => (
                        <tr
                            key={user.id}
                            className={
                                idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                            }
                        >
                            <td className="px-3 py-2">{user.nom}</td>
                            <td className="px-3 py-2">{user.prenom}</td>
                            <td className="px-3 py-2">{user.email}</td>
                            <td className="px-3 py-2">
                                {user.pays?.nom || "-"}
                            </td>
                            <td className="px-3 py-2">{user.role}</td>
                            <td className="px-3 py-2">
                                <button
                                    onClick={() =>
                                        navigate(`/users/${user.id}`)
                                    }
                                    className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs"
                                >
                                    Voir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
