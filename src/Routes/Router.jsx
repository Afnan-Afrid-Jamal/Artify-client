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

const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                element: <HomePage></HomePage>,
            },
            {
                path: "home",
                element: <HomePage></HomePage>,
            },
            {
                path: "login",
                element: <LoginPage></LoginPage>,
            },
            {
                path: "register",
                element: <RegistrationPage></RegistrationPage>,
            },
            {
                path: "add-artwork",
                element: <AddArtworkPage></AddArtworkPage>,
            },
            {
                path: "explore-artwork",
                element: <ExploreArtworkPage></ExploreArtworkPage>,
            },
            {
                path: "artwork-details",
                element: <ArtworkDetailsPage></ArtworkDetailsPage>,
            },
            {
                path: "my-gallery",
                element: <MyGalleryPage></MyGalleryPage>,
            },
            {
                path: "my-favourites",
                element: <MyFavoritesPage></MyFavoritesPage>,
            },
        ]
    },
    {
        path: "*",
        element: <ErrorPage></ErrorPage>,
    },
]);
export default router;