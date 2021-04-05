import React from 'react';
import BlockContent from '@sanity/block-content-to-react';

function TextSection({ heading, label, text }) {
  return (
    <div>
      <section>
        <div>{label}</div>
        <h2>{heading}</h2>
        {text && <BlockContent blocks={text} />}
      </section>
    </div>
  );
}

export default TextSection;
