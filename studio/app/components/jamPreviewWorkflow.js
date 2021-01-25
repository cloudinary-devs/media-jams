import React from 'react';

function JamPreviewWorkflow({ value }) {
  if (!value) return null;
  return (
    <>
      <h1>{value.title}</h1>
      <span>{value.author}</span>
    </>
  );
}

export default JamPreviewWorkflow;
