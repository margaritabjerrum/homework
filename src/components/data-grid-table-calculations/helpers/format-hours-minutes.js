export const formatHoursMinutes = (data) => {
  data.forEach((row) => {
    row.col5 = (Number(row.col5)).toFixed(2);
    const index = row.col5.indexOf('.');
    const hours = Number(row.col5.slice(0, index));
    const minutes = (60 * Number(row.col5.slice(index, row.col5.length))).toFixed();
    row.col5 = `${hours}h ${minutes}min`;
  })
}