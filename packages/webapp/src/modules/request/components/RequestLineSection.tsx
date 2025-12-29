import { isValidElement } from "react";

export const RequestLineSection = ({
  children,
  label,
}: {
  label: string;
  children: React.ReactNode | string;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-white/50 text-sm">{label}</span>
      {isValidElement(children) ? (
        children
      ) : (
        <p className="text-white/90 font-mono">{children}</p>
      )}
    </div>
  );
};
