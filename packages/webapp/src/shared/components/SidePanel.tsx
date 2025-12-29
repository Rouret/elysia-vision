import { useSidePanel } from "#/shared/components/SidePanelContext";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  title?: string;
}>;

export const SidePanel = ({ title, children }: Props) => {
  const { isOpen, close } = useSidePanel();

  if (!isOpen) {
    return null;
  }

  return (
    <aside className="fixed z-50 right-0 top-0 h-screen max-w-[1200px] min-w-[650px] bg-linear-to-b from-white/5 to-white/2 backdrop-blur-sm border-l border-white/10 rounded-l-2xl p-6">
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={close}
            className="text-white/50 hover:text-white/90 transition-colors cursor-pointer"
          >
            ✕
          </button>
          {title && (
            <h2 className="text-xl font-semibold text-white/90">{title}</h2>
          )}
        </div>
        <div className="flex-1 text-white/70">{children}</div>
      </div>
    </aside>
  );
};
