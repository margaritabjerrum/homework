import { addDays, differenceInCalendarDays  } from 'date-fns';

export const populateTableData = (userInput) => {
  const today = new Date();

  const deadline = userInput.selectedDate;
  
  const daysToDeadline = differenceInCalendarDays(deadline, today)
  console.log(daysToDeadline);

  const avgTimePerDayRequired = Number((userInput.hoursRequired / daysToDeadline)).toFixed(2)
  
  let rows = [];
  for (let i = 0; i <= daysToDeadline; i++) {
    let newDate = addDays(today, i)
    rows.push({
      id: i,
      col1: newDate.toLocaleDateString(undefined, {
        day:   'numeric',
        month: 'numeric',
        year:  'numeric',
    }),
      col2: newDate.getDay(),
      col3: userInput.restTime,
      col4: userInput.busyTime,
      col5: avgTimePerDayRequired
    })    
  }

  return rows;
}