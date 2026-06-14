"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { products as seedProducts } from "@/data/products";
import { orders as seedOrders } from "@/data/orders";
import { inquiries as seedInquiries } from "@/data/inquiries";
import { getSupplierById } from "@/data/suppliers";
import { getUserById } from "@/data/users";
import {
  generateId,
  generateOrderNumber,
  getStorageItem,
  setStorageItem,
  STORAGE_KEYS,
} from "@/lib/store";

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [orders, setOrders] = useState(seedOrders);
  const [inquiries, setInquiries] = useState(seedInquiries);
  const [products, setProducts] = useState(seedProducts);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setOrders(getStorageItem(STORAGE_KEYS.orders, seedOrders));
    setInquiries(getStorageItem(STORAGE_KEYS.inquiries, seedInquiries));
    setProducts(getStorageItem(STORAGE_KEYS.products, seedProducts));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    setStorageItem(STORAGE_KEYS.orders, orders);
  }, [orders, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    setStorageItem(STORAGE_KEYS.inquiries, inquiries);
  }, [inquiries, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    setStorageItem(STORAGE_KEYS.products, products);
  }, [products, hydrated]);

  const addInquiry = useCallback((data) => {
    const inquiry = {
      id: generateId("inq"),
      status: "new",
      response: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...data,
    };
    setInquiries((prev) => [inquiry, ...prev]);
    return inquiry;
  }, []);

  const updateInquiry = useCallback((id, updates) => {
    setInquiries((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, ...updates, updatedAt: new Date().toISOString() } : i
      )
    );
  }, []);

  const addOrder = useCallback((data) => {
    const order = {
      id: generateId("ord"),
      orderNumber: generateOrderNumber(),
      status: "pending",
      paymentStatus: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deliveredAt: null,
      ...data,
    };
    setOrders((prev) => [order, ...prev]);
    return order;
  }, []);

  const updateOrder = useCallback((id, updates) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o;
        const next = { ...o, ...updates, updatedAt: new Date().toISOString() };
        if (updates.status === "delivered" && !next.deliveredAt) {
          next.deliveredAt = new Date().toISOString();
        }
        return next;
      })
    );
  }, []);

  const updateProduct = useCallback((id, updates) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  }, []);

  const addProduct = useCallback((data) => {
    const product = {
      id: generateId("prod"),
      featured: false,
      inStock: true,
      rating: 4.5,
      ...data,
    };
    setProducts((prev) => [product, ...prev]);
    return product;
  }, []);

  const deleteProduct = useCallback((id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const resetData = useCallback(() => {
    setOrders(seedOrders);
    setInquiries(seedInquiries);
    setProducts(seedProducts);
    setStorageItem(STORAGE_KEYS.orders, seedOrders);
    setStorageItem(STORAGE_KEYS.inquiries, seedInquiries);
    setStorageItem(STORAGE_KEYS.products, seedProducts);
  }, []);

  const enrichOrder = useCallback((order) => {
    const buyer = getUserById(order.buyerId);
    const supplier = getSupplierById(order.supplierId);
    return {
      ...order,
      buyer: buyer ? { id: buyer.id, name: buyer.name, company: buyer.company, email: buyer.email } : null,
      supplier: supplier ? { id: supplier.id, name: supplier.name, location: supplier.location } : null,
    };
  }, []);

  const enrichInquiry = useCallback((inquiry) => {
    const buyer = inquiry.buyerId ? getUserById(inquiry.buyerId) : null;
    const supplier = getSupplierById(inquiry.supplierId);
    const product = products.find((p) => p.id === inquiry.productId);
    return {
      ...inquiry,
      buyer: buyer ? { id: buyer.id, name: buyer.name, company: buyer.company } : null,
      supplier: supplier ? { id: supplier.id, name: supplier.name } : null,
      product: product ? { id: product.id, name: product.name } : null,
    };
  }, [products]);

  const stats = useMemo(() => {
    const totalRevenue = orders
      .filter((o) => o.status !== "cancelled")
      .reduce((sum, o) => sum + o.total, 0);
    const pendingOrders = orders.filter((o) => o.status === "pending").length;
    const newInquiries = inquiries.filter((i) => i.status === "new").length;
    return {
      totalOrders: orders.length,
      totalRevenue,
      pendingOrders,
      totalInquiries: inquiries.length,
      newInquiries,
      totalProducts: products.length,
      inStockProducts: products.filter((p) => p.inStock).length,
    };
  }, [orders, inquiries, products]);

  return (
    <DataContext.Provider
      value={{
        orders,
        inquiries,
        products,
        hydrated,
        stats,
        addInquiry,
        updateInquiry,
        addOrder,
        updateOrder,
        updateProduct,
        addProduct,
        deleteProduct,
        resetData,
        enrichOrder,
        enrichInquiry,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}
