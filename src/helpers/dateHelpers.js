// Comment

// new Date(Date.now()) ||  "2020-03-05T07:00:00.000Z"
// --> 02/15/2020 17:54
const dateToMMDDTimeString = (date) => {
  return ((date.getMonth() > 8)
    ? (date.getMonth() + 1)
    : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9)
      ? date.getDate()
      : ('0' + date.getDate())) + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes()
}

// FlyerForm

// 09/15
// --> 09/15/2020
// 01/15 (past)
// --> 01/15/2021
const dateWithYear = (mmddFormat) => {
  let currYear = new Date().getFullYear()
  let testDateCurrYear = new Date(mmddFormat + '/' + currYear)
  let currDate = new Date()
  let testIfNeg = testDateCurrYear - currDate
  let year = testIfNeg > 0 ? currYear : currYear + 1
  return new Date(mmddFormat + '/' + year)
}

// "2020-03-01T07:00:00.000Z"
//--> Mar/01
const dateToMMDDString = (date) => {
  return ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate()))
}


//ThroughDates

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
];

// https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
// ["2020-03-05T07:00:00.000Z", "2020-03-01T07:00:00.000Z"]
// --> Mar/01
const returnFirstDate = (eventDates) => {
  let e = eventDates.sort((a, b) => {
    return new Date(a) < new Date(b) ? -1 : new Date(a) > new Date(b) ? 1 : 0;
  })[0]
  e = new Date(e)
  e = new Date(e.getTime() + Math.abs(e.getTimezoneOffset() * 60000))
  return monthNames[e.getMonth()] + '/' + ("0" + (e.getDate())).slice(-2)
}

// ["2020-03-05T07:00:00.000Z", "2020-03-01T07:00:00.000Z"]
// --> Mar/03
const returnLastDate = (eventDates) => {
  let e = eventDates.sort((a, b) => {
    return new Date(a) > new Date(b) ? a : b
  }).slice(-1).pop()
  e = new Date(e)
  e = new Date(e.getTime() + Math.abs(e.getTimezoneOffset() * 60000))
  return monthNames[e.getMonth()] + '/' + ("0" + (e.getDate())).slice(-2)
}


module.exports = {
  dateToMMDDTimeString,
  dateWithYear,
  dateToMMDDString,
  returnFirstDate,
  returnLastDate
}
