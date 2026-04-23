"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "ovesta_cart_v1";

export type CartLine = {
  sku: string;
  name: string;
  unitPrice: number;
  image: string;
  quantity: number;
};

type Ctx = {
  lines: CartLine[];
  add: (line: Omit<CartLine, "quantity"> & { quantity?: number }) => void;
  setQty: (sku: string, quantity: number) => void;
  remove: (sku: string) => void;
  clear: () => void;
  subtotal: number;
};

const CartContext = createContext<Ctx | null>(null);

function load(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const p = JSON.parse(raw) as unknown;
    if (!Array.isArray(p)) return [];
    return p as CartLine[];
  } catch {
    return [];
  }
}

function save(lines: CartLine[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setLines(load());
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) save(lines);
  }, [lines, ready]);

  const add: Ctx["add"] = useCallback((line) => {
    const q = line.quantity ?? 1;
    setLines((prev) => {
      const i = prev.findIndex((l) => l.sku === line.sku);
      if (i < 0) {
        return [...prev, { ...line, quantity: q }];
      }
      const n = [...prev];
      n[i] = { ...n[i], quantity: n[i].quantity + q };
      return n;
    });
  }, []);

  const setQty = useCallback((sku: string, quantity: number) => {
    if (quantity <= 0) {
      setLines((prev) => prev.filter((l) => l.sku !== sku));
      return;
    }
    setLines((prev) =>
      prev.map((l) => (l.sku === sku ? { ...l, quantity } : l))
    );
  }, []);

  const remove = useCallback((sku: string) => {
    setLines((prev) => prev.filter((l) => l.sku !== sku));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const subtotal = useMemo(
    () => lines.reduce((s, l) => s + l.unitPrice * l.quantity, 0),
    [lines]
  );

  return (
    <CartContext.Provider
      value={{ lines, add, setQty, remove, clear, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const v = useContext(CartContext);
  if (!v) throw new Error("useCart must be used within CartProvider");
  return v;
}
