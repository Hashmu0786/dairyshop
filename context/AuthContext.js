"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { users as seedUsers, getUserByEmail } from "@/data/users";
import { getStorageItem, setStorageItem, removeStorageItem, STORAGE_KEYS } from "@/lib/store";

const AuthContext = createContext(null);

const ROLE_DASHBOARD = {
  admin: "/admin",
  buyer: "/buyer",
  seller: "/seller",
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!getStorageItem(STORAGE_KEYS.users, null)) {
      setStorageItem(STORAGE_KEYS.users, seedUsers);
    }
    const session = getStorageItem(STORAGE_KEYS.session, null);
    if (session?.id) {
      const storedUsers = getStorageItem(STORAGE_KEYS.users, seedUsers);
      const found = storedUsers.find((u) => u.id === session.id);
      if (found && found.status === "active") {
        setUser(found);
      } else {
        removeStorageItem(STORAGE_KEYS.session);
      }
    }
    setReady(true);
  }, []);

  const login = useCallback((email, password) => {
    const storedUsers = getStorageItem(STORAGE_KEYS.users, seedUsers);
    const account = storedUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!account) {
      return { ok: false, error: "Invalid email or password" };
    }
    if (account.status !== "active") {
      return { ok: false, error: "Your account has been deactivated" };
    }

    const { password: _, ...safeUser } = account;
    setUser(account);
    setStorageItem(STORAGE_KEYS.session, { id: account.id, role: account.role });
    return { ok: true, redirect: ROLE_DASHBOARD[account.role] };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    removeStorageItem(STORAGE_KEYS.session);
  }, []);

  const updateProfile = useCallback((updates) => {
    if (!user) return;
    const storedUsers = getStorageItem(STORAGE_KEYS.users, seedUsers);
    const nextUsers = storedUsers.map((u) => (u.id === user.id ? { ...u, ...updates } : u));
    setStorageItem(STORAGE_KEYS.users, nextUsers);
    const updated = nextUsers.find((u) => u.id === user.id);
    setUser(updated);
  }, [user]);

  const getAllUsers = useCallback(() => {
    return getStorageItem(STORAGE_KEYS.users, seedUsers);
  }, []);

  const updateUserStatus = useCallback((userId, status) => {
    const storedUsers = getStorageItem(STORAGE_KEYS.users, seedUsers);
    const nextUsers = storedUsers.map((u) => (u.id === userId ? { ...u, status } : u));
    setStorageItem(STORAGE_KEYS.users, nextUsers);
    if (user?.id === userId) setUser(nextUsers.find((u) => u.id === userId));
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        ready,
        login,
        logout,
        updateProfile,
        getAllUsers,
        updateUserStatus,
        dashboardPath: user ? ROLE_DASHBOARD[user.role] : null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export { ROLE_DASHBOARD };
