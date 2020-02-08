function selectDate(date, startEl, endEl) {

  let startDate, endDate;

  switch (date.length) {
    case 1:
      startDate = date[0].toLocaleDateString();
      if (startEl) $(startEl).val(startDate);
      break;
    case 2:
      endDate = date[1].toLocaleDateString();
      startDate = date[0].toLocaleDateString();
      if (startEl) $(startEl).val(startDate);
      if (endEl) $(endEl).val(endDate)
      break;
    default:
      $(startEl).val('');
      $(endEl).val('')
      break;
  }
}

function showCalendar(event, calendar) {

  calendar.show()
}

function hideCalendar(event, calendar) {

  calendar.hide()
}

function setDate(date, input, calendar) {

  const dateString = date.split('.').reverse().join('-');
  let startDate, endDate;

  if (input.classList.contains('start_date')) {

    startDate = new Date(dateString)
    endDate = calendar.selectedDates[1] ? calendar.selectedDates[1] : startDate

  } else if (input.classList.contains('end_date')) {

    endDate = new Date(dateString)
    startDate = calendar.selectedDates[0] ? calendar.selectedDates[0] : new Date()
  }

  const dateArr = [startDate, endDate]
  calendar.selectDate(dateArr)

}

export {
  selectDate,
  showCalendar,
  hideCalendar,
  setDate
}