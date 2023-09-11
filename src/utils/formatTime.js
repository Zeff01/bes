export function formatTime(hour, minute) {
  const period = hour >= 12 ? " PM" : " AM";
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  const formattedMinute = minute.toString().padStart(2, "0");
  return `${formattedHour}:${formattedMinute}${period}`;
}
