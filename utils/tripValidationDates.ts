export function validateTripDates(startDateStr: string, endDateStr: string): string | null {
  const today = new Date();
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return 'Please enter valid start and end dates.';
  }

  if (startDate <= today) {
    return 'Start date must be after today.';
  }

  if (endDate <= startDate) {
    return 'End date must be after start date.';
  }

  return null;
}