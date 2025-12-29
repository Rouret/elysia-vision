import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type ApiAddressStore = {
  apiAddress: string;
  setApiAddress: (apiAddress: string) => void;
};

export const useApiAddressStore = create<ApiAddressStore>()(
  persist(
    (set) => ({
      apiAddress: "ws://localhost:3000",
      setApiAddress: (apiAddress) => set({ apiAddress: `ws://${apiAddress}` }),
    }),
    {
      name: "api-address-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
