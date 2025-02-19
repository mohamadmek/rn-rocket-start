import { format, parseISO, isValid, formatDistanceToNow } from 'date-fns';

export interface IDisplateDateTimeOptions {
  display?: 'DATE_TIME' | 'DATE' | 'TIME' | 'RELATIVE' | 'MONTH_YEAR';
}

export const displayDateTime = (
  date: Date | string | null | undefined,
  options: IDisplateDateTimeOptions = {},
): string => {
  const { display = 'DATE_TIME' } = options;

  // If no date is provided or it's an empty string, return empty
  if (!date || (typeof date === 'string' && !date.trim())) {
    return '';
  }

  // Convert string dates to Date objects
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;

  // Check if the date is valid
  if (!isValid(parsedDate)) {
    return '';
  }

  // Define formats
  const formats = {
    DATE_TIME: 'MMM d, yyyy h:mm a',
    DATE: 'MMM d, yyyy',
    TIME: 'h:mm a',
    MONTH_YEAR: 'MMM yyyy',
  };

  // Handle relative time
  if (display === 'RELATIVE') {
    return formatDistanceToNow(parsedDate, { addSuffix: true });
  }

  // Return formatted date
  return format(parsedDate, formats[display] || formats.DATE_TIME);
};
