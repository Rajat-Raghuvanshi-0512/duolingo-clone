import { create } from 'zustand';

type PracticeModalStore = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const usePracticeModal = create<PracticeModalStore>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
