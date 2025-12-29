export const onEnterPress = (callback: () => void) => {
  return (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      callback();
    }
  };
};
