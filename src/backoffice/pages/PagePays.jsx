import React, { useEffect, useState } from "react";
import UserList from "../components/UserListe";
import UserFormModal from "../components/UserFormModal";
import { Plus } from "lucide-react";
import CategorieList from "../components/CategorieList";
import CategorieFormModal from "../components/CategorieFormModal";
import PaysFormModal from "../components/PaysFormModal";

const PagePays = () => {
    const [pays, setPays] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const fetchPays = async () => {
        try {
            const res = await fetch(
                "http://jobhubs.212.56.40.133.sslip.io/pays"
            );
            if (!res.ok)
                throw new Error("Erreur lors du chargement des catégories");
            const data = await res.json();
            setPays(data.reverse());
        } catch (err) {
            setError("Échec du chargement des catégories");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchPays();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Gestion des pays
            </h2>

            <button
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                onClick={() => setShowModal(true)}
            >
                Créer un pays
            </button>

            {loading && <p className="text-blue-600">Chargement...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error && <CategorieList categorie={pays} />}
            {showModal && (
                <PaysFormModal
                    onClose={() => setShowModal(false)}
                    onSuccess={fetchPays}
                />
            )}
        </div>
    );
};

export default PagePays;
