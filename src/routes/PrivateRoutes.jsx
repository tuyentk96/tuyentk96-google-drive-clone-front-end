import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const PrivateRoutes = ({ element, ...rest }) => {
    const accessToken = useSelector((state) => state.auth.accessToken);
    const role = useSelector((state) => state.auth.role);
    const location = useLocation();

    if (location.pathname === "/login" && role === 'USER') {
        return <Navigate to="/" />;
    }

    if (location.pathname === "/login" && role === 'ADMIN') {
        return <Navigate to="/admin" />;
    }

    if (!accessToken) {
        return <Navigate to="/login" />;
    }


    return element;
};

export default PrivateRoutes;
