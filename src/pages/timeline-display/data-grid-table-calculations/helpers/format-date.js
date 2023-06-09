export const formatDate = (date) => {
  return date.toLocaleDateString(undefined, {
      day:   'numeric',
      month: 'numeric',
      year:  'numeric',
    });
}