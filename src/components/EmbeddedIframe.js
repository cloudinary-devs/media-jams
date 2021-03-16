import Iframe from './Iframe';

const convertStylesStringToObject = (stringStyles) =>
  typeof stringStyles === 'string'
    ? stringStyles.split(';').reduce((acc, style) => {
        const colonPosition = style.indexOf(':');

        if (colonPosition === -1) {
          return acc;
        }

        const camelCaseProperty = style
            .substr(0, colonPosition)
            .trim()
            .replace(/^-ms-/, 'ms-')
            .replace(/-./g, (c) => c.substr(1).toUpperCase()),
          value = style.substr(colonPosition + 1).trim();

        return value ? { ...acc, [camelCaseProperty]: value } : acc;
      }, {})
    : {};

/**
 * Inline styles are no good for react, when capturing an iframe from a website like youtube or codesandbox,
 * they often have inline styles. This generates an object from the style string, which react is happy to render.
 * @param {Object} style inline style from embedded iframes often copied from site clipboards.
 * @returns Iframe component
 */
export default function EmbeddedIframe({ style, ...props }) {
  const styleAsObject = convertStylesStringToObject(style);
  return <Iframe style={styleAsObject} {...props} />;
}
