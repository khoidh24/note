import { create } from "zustand";

interface OpenEditStore {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

export const useOpenEditStore = create<OpenEditStore>((set) => ({
  isOpen: false,
  setOpen: (open: boolean) => set({ isOpen: open }),
}));
