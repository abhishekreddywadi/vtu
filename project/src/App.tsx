import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Header } from "./components/layout/Header";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { SubjectSelectionPage } from "./pages/SubjectSelectionPage";
import { PaymentPage } from "./pages/PaymentPage";
import { StatusPage } from "./pages/StatusPage";
import { DashboardLayout } from "./components/dashboard/DashboardLayout";
import { useAuthStore } from "./store/useAuthStore";
import { ResultPage } from "./pages/Result";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <div className="text-center py-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  VTU Online Revaluation System
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Welcome to the VTU Online Revaluation System. Apply for
                  revaluation, track your application status, and view results -
                  all in one place.
                </p>
              </div>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="apply" element={<SubjectSelectionPage />} />
            <Route path="payment" element={<PaymentPage />} />
            <Route path="status" element={<StatusPage />} />
            <Route path="result" element={<ResultPage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
