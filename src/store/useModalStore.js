import { create } from "zustand";

export const useModalStore = create((set) => {
  return {
    isOpen: {
      bankSelectModal: false,
      depositDetailModal: false,
      loanDetailModal: false,
      infoModal: false,
      preparingModal: false,
      zoomModal: false,
    },
    setModal: (key, value) =>
      set((state) => ({
        isOpen: { ...state.isOpen, [key]: value },
      })),
  };
});
