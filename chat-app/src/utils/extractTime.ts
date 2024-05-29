export function extractTime(time: string): string {
  const date = new Date(time);
  const hours = padzero(date.getHours());
  const minutes = padzero(date.getMinutes());
  return `${hours}:${minutes}`;
}

//Helper function to pad zero
function padzero(num: number): string {
  return num.toString().padStart(2, "0");
}
