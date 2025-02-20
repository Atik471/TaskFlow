import PropTypes from "prop-types";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)

    if(!user && !loading) return  <Navigate to="/login" replace />

    if(loading) <div>Loading...</div>

    return (
        children
    );
};

ProtectedRoute.propTypes = {
    children: PropTypes.object.isRequired,
}

export default ProtectedRoute;