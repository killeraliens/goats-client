const sanitizeHtml = require('sanitize-html');


function capitalize(text = '') {
  return text.replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });
};

const returnCleanContentEditable = (htmlText = '') => {
  return htmlText.replace(/(<[^>]*>)|(&nbsp;)/g, "")
}

function createMarkup(htmlText) {
  return { __html: `${htmlText}` };
}
// usage:
// function MyComponent() {
//   return <div dangerouslySetInnerHTML={createMarkup('<div>Stuff</div>')} />;
// }

const returnSanitizedHtml = (htmlText = '') => {
  const clean = sanitizeHtml(htmlText, {
    allowedTags: ['b', 'i', 'em', 'strong', 'a', 'div', 'br'],
    allowedAttributes: {
      'a': ['href', 'target']
    },
    allowedIframeHostnames: ['www.youtube.com'],
    transformTags: {
      'a': sanitizeHtml.simpleTransform('a', { target: '_blank' })
    }
  });
  return clean
}

module.exports = {
  capitalize,
  createMarkup,
  returnCleanContentEditable,
  returnSanitizedHtml
}
