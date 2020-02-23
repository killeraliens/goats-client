function capitalize(text) {
  return text.replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });
};

// const returnCleanContentEditable = (fieldStr) => {
//   return formBody[fieldStr].value.replace(/(<[^>]*>)|(&nbsp;)/g, "")
// }

function createMarkup(htmlText) {
  return { __html: `${htmlText}` };
}
// usage:
// function MyComponent() {
//   return <div dangerouslySetInnerHTML={createMarkup('<div>Stuff</div>')} />;
// }


module.exports = {
  capitalize,
  createMarkup
  //returnCleanContentEditable
}
