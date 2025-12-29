import type { VisionCall } from "#/modules/request/infra/request.types";
import { create, useStore } from "zustand";

type CallsStore = {
  calls: VisionCall[];

  getCalls: () => VisionCall[];
  setCalls: (calls: VisionCall[]) => void;
  getCallById: (id: string) => VisionCall | undefined;
  updateCallById: (id: string, call: VisionCall) => void;
  isCallExists: (id: string) => boolean;
  clearCalls: () => void;
};

export const callsStore = create<CallsStore>((set, get) => ({
  calls: [],
  setCalls: (calls) => set({ calls: calls }),
  getCalls: () => get().calls,
  clearCalls: () => set({ calls: [] }),
  updateCallById: (id, call) =>
    set((state) => ({
      calls: state.calls.map((c) => (c.id === id ? call : c)),
    })),
  isCallExists: (id) => get().calls.some((c) => c.id === id),
  getCallById: (id) => get().calls.find((c) => c.id === id),
}));

export const useSetCalls = () =>
  useStore(callsStore, (state) => state.setCalls);

export const useGetCalls = () =>
  useStore(callsStore, (state) => state.getCalls);

export const useClearCalls = () =>
  useStore(callsStore, (state) => state.clearCalls);

export const useUpdateCallById = () =>
  useStore(callsStore, (state) => state.updateCallById);

export const useIsCallExists = () =>
  useStore(callsStore, (state) => state.isCallExists);

// WARNING: Reactive
export const useGetCallReactive = () =>
  useStore(callsStore, (state) => state.calls);

// WARNING: Reactive
export const useGetCallReactiveById = (id: string | null) =>
  useStore(callsStore, (state) =>
    id ? state.calls.find((c) => c.id === id) : null
  );
