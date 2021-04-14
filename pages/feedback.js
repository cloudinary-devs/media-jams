import React from 'react';
import { useMixPanel } from '@lib/mixpanel';
import Iframe from '@components/Iframe';

export default function Feedback() {
  const mixpanel = useMixPanel();
  mixpanel.pageView();
  return (
    <>
      <Iframe
        class="airtable-embed"
        src="https://airtable.com/embed/shrT2aebulK2xeUJ2?backgroundColor=orange"
        frameborder="0"
        onmousewheel=""
        style={{
          width: '100%',
          height: 'calc(100vh - 5em)',
          background: 'transparent',
          border: '1px solid #ccc',
        }}
      ></Iframe>
    </>
  );
}
