import { PenIcon, Trash, X } from "lucide-react";
import React, { useState } from "react";

function CategorieList({ categorie, onCategorieUpdate, onCategorieDelete }) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedCategorie, setSelectedCategorie] = useState(null);
    const [editedNom, setEditedNom] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const openEditModal = (cat) => {
        setSelectedCategorie(cat);
        setEditedNom(cat.nom);
        setIsEditModalOpen(true);
        setError("");
    };

    const openDeleteModal = (cat) => {
        setSelectedCategorie(cat);
        setIsDeleteModalOpen(true);
        setError("");
    };

    const closeModals = () => {
        setIsEditModalOpen(false);
        setIsDeleteModalOpen(false);
        setSelectedCategorie(null);
        setEditedNom("");
        setError("");
    };

    const handleUpdate = async () => {
        if (!editedNom.trim()) {
            setError("Le nom de la catégorie ne peut pas être vide");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            await onCategorieUpdate(selectedCategorie.id, {
                nom: editedNom.trim(),
            });

            closeModals();
        } catch (err) {
            setError(
                err.message ||
                    "Une erreur s'est produite lors de la mise à jour"
            );
        } finally {
            setIsLoading(false);
        }
    };
    const handleDelete = async () => {
        setIsLoading(true);
        setError("");

        try {
            await onCategorieDelete(selectedCategorie.id);

            closeModals();
        } catch (err) {
            setError(
                err.message ||
                    "Une erreur s'est produite lors de la suppression"
            );
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <>
            <div className="overflow-x-auto rounded shadow">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            {["Id", "Nom", "Date de création", "Actions"].map(
                                (header) => (
                                    <th
                                        key={header}
                                        className="px-3 py-2 bg-gray-100 text-left text-xs font-semibold text-gray-700"
                                    >
                                        {header}
                                    </th>
                                )
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {categorie.map((cat, idx) => (
                            <tr
                                key={cat.id}
                                className={
                                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                                }
                            >
                                <td className="px-3 py-2">{cat.id}</td>
                                <td className="px-3 py-2">{cat.nom}</td>
                                <td className="px-3 py-2">{cat.createdAt}</td>

                                <td className="px-3 flex gap-2 py-2">
                                    <button
                                        onClick={() => openEditModal(cat)}
                                        className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs"
                                        title="Modifier la catégorie"
                                    >
                                        <PenIcon
                                            className="inline mr-1"
                                            size={12}
                                        />
                                    </button>
                                    <button
                                        onClick={() => openDeleteModal(cat)}
                                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                                        title="Supprimer la catégorie"
                                    >
                                        <Trash
                                            className="inline mr-1"
                                            size={12}
                                        />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal d'édition */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96 max-w-lg mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">
                                Modifier la catégorie
                            </h2>
                            <button
                                onClick={closeModals}
                                className="text-gray-500 hover:text-gray-700"
                                disabled={isLoading}
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nom de la catégorie
                            </label>
                            <input
                                type="text"
                                value={editedNom}
                                onChange={(e) => setEditedNom(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Entrez le nom de la catégorie"
                                disabled={isLoading}
                            />
                        </div>

                        {error && (
                            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                                {error}
                            </div>
                        )}

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={closeModals}
                                className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                                disabled={isLoading}
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleUpdate}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isLoading || !editedNom.trim()}
                            >
                                {isLoading ? "Mise à jour..." : "Mettre à jour"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de confirmation de suppression */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96 max-w-lg mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">
                                Confirmer la suppression
                            </h2>
                            <button
                                onClick={closeModals}
                                className="text-gray-500 hover:text-gray-700"
                                disabled={isLoading}
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="mb-6">
                            <p className="text-gray-600">
                                Êtes-vous sûr de vouloir supprimer la catégorie{" "}
                                <span className="font-semibold text-gray-800">
                                    "{selectedCategorie?.nom}"
                                </span>
                                ?
                            </p>
                            <p className="text-sm text-red-600 mt-2">
                                Cette action est irréversible.
                            </p>
                        </div>

                        {error && (
                            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                                {error}
                            </div>
                        )}

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={closeModals}
                                className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                                disabled={isLoading}
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isLoading}
                            >
                                {isLoading ? "Suppression..." : "Supprimer"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default CategorieList;
