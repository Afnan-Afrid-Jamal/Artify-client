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
import PrivateRoute from "./PrivateRoute";
import AboutUs from "../Pages/AboutUs";
import Blogs from "../Pages/Blogs";
import ViewBlogDetails from "../Pages/ViewBlogDetails";



const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                element: <HomePage />,
                loader: () => {
                    return fetch("https://artify-server-sigma.vercel.app/all-artworks/most-recent").then(res => res.json());
                },
                hydrateFallbackElement: <LoadingSpinner></LoadingSpinner>
            },
            {
                path: "home",
                element: <HomePage />,
                loader: () => {
                    return fetch("https://artify-server-sigma.vercel.app/all-artworks/most-recent").then(res => res.json());
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
                element: <PrivateRoute><AddArtworkPage /></PrivateRoute>,
            },
            {
                path: "explore-artwork",
                element: <ExploreArtworkPage />,

            },
            {
                path: "about-us",
                element: <AboutUs />,

            },
            {
                path: "blogs",
                element: <Blogs />,

            },
            {
                path: "blog-details/:id",
                element: <ViewBlogDetails />,

            },
            {
                path: "artwork-details/:id",
                element: <ArtworkDetailsPage />,
            },
            {
                path: "my-gallery",
                element: <PrivateRoute><MyGalleryPage /></PrivateRoute>,
            },
            {
                path: "my-favourites",
                element: (
                    <PrivateRoute>
                        <MyFavoritesPage />
                    </PrivateRoute>
                ),

            },
        ],
    },
    {
        path: "*",
        element: <ErrorPage />,
    },
]);

export default router;