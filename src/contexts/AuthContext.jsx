/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { authApi } from "../api/client";

const AuthContext = createContext(null);

const STORAGE_TOKEN_KEY = "dipcoder_token";
const STORAGE_USER_KEY = "dipcoder_user";

const readApiErrorMessage = (error) => {
  const responseData = error?.response?.data;
  if (Array.isArray(responseData?.errors) && responseData.errors.length) {
    return responseData.errors.join(", ");
  }

  if (responseData?.message) {
    return responseData.message;
  }

  if (error?.code === "ERR_NETWORK") {
    return "Backend API is unreachable. Start backend server on http://localhost:5000.";
  }

  return error?.message || "Authentication request failed";
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem(STORAGE_TOKEN_KEY) || "");
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem(STORAGE_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  });
  const [loading, setLoading] = useState(Boolean(token));

  useEffect(() => {
    const hydrateProfile = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await authApi.profile();
        setUser(response.data.user);
        localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(response.data.user));
      } catch {
        localStorage.removeItem(STORAGE_TOKEN_KEY);
        localStorage.removeItem(STORAGE_USER_KEY);
        setToken("");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    hydrateProfile();
  }, [token]);

  const handleAuthSuccess = useCallback((response) => {
    const nextToken = response.data.token;
    const nextUser = response.data.user;

    localStorage.setItem(STORAGE_TOKEN_KEY, nextToken);
    localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(nextUser));
    setToken(nextToken);
    setUser(nextUser);
  }, []);

  const ensureAuthReady = useCallback(async () => {
    const response = await authApi.health();
    const dbState = response?.data?.db;
    if (dbState !== "connected") {
      throw new Error("Backend is running but database is not connected yet. Check backend MongoDB connection.");
    }
  }, []);

  const login = useCallback(async (payload) => {
    try {
      await ensureAuthReady();
      const response = await authApi.login(payload);
      handleAuthSuccess(response);
      return response;
    } catch (error) {
      throw new Error(readApiErrorMessage(error));
    }
  }, [ensureAuthReady, handleAuthSuccess]);

  const register = useCallback(async (payload) => {
    try {
      await ensureAuthReady();
      const response = await authApi.register(payload);
      handleAuthSuccess(response);
      return response;
    } catch (error) {
      throw new Error(readApiErrorMessage(error));
    }
  }, [ensureAuthReady, handleAuthSuccess]);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_TOKEN_KEY);
    localStorage.removeItem(STORAGE_USER_KEY);
    setToken("");
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      isAuthenticated: Boolean(token && user),
      isAdmin: user?.role === "admin",
      login,
      register,
      logout,
    }),
    [token, user, loading, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
