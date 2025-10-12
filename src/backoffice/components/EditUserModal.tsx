import React, { useState, useEffect } from "react";
import { X, User, Mail, Phone, Globe, MapPin, Shield } from "lucide-react";
import { User as UserType } from "../types/user";
import { usePays } from "../hooks/usePays";
import { useCellules } from "../hooks/useCellules";

type EditUserModalProps = {
    user: UserType;
    onClose: () => void;
    onSave: (data: any) => void;
};

const EditUserModal: React.FC<EditUserModalProps> = ({
    user,
    onClose,
    onSave,
}) => {
    const { pays } = usePays();
    const { cellules } = useCellules();

    const [formData, setFormData] = useState({
        nom: user.nom || "",
        prenom: user.prenom || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        paysId: user.paysId || 0,
        celluleId: user.celluleId || 1,
        role: user.role || "USER",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:
                type === "number" || name === "paysId" || name === "celluleId"
                    ? parseInt(value, 10)
                    : value,
        }));
    };

    const isValidEmail = (email: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const validateForm = () => {
        if (!formData.nom.trim()) return "Le nom est requis.";
        if (!formData.prenom.trim()) return "Le prénom est requis.";
        if (!formData.email.trim() || !isValidEmail(formData.email))
            return "Un email valide est requis.";
        if (!formData.phoneNumber.trim())
            return "Le numéro de téléphone est requis.";
        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        setIsLoading(true);
        try {
            await onSave(formData);
            onClose();
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                    "Erreur lors de la modification de l'utilisateur"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-md shadow-2xl">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        <User className="w-5 h-5 mr-2 text-blue-600" />
                        Modifier l'utilisateur
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="p-6">
                    {error && (
                        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <User className="w-4 h-4 inline mr-1" />
                                Nom
                            </label>
                            <input
                                name="nom"
                                type="text"
                                value={formData.nom}
                                onChange={handleChange}
                                required
                                placeholder="Entrez le nom"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <User className="w-4 h-4 inline mr-1" />
                                Prénom
                            </label>
                            <input
                                name="prenom"
                                type="text"
                                value={formData.prenom}
                                onChange={handleChange}
                                required
                                placeholder="Entrez le prénom"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Mail className="w-4 h-4 inline mr-1" />
                                Email
                            </label>
                            <input
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="exemple@email.com"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Phone className="w-4 h-4 inline mr-1" />
                                Téléphone
                            </label>
                            <input
                                name="phoneNumber"
                                type="tel"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                required
                                placeholder="+225 XX XX XX XX"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Globe className="w-4 h-4 inline mr-1" />
                                Pays
                            </label>
                            <select
                                name="paysId"
                                value={formData.paysId}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                            >
                                <option value="">Choisir un pays...</option>
                                {pays &&
                                    pays.map((p: any) => (
                                        <option key={p.id} value={p.id}>
                                             {p.nom}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <MapPin className="w-4 h-4 inline mr-1" />
                                Cellule
                            </label>
                            <select
                                name="celluleId"
                                value={formData.celluleId}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                            >
                                <option value="">Choisir une cellule...</option>
                                {cellules &&
                                    cellules.map((c: any) => (
                                        <option key={c.id} value={c.id}>
                                            {c.name}{" "}
                                            {c.leader?.nom
                                                ? `(Leader: ${c.leader.nom})`
                                                : ""}
                                        </option>
                                    ))}
                            </select>
                            {cellules && cellules.length === 0 && (
                                <p className="text-sm text-gray-500 mt-1">
                                    Aucune cellule disponible
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Shield className="w-4 h-4 inline mr-1" />
                                Rôle
                            </label>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                            >
                                <option value="USER">👤 Utilisateur</option>
                                <option value="ADMIN">🛡️ Admin</option>
                            </select>
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading
                                    ? "Modification..."
                                    : "Modifier l'utilisateur"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditUserModal;
