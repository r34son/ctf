export const formatUnix = (unix: number) =>
  new Date(unix).toTimeString().slice(0, 5);
