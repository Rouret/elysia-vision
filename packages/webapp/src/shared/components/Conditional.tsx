import { Activity } from "react";

export const Conditional = ({
  condition,
  children,
}: {
  condition: boolean;
  children: React.ReactNode;
}) => {
  return (
    <Activity mode={condition ? "visible" : "hidden"}>{children}</Activity>
  );
};
