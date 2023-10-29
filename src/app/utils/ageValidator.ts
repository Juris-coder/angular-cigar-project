export const isAdult = (date: string): boolean | undefined => {
  const inputDate = new Date(date);
  const currentDate = new Date();

  if (isNaN(inputDate.getTime())) {
    return;
  }

  const yearsDifference = currentDate.getFullYear() - inputDate.getFullYear();

  if (yearsDifference > 18) {
    return true;
  }

  if (yearsDifference === 18) {
    if (currentDate.getMonth() > inputDate.getMonth()) {
      return true;
    }

    if (
      currentDate.getMonth() === inputDate.getMonth() &&
      currentDate.getDate() >= inputDate.getDate()
    ) {
      return true;
    }
  }

  return false;
};
