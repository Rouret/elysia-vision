import { getStatusColor } from "#/modules/request/requestSection.utils";

export const StatusTag = ({ status }: { status: number | null }) => {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
        status ? getStatusColor(status) : ""
      }`}
    >
      {status || "Pending..."}
    </span>
  );
};
