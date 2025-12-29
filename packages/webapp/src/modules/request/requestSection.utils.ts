const colors: Record<string, string> = {
  GREEN: "text-green-400 bg-green-400/10",
  BLUE: "text-blue-400 bg-blue-400/10",
  YELLOW: "text-yellow-400 bg-yellow-400/10",
  ORANGE: "text-orange-400 bg-orange-400/10",
  RED: "text-red-400 bg-red-400/10",
};

export const getStatusColor = (status: number) => {
  if (status >= 200 && status < 300) {
    return colors.GREEN;
  }
  if (status >= 300 && status < 400) {
    return colors.BLUE;
  }
  if (status >= 400) {
    return colors.RED;
  }
};
