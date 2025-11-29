import { create } from 'zustand';

type HeartsModalStore = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const useHeartsModal = create<HeartsModalStore>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
