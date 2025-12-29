import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export type SidePanelContextType = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggleIsOpen: () => void;
};

const SidePanelContext = createContext<SidePanelContextType | undefined>(
  undefined
);

export const SidePanelProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const toggleIsOpen = () => setIsOpen((prev) => !prev);

  return (
    <SidePanelContext.Provider value={{ isOpen, open, close, toggleIsOpen }}>
      {children}
    </SidePanelContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSidePanel = (): SidePanelContextType => {
  const context = useContext(SidePanelContext);
  if (context === undefined) {
    throw new Error("useSidePanel must be used within a SidePanelProvider");
  }
  return context as SidePanelContextType;
};
