import { RequestSidePanel } from "#/modules/request/components/RequestSidePanel";
import { StatusTag } from "#/modules/request/components/StatusTag";
import { useRequestSocketManager } from "#/modules/request/components/useRequestSocketManager";
import type { VisionCall } from "#/modules/request/infra/request.types";
import { useGetCallReactive } from "#/modules/request/infra/requests.store";
import { useSidePanel } from "#/shared/components/SidePanelContext";
import { formatTime } from "#/shared/utils/time.utils";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type Row,
} from "@tanstack/react-table";
import { useEffect, useMemo, useRef, useState } from "react";

const columnHelper = createColumnHelper<VisionCall>();

const columns = [
  columnHelper.accessor("response.status", {
    header: "Status",
    size: 100,
    cell: (info) => {
      const status = info.getValue();

      return <StatusTag status={status} />;
    },
  }),
  columnHelper.accessor("request.path", {
    header: "Path",
    cell: (info) => {
      const path = info.getValue();
      const method = info.row.original.request.method;
      return (
        <span className=" px-3 py-1 rounded-full flex gap-2 items-center">
          <span className="text-sm font-semibold">{method}</span>
          <span className="text-sm">{path}</span>
        </span>
      );
    },
  }),

  columnHelper.accessor("request.timestamp", {
    header: "Timestamp",
    cell: (info) => (
      <span className="text-white/90 font-mono text-xs">
        {formatTime(info.getValue())}
      </span>
    ),
  }),
  columnHelper.accessor("duration", {
    header: "Duration",
    cell: (info) => {
      const duration = info.getValue();

      return (
        <span className="text-white/90 font-mono text-sm">
          {duration === null ? "Pending..." : `${duration}ms`}
        </span>
      );
    },
  }),
];

export const RequestSectionPage = () => {
  useRequestSocketManager();
  const calls = useGetCallReactive();

  const { open: openSidePanel, isOpen } = useSidePanel();
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
  const selectedCallIdRef = useRef<string | null>(null);

  useEffect(() => {
    // Reset selected row id when side panel is closed
    //TODO: setup callback "onClose" on SidePanel to reset selected row id
    if (!isOpen) {
      setSelectedRowId(null);
    }
  }, [isOpen]);

  const handleRowClick = (row: Row<VisionCall>) => {
    setSelectedRowId(row.id);
    selectedCallIdRef.current = row.original.id;
    openSidePanel();
  };

  const coreRowModel = useMemo(() => getCoreRowModel(), []);

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: calls,
    columns,
    getCoreRowModel: coreRowModel,
  });

  return (
    <div className="h-full w-full flex flex-col p-6">
      <RequestSidePanel id={selectedCallIdRef.current} />
      <div className="flex-1 overflow-auto flex flex-col gap-4">
        <div className="border border-white/10 rounded-lg overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="sticky top-0 bg-linear-to-b from-white/5 to-white/2 backdrop-blur-sm z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b border-white/10">
                  {headerGroup.headers.map((header, index) => (
                    <th
                      key={header.id}
                      className={`text-left px-6 py-4 text-sm font-semibold text-white/70 uppercase tracking-wider ${
                        index === 0 ? "rounded-tl-lg" : ""
                      } ${
                        index === headerGroup.headers.length - 1
                          ? "rounded-tr-lg"
                          : ""
                      }`}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => handleRowClick(row)}
                  className={`cursor-pointer border-b border-white/5 hover:bg-white/[0.07] hover:shadow-sm transition-all duration-200 ${
                    selectedRowId === row.id ? "bg-white/[0.07]" : ""
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
