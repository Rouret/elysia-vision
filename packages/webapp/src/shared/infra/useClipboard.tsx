export const useClipboard = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };
  return { copyToClipboard };
};
