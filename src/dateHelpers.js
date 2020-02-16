// Comment
// 02/15/2020 17:54
const dateToMMDDTimeString = (date) => {
  return ((date.getMonth() > 8)
    ? (date.getMonth() + 1)
    : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9)
      ? date.getDate()
      : ('0' + date.getDate())) + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes()
}

module.exports = {
  dateToMMDDTimeString
}
