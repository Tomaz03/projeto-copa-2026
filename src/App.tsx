import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import { ROUTE_PATHS } from "@/lib/index";
import { useAuth, AuthProvider } from "@/hooks/useAuth";
import { Layout } from "@/components/Layout";

// Page Imports
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Rules from "@/pages/Rules";
import Teams from "@/pages/Teams";
import TeamDetails from "@/pages/TeamDetails";
import UserDashboard from "@/pages/UserDashboard";
import MyPredictions from "@/pages/MyPredictions";
import Ranking from "@/pages/Ranking";
import ViewPredictions from "@/pages/ViewPredictions";
import AdminDashboard from "@/pages/AdminDashboard";
import ManageUsers from "@/pages/ManageUsers";
import ManageResults from "@/pages/ManageResults";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

/**
 * Componente para proteger rotas que exigem autenticação básica
 */
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTE_PATHS.LOGIN} replace />;
  }

  return <>{children}</>;
};

/**
 * Componente para proteger rotas administrativas
 */
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTE_PATHS.LOGIN} replace />;
  }

  if (!isAdmin) {
    return <Navigate to={ROUTE_PATHS.DASHBOARD} replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Layout>
      <Routes>
        {/* Rotas Públicas */}
        <Route path={ROUTE_PATHS.HOME} element={<Home />} />
        <Route path={ROUTE_PATHS.LOGIN} element={<Login />} />
        <Route path={ROUTE_PATHS.REGISTER} element={<Register />} />
        <Route path={ROUTE_PATHS.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={ROUTE_PATHS.RESET_PASSWORD} element={<ResetPassword />} />
        <Route path={ROUTE_PATHS.RULES} element={<Rules />} />
        <Route path={ROUTE_PATHS.TEAMS} element={<Teams />} />
        <Route path={ROUTE_PATHS.TEAM_DETAILS} element={<TeamDetails />} />
        <Route path={ROUTE_PATHS.RANKING} element={<Ranking />} />
        <Route path={ROUTE_PATHS.VIEW_PREDICTIONS} element={<ViewPredictions />} />

        {/* Rotas Protegidas (Usuário Comum) */}
        <Route
          path={ROUTE_PATHS.DASHBOARD}
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTE_PATHS.MY_PREDICTIONS}
          element={
            <ProtectedRoute>
              <MyPredictions />
            </ProtectedRoute>
          }
        />

        {/* Rotas Administrativas */}
        <Route
          path={ROUTE_PATHS.ADMIN_DASHBOARD}
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path={ROUTE_PATHS.MANAGE_USERS}
          element={
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          }
        />
        <Route
          path={ROUTE_PATHS.MANAGE_RESULTS}
          element={
            <AdminRoute>
              <ManageResults />
            </AdminRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to={ROUTE_PATHS.HOME} replace />} />
      </Routes>
    </Layout>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <BrowserRouter>
            <AppRoutes />
            <Toaster />
            <Sonner position="top-right" />
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;