// router.jsx
import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import HomePage from "../Pages/HomePage";
import LoginPage from "../Pages/LoginPage";
import RegistrationPage from "../Pages/RegistrationPage";
import AddArtworkPage from "../Pages/AddArtworkPage";
import ExploreArtworkPage from "../Pages/ExploreArtworkPage";
import ArtworkDetailsPage from "../Pages/ArtworkDetailsPage";
import MyGalleryPage from "../Pages/MyGalleryPage";
import MyFavoritesPage from "../Pages/MyFavoritesPage";
import ErrorPage from "../Pages/ErrorPage";
import LoadingSpinner from "../Components/LoadingSpinner";



const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                element: <HomePage />,
                loader: () => {
                    return fetch("http://localhost:3000/all-artworks/most-recent").then(res => res.json());
                },
                hydrateFallbackElement: <LoadingSpinner></LoadingSpinner>
            },
            {
                path: "home",
                element: <HomePage />,
                loader: () => {
                    return fetch("http://localhost:3000/all-artworks/most-recent").then(res => res.json());
                },
                hydrateFallbackElement: <LoadingSpinner></LoadingSpinner>
            },
            {
                path: "login",
                element: <LoginPage />,
            },
            {
                path: "register",
                element: <RegistrationPage />,
            },
            {
                path: "add-artwork",
                element: <AddArtworkPage />,
            },
            {
                path: "explore-artwork",
                element: <ExploreArtworkPage />,
                loader: () => {
                    return fetch("http://localhost:3000/all-artworks/public").then(res => res.json());
                },
                hydrateFallbackElement: <LoadingSpinner></LoadingSpinner>
            },
            {
                path: "artwork-details/:id",
                element: <ArtworkDetailsPage />,
                loader: ({ params }) => {
                    return fetch(`http://localhost:3000/all-artworks/${params.id}`).then(res => res.json());
                },
                hydrateFallbackElement: <LoadingSpinner></LoadingSpinner>
            },
            {
                path: "my-gallery",
                element: <MyGalleryPage />,
            },
            {
                path: "my-favourites",
                element: <MyFavoritesPage />,
            },
        ],
    },
    {
        path: "*",
        element: <ErrorPage />,
    },
]);

export default router;
