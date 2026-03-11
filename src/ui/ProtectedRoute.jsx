import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useEffect } from "react";
import styled from "styled-components";

const  FullPage =  styled.div`
  height: 100vh;
  background-color: var(--color--grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  //   1.) Load Authenticated User. =
  const { isAuthenticated, isLoading } = useUser();
  console.log(isAuthenticated);
  

  // 2.) If Not OnLy Authenticated User Redirect to LOgin
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, isLoading, navigate]);

  //3.) Show a Spnner when Loading
  if (isLoading) return <FullPage> <Spinner /> </FullPage>;

  // 4.) Check user in Loged in Then render App
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
