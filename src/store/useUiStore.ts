import { create } from "zustand";

interface UiStoreState {
  mobileNavOpen: boolean;
  pdfPreviewModalOpen: boolean;
  pdfPreviewDataUri: string | null;
  feeBreakdownModalOpen: boolean;

  setMobileNavOpen: (open: boolean) => void;
  openPdfPreview: (dataUri: string) => void;
  closePdfPreview: () => void;
  setFeeBreakdownModalOpen: (open: boolean) => void;
}

export const useUiStore = create<UiStoreState>((set) => ({
  mobileNavOpen: false,
  pdfPreviewModalOpen: false,
  pdfPreviewDataUri: null,
  feeBreakdownModalOpen: false,

  setMobileNavOpen: (open: boolean) => set({ mobileNavOpen: open }),
  openPdfPreview: (dataUri: string) => set({ pdfPreviewModalOpen: true, pdfPreviewDataUri: dataUri }),
  closePdfPreview: () => set({ pdfPreviewModalOpen: false, pdfPreviewDataUri: null }),
  setFeeBreakdownModalOpen: (open: boolean) => set({ feeBreakdownModalOpen: open }),
}));
