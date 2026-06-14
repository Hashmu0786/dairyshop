"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { users as seedUsers, getUserByEmail } from "@/data/users";
import { suppliers as seedSuppliers } from "@/data/suppliers";
import { getStorageItem, setStorageItem, removeStorageItem, STORAGE_KEYS, generateId } from "@/lib/store";

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
    if (!getStorageItem(STORAGE_KEYS.suppliers, null)) {
      setStorageItem(STORAGE_KEYS.suppliers, seedSuppliers);
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

  const signup = useCallback((userData) => {
    const storedUsers = getStorageItem(STORAGE_KEYS.users, seedUsers);
    const storedSuppliers = getStorageItem(STORAGE_KEYS.suppliers, seedSuppliers);

    const exists = storedUsers.some(
      (u) => u.email.toLowerCase() === userData.email.toLowerCase()
    );
    if (exists) {
      return { ok: false, error: "An account with this email already exists" };
    }

    const userId = generateId("usr");
    const newUser = {
      id: userId,
      status: "active",
      createdAt: new Date().toISOString().split("T")[0],
      avatar: null,
      name: userData.name,
      email: userData.email,
      password: userData.password,
      phone: userData.phone,
      company: userData.company,
      designation: userData.designation || (userData.role === "seller" ? "Owner" : "Buyer"),
      city: userData.city,
      state: userData.state,
      role: userData.role,
    };

    if (userData.role === "buyer") {
      newUser.gstin = userData.gstin || "";
    }

    let finalUser = { ...newUser };

    if (userData.role === "seller") {
      const supplierId = generateId("sup");
      finalUser.supplierId = supplierId;
      finalUser.gstin = userData.gstin || "";
      finalUser.fssai = userData.fssai || "";

      const newSupplier = {
        id: supplierId,
        name: userData.company,
        slug: userData.company.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
        tagline: "Quality dairy products and services",
        description: `${userData.company} is a newly registered supplier offering high quality dairy solutions.`,
        image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=600&h=400&fit=crop",
        logo: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=200&h=200&fit=crop",
        location: `${userData.city}, ${userData.state}`,
        state: userData.state,
        established: new Date().getFullYear(),
        employees: "1-10",
        rating: 5.0,
        reviewCount: 0,
        verified: false,
        fssai: userData.fssai || "Pending",
        gstin: userData.gstin || "Pending",
        contact: {
          person: userData.name,
          designation: userData.designation || "Owner",
          phone: userData.phone,
          email: userData.email,
          website: "",
        },
        business: {
          type: "Dairy Supplier",
          capacity: "1,000 litres/day",
          delivery: userData.city,
          minOrder: "₹1,000",
          paymentTerms: "COD",
        },
        specialties: ["Fresh Milk", "Dairy Products"],
      };

      setStorageItem(STORAGE_KEYS.suppliers, [...storedSuppliers, newSupplier]);
    }

    setStorageItem(STORAGE_KEYS.users, [...storedUsers, finalUser]);
    setUser(finalUser);
    setStorageItem(STORAGE_KEYS.session, { id: finalUser.id, role: finalUser.role });

    return { ok: true, redirect: ROLE_DASHBOARD[finalUser.role] };
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
        signup,
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
