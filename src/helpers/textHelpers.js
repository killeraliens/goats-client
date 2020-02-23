function capitalize(text) {
  return text.replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });
};

// const returnCleanContentEditable = (fieldStr) => {
//   return formBody[fieldStr].value.replace(/(<[^>]*>)|(&nbsp;)/g, "")
// }


module.exports = {
  capitalize,
  //returnCleanContentEditable
}
