import { create } from 'zustand';

type ExitModalStore = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const useExitModal = create<ExitModalStore>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
