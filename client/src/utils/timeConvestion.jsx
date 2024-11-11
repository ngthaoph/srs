function timeConversion(noteTime) {
  const date = new Date(parseInt(noteTime, 10)); // Convert to Date object

  // Format the date in day/month/year format
  const day = String(date.getDate()).padStart(2, "0"); // Get day and pad with zero if needed
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month (0-indexed) and pad
  const year = date.getFullYear(); // Get year
  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
}

export default timeConversion;
