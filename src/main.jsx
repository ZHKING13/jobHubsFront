import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import MainLayout from "./backoffice/MainLayout.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UsersPage from "./backoffice/pages/UsersPage.jsx";
import UserProfil from "./backoffice/pages/UserProfil.jsx";
import CategoriePage from "./backoffice/pages/CategoriePage.jsx";
import PagePays from "./backoffice/pages/PagePays.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <UsersPage />,
            },
            {
                path: "users",
                element: <UsersPage />,
            },
            {
                path: "users/:id",
                element: <UserProfil />,
            },
            {
                path: "categorie",
                element: <CategoriePage />,
            },
            {
                path: "pays",
                element: <PagePays />,
            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
