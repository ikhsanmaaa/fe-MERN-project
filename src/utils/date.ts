const toDateStandard = (date: any, isEndDate = false) => {
  if (!date) return null;

  const year = date.year;
  const month = String(date.month).padStart(2, "0");
  const day = String(date.day).padStart(2, "0");

  const time = isEndDate ? "23:59:59" : "00:00:00";

  return `${year}-${month}-${day} ${time}`;
};

export { toDateStandard };
