import type { NextConfig } from "next";

function ensureSafeLocalStorage() {
  const globalWithStorage = globalThis as typeof globalThis & {
    localStorage?: Storage;
  };

  if (typeof globalWithStorage.localStorage?.getItem === "function") {
    return;
  }

  const store = new Map<string, string>();

  globalWithStorage.localStorage = {
    get length() {
      return store.size;
    },
    clear() {
      store.clear();
    },
    getItem(key: string) {
      return store.has(key) ? store.get(key)! : null;
    },
    key(index: number) {
      return Array.from(store.keys())[index] ?? null;
    },
    removeItem(key: string) {
      store.delete(key);
    },
    setItem(key: string, value: string) {
      store.set(key, String(value));
    },
  };
}

ensureSafeLocalStorage();

const nextConfig: NextConfig = {
  devIndicators: false,
  allowedDevOrigins: ["192.168.100.242"],
};

export default nextConfig;
