import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { LoadingPage } from "@/components/ui/loading";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingPage text="Checking authentication..." />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
