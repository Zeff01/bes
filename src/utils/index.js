import { format } from "date-fns";

function formatDateAndExtractParts(inputDate) {
  const date = new Date(inputDate);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

function calculateTargetTimeAndFormat(baseTime, minutesToSubtract) {
  const targetTime = new Date(baseTime);
  targetTime.setMinutes(targetTime.getMinutes() - minutesToSubtract);

  const formattedTime = targetTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  return formattedTime;
}

export { formatDateAndExtractParts, calculateTargetTimeAndFormat};
