import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ArtisanList from "./backoffice/components/ArtisanList";
import UserList from "./backoffice/components/UserListe";
import MainLayout from "./backoffice/MainLayout";
import LoginForm from "./backoffice/pages/LoginForm";

// Simple login mock (à adapter avec une vraie API si besoin)
const USER = { username: "admin", password: "azerty123@" };

function App() {
    const [isAuth, setIsAuth] = useState(false);

    //check if user is authenticated
    const isAuthenticated = () => {
        const storedUser = localStorage.getItem("jobhubs_auth");
        if (storedUser) {
            const user = JSON.parse(storedUser);
            return true
        }
        return false;
    }
useEffect(() => {
        setIsAuth(isAuthenticated());
    }, []);

    // If user is authenticated, show MainLayout, else show LoginForm
    if (isAuth) {
        return <MainLayout/>
    }
   return isAuthenticated() ? <MainLayout/> : <LoginForm onLogin={setIsAuth}/>;

}
export default App;