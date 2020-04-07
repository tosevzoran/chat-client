import format from 'date-fns/format';

export const timestampToString = (timestamp: number) =>
  format(new Date(timestamp), 'H:mm');
