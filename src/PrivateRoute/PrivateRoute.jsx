import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../Contexts";

export function PrivateRoute({ path, element }) {
    const { authState } = useAuth();
    return authState.isUserLoggedIn ? (
        <Route path={path} element={element} />
    ) : (
        <Navigate state={{ from: path }} to="/login" replace />
    );
}