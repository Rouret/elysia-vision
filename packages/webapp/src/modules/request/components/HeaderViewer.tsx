import { useClipboard } from "#/shared/infra/useClipboard";
import { Clipboard } from "lucide-react";
import { toast } from "react-hot-toast";

export const HeaderViewer = ({
  headers,
}: {
  headers: Record<string, string | number>;
}) => {
  const { copyToClipboard } = useClipboard();

  const handleCopyPaste = (value: string | number) => {
    alert(value);
    toast("Copied to clipboard");
    copyToClipboard(value.toString());
  };

  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
      <table className="table">
        <tbody>
          {Object.entries(headers).map(([key, value]) => {
            return (
              <tr key={key}>
                <th>{key}</th>
                <td className="flex justify-between items-center">
                  <p className="overflow-hidden text-ellipsis whitespace-nowrap">
                    {value}
                  </p>
                  <button
                    className="cursor-pointer rounded-lg p-1 hover:rotate-12 hover:transition-all hover:duration-300"
                    onClick={() => handleCopyPaste(value)}
                  >
                    <Clipboard />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
