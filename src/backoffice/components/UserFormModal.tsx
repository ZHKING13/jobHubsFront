import axios from "axios";
import React, { useEffect, useState } from "react";

type UserFormModalProps = {
    onClose: () => void;
    onSuccess: () => void;
};

const UserFormModal: React.FC<UserFormModalProps> = ({
    onClose,
    onSuccess,
}) => {
    const [form, setForm] = useState({
        nom: "",
        prenom: "",
        email: "",
        password: "",
        paysId: 2,
        role: "USER",
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [paysOptions, setPaysOptions] = useState<Pays[]>([]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        // Convertir paysId en number
        const newValue = name === "paysId" ? parseInt(value, 10) : value;

        setForm((prev) => ({ ...prev, [name]: newValue }));
    };
    type Pays = {
        id: number;
        nom: string;
        code: string;
        flag: string;
        createdAt: string;
        updatedAt: string;
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [paysRes] = await Promise.all([
                    axios.get("https://api-msa.mydigifinance.com/pays"),
                ]);
                setPaysOptions(paysRes.data);
            } catch (error) {
                console.error("Erreur lors du chargement des données:", error);
            }
        };

        fetchData();
    }, []);
    const isValidEmail = (email: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const validateForm = () => {
        if (!form.nom.trim()) return "Le nom est requis.";
        if (!form.prenom.trim()) return "Le prénom est requis.";
        if (!form.email.trim() || !isValidEmail(form.email))
            return "Un email valide est requis.";
        if (!form.password || form.password.length < 6)
            return "Le mot de passe doit faire au moins 6 caractères.";
        if (isNaN(form.paysId)) return "Le pays est invalide.";
        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(
                "https://api-msa.mydigifinance.com/auth/signup",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form),
                }
            );
            if (!res.ok)
                throw new Error("Erreur lors de la création de l'utilisateur");
            onSuccess();
            onClose();
        } catch (err: any) {
            setError(err.message || "Erreur inconnue");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md w-full max-w-md shadow-lg">
                <h3 className="text-lg font-semibold mb-4">
                    Créer un utilisateur
                </h3>
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        name="nom"
                        placeholder="Nom"
                        value={form.nom}
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded"
                    />
                    <input
                        name="prenom"
                        placeholder="Prénom"
                        value={form.prenom}
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Mot de passe"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded"
                    />
                    <select
                        name="paysId"
                        value={form.paysId}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    >
                        <option value={1}>Côte d'Ivoire</option>
                        <option value={2}>Cameroun</option>
                        {paysOptions.map((pays) => (
                            <option key={pays.id} value={pays.id}>
                                {pays.nom}
                            </option>
                        ))}
                    </select>
                    <select
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    >
                        <option value="USER">Utilisateur</option>
                        <option value="ADMIN">Admin</option>
                    </select>

                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            {loading ? "Création..." : "Créer"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserFormModal;
