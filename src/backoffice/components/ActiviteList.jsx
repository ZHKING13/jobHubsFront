import React from 'react'

function ActiviteList({ activities }) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                        
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                            Activité
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                            Utilisateur
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                            Autres infos
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                            Catégorie
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                            Expertises
                        </th>
                       
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {activities.map((activity) => (
                        <tr key={activity.id} className="hover:bg-gray-50">
                           

                            {/* ACTIVITÉ */}
                            <td className="px-4 py-2 text-sm text-gray-800">
                                <div className="font-semibold">
                                    {activity.fonction}
                                </div>
                                <div className="text-gray-500 text-xs">
                                    {activity.disponibilite}
                                </div>
                            </td>

                            {/* UTILISATEUR */}
                            <td className="px-4 py-2 text-sm text-gray-800">
                                <div>{`${activity.user?.prenom} ${activity.user?.nom}`}</div>
                                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                    <img
                                        src={activity.pays?.flag}
                                        alt="flag"
                                        className="w-4 h-4 rounded-full"
                                    />
                                    {activity.pays?.nom}
                                </div>
                            </td>

                            {/* AUTRES INFOS */}
                            <td className="px-4 py-2 text-sm text-gray-800">
                                <div>📍 {activity.region}</div>
                                <div>💵 {activity.tarif}</div>
                                <div>📞 {activity.telephone}</div>
                            </td>

                            {/* CATÉGORIE */}
                            <td className="px-4 py-2 text-sm text-gray-800">
                                {activity.categorie?.nom}
                            </td>

                            {/* EXPERTISE */}
                            <td className="px-4 py-2 text-sm text-gray-800">
                                <ul className="list-disc list-inside space-y-1">
                                    {activity.expertise?.map((exp) => (
                                        <li key={exp.id}>{exp.nom}</li>
                                    ))}
                                </ul>
                            </td>

                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ActiviteList