

import { useAuth } from "./AuthContext";
import Login from "./Login";
import Signup from "./Signup";
import { useState } from "react";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const [showLogin, setShowLogin] = useState(true);

  if (!user) {
    return (
      <div className="auth-overlay">
        {showLogin ? (
          <Login switchToSignup={() => setShowLogin(false)} onSuccess={() => {}} />
        ) : (
          <Signup switchToLogin={() => setShowLogin(true)} onSuccess={() => {}} />
        )}
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;