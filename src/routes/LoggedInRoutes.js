import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function LoggedInRoutes() {
  const { user } = useSelector((state) => {
    return { ...state };
  });
  return <>{user ? <Outlet /> : <Navigate to="/" />}</>;
}