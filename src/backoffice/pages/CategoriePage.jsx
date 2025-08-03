import React, { useEffect, useState } from "react";
import UserList from "../components/UserListe";
import UserFormModal from "../components/UserFormModal";
import { Plus } from "lucide-react";
import CategorieList from "../components/CategorieList";
import CategorieFormModal from "../components/CategorieFormModal";

const CategoriePage = () => {
    const [categories, setCategorie] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const fetchCategories = async () => {
        try {
            const res = await fetch(
                "http://jobhubs.212.56.40.133.sslip.io/categorie"
            );
            if (!res.ok)
                throw new Error("Erreur lors du chargement des catégories");
            const data = await res.json();
            setCategorie(data.reverse());
        } catch (err) {
            setError("Échec du chargement des catégories");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Gestion des categories
            </h2>

            <button
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                onClick={() => setShowModal(true)}
            >
                Créer une categorie
            </button>

            {loading && <p className="text-blue-600">Chargement...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error && <CategorieList categorie={categories} />}
            {showModal && (
                <CategorieFormModal
                    onClose={() => setShowModal(false)}
                    onSuccess={fetchCategories}
                />
            )}
        </div>
    );
};

export default CategoriePage;
