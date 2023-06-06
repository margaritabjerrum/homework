const weekdays = [
  'Sunday', 
  'Monday', 
  'Tuesday', 
  'Wednesday', 
  'Thursday', 
  'Friday', 
  'Saturday'
]

export const getWeekdayName = (date) => {
  return weekdays[date.getDay()]
}