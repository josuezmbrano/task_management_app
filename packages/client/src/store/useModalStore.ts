import { create } from "zustand";

import type { JSX } from "react";


interface ModalState {
    content: JSX.Element | null
    isOpen: boolean
}


interface ModalActions {
    openModal: (modalContent: ModalState['content']) => void
    closeModal: () => void
}

export const useModalStore = create<ModalState & ModalActions>((set) => ({
    content: null,
    isOpen: false,
    openModal: (modalContent) => set({content: modalContent, isOpen: true}),
    closeModal: () => set({content: null, isOpen: false}),
}))