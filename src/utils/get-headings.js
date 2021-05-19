import * as React from 'react';

function isHeading(child) {
  if (child.props?.mdxType) {
    return new Set(['h2', 'h3']).has(child.props.mdxType);
  }
  return false;
}

export function getHeadings(children) {
  return React.Children.toArray(children)
    .filter((child) => React.isValidElement(child) && isHeading(child))
    .map((heading) => {
      if (React.isValidElement(heading)) {
        return {
          level: heading.props?.mdxType,
          id: heading.props?.id,
          text: heading.props?.children,
        };
      }
    });
}
