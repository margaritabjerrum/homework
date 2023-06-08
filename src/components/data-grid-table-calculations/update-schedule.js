import { formatHoursMinutes } from "./helpers/format-hours-minutes";

export const updateSchedule = (newRows, userInput, setIsEnoughTime, daysToDeadline) => {
  let totalAvailableTime = 0;
  newRows.forEach((row) => {
    totalAvailableTime += 24 - (row.col3 + row.col4);
  })

  if (totalAvailableTime >= userInput.hoursRequired) {
    setIsEnoughTime('yes');

    let avgWritingTime = userInput.hoursRequired / daysToDeadline;

    let allDaysFitAverage = true;
    newRows.forEach((row) => {
      const availableTimeInTheDay = 24 - (row.col3 + row.col4);
      if (availableTimeInTheDay - avgWritingTime < 0) {
        allDaysFitAverage = false;
      }
    })

    let hoursAssigned = 0;
    let daysCalculated = 0;

    newRows.forEach((row) => {
      const availableTimeInTheDay = 24 - (row.col3 + row.col4);
      if (allDaysFitAverage) {
        row.col5 = avgWritingTime.toFixed(2);
        hoursAssigned += Number(row.col5);
        return;
      }

      if (avgWritingTime >= availableTimeInTheDay) {
        row.col5 = availableTimeInTheDay.toFixed(2);
        hoursAssigned += Number(row.col5);
        daysCalculated += 1;
      } else if (totalAvailableTime === userInput.hoursRequired) {
        row.col5 = availableTimeInTheDay.toFixed(2);
        hoursAssigned += Number(row.col5);
        daysCalculated += 1;
      } else {
        row.col5 = Number(((userInput.hoursRequired - hoursAssigned) / (daysToDeadline - daysCalculated)).toFixed(2));
        hoursAssigned += Number(row.col5);
        daysCalculated += 1;
      }
    })

    if (hoursAssigned < userInput.hoursRequired) {
      newRows.forEach((row) => {
        if ((24 - (row.col3 + row.col4)) > row.col5) {
          row.col5 += Number((userInput.hoursRequired - hoursAssigned).toFixed(2));
          hoursAssigned += userInput.hoursRequired - hoursAssigned;
        }
      })
    }

    formatHoursMinutes(newRows);

  } else {
    setIsEnoughTime('no');
    newRows.forEach((row) => {
      row.col5 = '-';
    })
  }


  return newRows;
}