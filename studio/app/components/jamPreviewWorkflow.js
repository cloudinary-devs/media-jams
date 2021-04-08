import React from 'react';
import { useWorkflowMetadata } from '../lib/workflow/metadata';
import { inferMetadataState } from '../lib/workflow/helpers';
import { states } from '../config/workflow';

import { Stack, Inline, Badge, Heading } from '@sanity/ui';

function JamPreviewWorkflow({ value }) {
  if (!value) return null;
  // inorder to fetch the meta data we need to base doc id without prefix 'draft'
  const doc_id = value._id.startsWith('drafts.')
    ? value._id.split('.')[1]
    : value._id;
  const metadata = useWorkflowMetadata(doc_id, inferMetadataState(value));
  const state = states.find((s) => s.id === metadata.data.state);
  return (
    <>
      <Stack space={3} style={{ textAlign: 'left' }}>
        <Heading as="h2" size={2}>
          {value.title}
        </Heading>
        <Inline space={2}>
          <Badge mode="outline" tone={state.badgeColor}>
            {state.title}
          </Badge>
        </Inline>
      </Stack>
    </>
  );
}

export default JamPreviewWorkflow;
