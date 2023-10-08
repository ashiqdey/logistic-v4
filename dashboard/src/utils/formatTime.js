import { format, getTime, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

export function fDate(date) {
  return format(new Date(date), 'dd MMM yyyy');
}

export function fDate2(date) {
  if (!date) return '';
  if (typeof date === 'string') {
    return format(new Date(date), 'yyyy-MM-dd');
  }
  return format(date, 'yyyy-MM-dd');
}

export function fDate3(date) {
  return format(new Date(date), 'E, d MMM ● h:mm a');
}

export function fDateTime(date) {
  return format(new Date(date), 'dd MMM yyyy HH:mm');
}
export function fDateTime2(date) {
  return format(new Date(date), 'yyyy-MMM-dd HH:mm:00');
}

export function fTimestamp(date) {
  return getTime(new Date(date));
}

export function fDateTimeSuffix(date) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p');
}

export function fToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true
  });
}
