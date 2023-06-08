import { addDays, differenceInCalendarDays } from 'date-fns';
import { formatDate } from './helpers/format-date';
import { getWeekdayName } from './helpers/get-weekday-name';
import { getTimePerDayForWriting } from './helpers/get-time-per-day-for-writing';
import { formatHoursMinutes } from './helpers/format-hours-minutes';

export const populateTableData = (userInput, setIsEnoughTime) => {
  
  const today = new Date();
  
  const deadline = userInput.selectedDate;
  
  const daysToDeadline = differenceInCalendarDays(deadline, today);

  let rows = [];
  for (let i = 1; i <= daysToDeadline; i++) {
    let newDate = addDays(today, i)
    rows.push({
      id: i,
      col1: formatDate(newDate),
      col2: getWeekdayName(newDate),
      col3: userInput.restTime,
      col4: userInput.busyTime,
      col5: getTimePerDayForWriting(
        userInput.hoursRequired, 
        userInput.restTime, 
        userInput.busyTime, 
        daysToDeadline,
        setIsEnoughTime
        )
    })    
  }
  formatHoursMinutes(rows);

  return rows;
}