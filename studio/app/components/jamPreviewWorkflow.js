import React from 'react';
import { useWorkflowMetadata } from '../lib/workflow/metadata';
import { inferMetadataState } from '../lib/workflow/helpers';
import { states } from '../config/workflow';

function JamPreviewWorkflow({ value }) {
  if (!value) return null;
  const docIds = value._id.split('.');
  const document_id = docIds[0] === 'drafts' ? docIds[1] : docIds[0];
  const metadata = useWorkflowMetadata(document_id, inferMetadataState(value));
  const state = states.find((s) => s.id === metadata.data.state);
  console.log('metadata >>', metadata);
  console.log('state>>>>>', state);
  return (
    <>
      <h3>{value.title}</h3>
      <span>{state.title}</span>
    </>
  );
}

export default JamPreviewWorkflow;
