import format from 'date-fns/format';

export const timestampToString = (timestamp?: number) =>
  format(timestamp ? new Date(timestamp * 1000) : new Date(), 'H:mm');
