export function getWeekDays() {
  const days = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const day = new Date(today);
    day.setDate(today.getDate() + i);
    const year = day.getFullYear();
    const month = String(day.getMonth() + 1).padStart(2, "0");
    const date = String(day.getDate()).padStart(2, "0");
    days.push(`${year}-${month}-${date}`);
  }

  return days;
}
