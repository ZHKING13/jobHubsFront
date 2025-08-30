import React, { useEffect, useState } from "react";
import UserList from "../components/UserListe";
import UserFormModal from "../components/UserFormModal";

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const fetchUsers = async () => {
        try {
            const res = await fetch("https://api-msa.mydigifinance.com/users");
            if (!res.ok)
                throw new Error("Erreur lors du chargement des utilisateurs");
            const data = await res.json();
            setUsers(data.reverse());
        } catch (err) {
            setError("Échec du chargement des utilisateurs");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Gestion des utilisateurs
            </h2>

            <button
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                onClick={() => setShowModal(true)}
            >
                Créer un utilisateur
            </button>

            {loading && <p className="text-blue-600">Chargement...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error && (
                <UserList
                    users={users}
                    onView={(id) => console.log("Voir user", id)}
                />
            )}
            {showModal && (
                <UserFormModal
                    onClose={() => setShowModal(false)}
                    onSuccess={fetchUsers}
                />
            )}
        </div>
    );
};

export default UsersPage;
