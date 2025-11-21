import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../Firebase/firebase.config";
import LoadingSpinner from "../Components/LoadingSpinner";
import SweetAlert from "../Components/SweetAlert";

const AuthProvider = ({ children }) => {
    const auth = getAuth(app);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { successAlert, errorAlert } = SweetAlert();


    // Registration with email and password
    const customCreateUserWithEmailAndPassword = (email, password, userName, userPhotoUrl) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const newUser = userCredential.user;

                // Update Profile with direct parameters
                return updateProfile(newUser, {
                    displayName: userName,
                    photoURL: userPhotoUrl || "https://i.ibb.co.com/RGCchFdt/user-Images.png"
                })
                    .then(() => {
                        successAlert("Your registration is complete. Enjoy your journey with us!")

                        const updatedUser = {
                            ...newUser,
                            displayName: userName,
                            photoURL: userPhotoUrl || "https://i.ibb.co.com/RGCchFdt/user-Images.png"
                        };
                        setUser(updatedUser);

                        setLoading(false);
                        return updatedUser;
                    });
            })
            .catch((error) => {
                errorAlert(error.message);
                setLoading(false);
            });
    };



    // Google SignIn
    const customGoogleSignIn = () => {
        const provider = new GoogleAuthProvider();

        setLoading(true);

        // return add kora holo
        return signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                setUser(user);
                setLoading(false);

                successAlert(`Hello ${user.displayName || "User"}! Great to have you back. Enjoy your journey with us!`);
            })
            .catch((error) => {
                setLoading(false);
                errorAlert(error.message);
            });
    };



    // Login with email and password

    const customLoginWithEmailAndPassword = (email, password) => {

        setLoading(true)
        // return add kora holo
        return signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {

                const user = userCredential.user;
                setUser(user);
                setLoading(false)
                successAlert(`Welcome back, ${user.displayName || "User"}! You are logged in successfully.`);


            })
            .catch((error) => {
                setLoading(false)
                errorAlert(error.message);
            });


    }



    // Logout
    const handleLogout = () => {
        setLoading(true);

        return signOut(auth)
            .then(() => {
                setUser(null);
                setLoading(false);
                successAlert("Logged out successfully!");
            })
            .catch((error) => {
                setLoading(false);
                errorAlert(error.message);
            });
    };


    // Check user state(Observer)
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [auth]);

    const value = {
        user,
        loading,
        customCreateUserWithEmailAndPassword,
        customGoogleSignIn,
        customLoginWithEmailAndPassword,
        handleLogout,
    };

    return (
        <AuthContext.Provider value={value}>
            {
                loading ? <LoadingSpinner></LoadingSpinner> : children
            }
        </AuthContext.Provider>
    );
};

export default AuthProvider;