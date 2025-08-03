import { Trash } from "lucide-react";
import React from "react";

function CategorieList({categorie}) {
    return (
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
                    {categorie.map((categorie, idx) => (
                        <tr
                            key={categorie.id}
                            className={
                                idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                            }
                        >
                            <td className="px-3 py-2">{categorie.id}</td>
                            <td className="px-3 py-2">{categorie.nom}</td>
                            <td className="px-3 py-2">{categorie.createdAt}</td>

                            <td className="px-3 py-2">
                                <button
                                    onClick={() =>
                                        navigate(`/users/${categorie.id}`)
                                    }
                                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-green-600 text-xs"
                                >
                                    <Trash className="inline mr-1" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CategorieList;
