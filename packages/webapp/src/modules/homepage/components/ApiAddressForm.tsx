import { useApiAddressStore } from "#/lib/apiAddress.store";
import { connectSocket } from "#/lib/socket";
import { Button } from "#/shared/components/Button";
import { Conditional } from "#/shared/components/Conditional";
import { onEnterPress } from "#/shared/utils/input.utils";
import { useRef, useState } from "react";

export const ApiAddressForm = () => {
  const [needToUpdateAddress, setNeedToUpdateAddress] = useState(false);
  const { apiAddress, setApiAddress } = useApiAddressStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    const apiAddress = inputRef.current?.value;
    setNeedToUpdateAddress(false);
    if (!apiAddress) return;

    setApiAddress(apiAddress);
    connectSocket();
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 ">
      <p className="flex items-center gap-2">
        Currently using
        <div className="badge badge-soft badge-info">{apiAddress}</div>
      </p>
      <Conditional condition={!needToUpdateAddress}>
        <a
          className="link text-sm"
          onClick={() => setNeedToUpdateAddress(true)}
        >
          Edit the url
        </a>
      </Conditional>
      <Conditional condition={needToUpdateAddress}>
        <label className="input">
          <span className="label">ws://</span>
          <input
            type="text"
            ref={inputRef}
            placeholder="URL"
            defaultValue={apiAddress.replace("ws://", "")}
            // eslint-disable-next-line react-hooks/refs
            onKeyDown={onEnterPress(handleSave)}
          />
        </label>
        <Button label="Save" onClick={handleSave} />
      </Conditional>
    </div>
  );
};
