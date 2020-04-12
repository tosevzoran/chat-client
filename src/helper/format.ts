import format from 'date-fns/format';

export const timestampToString = (timestamp?: number) =>
  format(new Date(timestamp ? timestamp * 1000 : 'now'), 'H:mm');
