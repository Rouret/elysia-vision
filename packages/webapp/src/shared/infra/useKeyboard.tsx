import { useEffect, useRef } from "react";

type Bind = {
  key: string;
  action: () => void;
};

export const useKeyboard = (binds: Bind[]) => {
  const keyboardState = useRef(new Set<string>());

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      binds.forEach((bind) => {
        if (event.key === bind.key && !keyboardState.current.has(bind.key)) {
          bind.action();
          keyboardState.current.add(bind.key);
        }
      });
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      binds.forEach((bind) => {
        if (event.key === bind.key) {
          keyboardState.current.delete(bind.key);
        }
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [binds]);
};
