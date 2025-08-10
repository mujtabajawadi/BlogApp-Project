import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthLayout = ({ children, requiresAuthentication = true }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const authStatus = useSelector((state) => state.status);

  useEffect(() => {
    if (requiresAuthentication && authStatus !== requiresAuthentication) {
        navigate("/login");
        return
    } else if (!requiresAuthentication && authStatus !== requiresAuthentication) {
        navigate("/");
        return
    }
    setLoading(false);
  }, [authStatus, navigate, requiresAuthentication]);
  return loading ? <div>Loading...</div> : <>{children}</>;
};

export default AuthLayout;
