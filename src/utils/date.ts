import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

type DateFormatType = 'date' | 'datetime' | string;

/**
 * Format date string to specified format
 * @param date - Date string (ISO format or any parseable date string)
 * @param formatType - Format type: 'date' for YYYY-MM-DD, 'datetime' for YYYY-MM-DD HH:mm, or custom format string
 * @returns Formatted date string
 */
export const formatDate = (
  date: string | Date | null | undefined,
  formatType: DateFormatType = 'date'
): string => {
  if (!date) {
    return '';
  }

  const dateObj = dayjs(date);

  if (!dateObj.isValid()) {
    return '';
  }

  switch (formatType) {
    case 'date':
      return dateObj.format('YYYY-MM-DD');
    case 'datetime':
      return dateObj.format('YYYY-MM-DD HH:mm');
    default:
      return dateObj.format(formatType);
  }
};
