import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  //   1.) Load Authenticated User. =
  const { isAuthenticated, isLoading } = useUser();

  // 2.) If Not OnLy Authenticated User Redirect to LOgin
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, isLoading, navigate]);

  //3.) Show a Spnner when Loading
  if (isLoading) return <Spinner />;

  // 4.) Check user in Loged in Then render App

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
