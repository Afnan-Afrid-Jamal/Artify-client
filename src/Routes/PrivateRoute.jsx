import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../Provider/AuthContext';
import LoadingSpinner from '../Components/LoadingSpinner';

const PrivateRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <LoadingSpinner />
    }

    if (user) {
        return children;
    }
    else
        return <Navigate to="/login" state={location.pathname} />;

};

export default PrivateRoute;