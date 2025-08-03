import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddActivityModal from "../components/AddActivityForm";

export default function UserProfil() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
const [showModal, setShowModal] = useState(false);
async function fetchUser() {
    try {
        const res = await fetch(
            `http://jobhubs.212.56.40.133.sslip.io/users/${id}`
        );
        if (!res.ok)
            throw new Error("Erreur lors du chargement du profil");
        const data = await res.json();
        setUser(data);
    } catch (err) {
        setError(err.message || "Erreur inconnue");
    } finally {
        setLoading(false);
    }
}
    useEffect(() => {
        fetchUser();
    }, [id]);

    if (loading) return <div className="p-6 text-center">Chargement...</div>;
    if (error)
        return <div className="p-6 text-center text-red-600">{error}</div>;
    if (!user)
        return <div className="p-6 text-center">Utilisateur non trouvé</div>;

    return (
        <div className="p-6 max-w-6xl mx-auto space-y-8">
            {/* Infos utilisateur */}
            <section className="bg-white rounded shadow p-6 flex items-center gap-6">
                <img
                    src={user.pays?.flag}
                    alt={user.pays?.nom}
                    className="w-16 h-10 object-cover rounded border"
                />
                <div>
                    <h1 className="text-2xl font-bold">
                        {user.prenom} {user.nom}
                    </h1>
                    <p className="text-gray-700">Email : {user.email}</p>
                    <p className="text-gray-700">
                        Pays : {user.pays?.nom} ({user.pays?.code})
                    </p>
                    <p className="text-gray-700">
                        Rôle :{" "}
                        <span className="font-semibold">{user.role}</span>
                    </p>
                    <p className="text-gray-500 text-sm">
                        Inscrit le :{" "}
                        {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                </div>
            </section>

            {/* Activités */}
            <section>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">
                        Activités ({user.Activite?.length || 0})
                    </h2>
                    <button
                        onClick={() =>
                            setShowModal(true)
                        }
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                        + Ajouter une activité
                    </button>
                </div>

                {(!user.Activite || user.Activite.length === 0) && (
                    <p className="text-gray-500">
                        Aucune activité pour cet utilisateur.
                    </p>
                )}

                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {user.Activite?.map((act) => (
                        <div
                            key={act.id}
                            className="bg-white rounded shadow p-4 flex flex-col justify-between"
                        >
                            <div>
                                <h3 className="text-lg font-semibold mb-1">
                                    {act.fonction}
                                </h3>
                                <span className="inline-block bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded mb-2">
                                    {act.categorie?.nom}
                                </span>
                                <p>
                                    <strong>Entreprise :</strong> {act.marque}
                                </p>
                                <p>
                                    <strong>Région :</strong> {act.region}
                                </p>
                                <p>
                                    <strong>Tarif :</strong> {act.tarif}
                                </p>
                                <p>
                                    <strong>Disponibilité :</strong>{" "}
                                    {act.disponibilite}
                                </p>
                                <p>
                                    <strong>Téléphone :</strong> {act.telephone}
                                </p>
                                {act.expertise && act.expertise.length > 0 && (
                                    <div className="mt-2 flex flex-wrap gap-1">
                                        {act.expertise.map((exp) => (
                                            <span
                                                key={exp.id}
                                                className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded"
                                            >
                                                {exp.nom}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {act.siteWeb && (
                                <a
                                    href={act.siteWeb}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mt-4 inline-block text-blue-600 hover:underline"
                                >
                                    Visiter le site
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </section>
            {showModal && (
                <AddActivityModal userId={id} onClose={() => setShowModal(false)} onSuccess={() => fetchUser()} />
            )}
        </div>
    );
}
