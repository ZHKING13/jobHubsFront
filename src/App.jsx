import React, { useState } from "react";
import "./App.css";
import ArtisanList from "./backoffice/components/ArtisanList";

// Simple login mock (à adapter avec une vraie API si besoin)
const USER = { username: "admin", password: "azerty123@" };

function App() {
    const [isAuth, setIsAuth] = useState(false);
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (
            form.username === USER.username &&
            form.password === USER.password
        ) {
            setIsAuth(true);
            setError("");
        } else {
            setError("Identifiants invalides");
        }
    };

    if (!isAuth) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <form
                    onSubmit={handleLogin}
                    className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm"
                >
                    <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
                        Connexion Backoffice
                    </h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm mb-2">
                            Nom d'utilisateur
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm mb-2">
                            Mot de passe
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                    </div>
                    {error && (
                        <div className="mb-4 text-red-500 text-sm text-center">
                            {error}
                        </div>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        Se connecter
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            {/* ...autres composants... */}
            <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-8">
                <ArtisanList />
            </div>
        </div>
    );
}

export default App;
