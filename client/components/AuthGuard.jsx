import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { LoadingPage } from "@/components/ui/loading";

export function AuthGuard({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingPage text="Checking authentication..." />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
