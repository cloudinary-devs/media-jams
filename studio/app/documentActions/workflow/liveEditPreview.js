import React from 'react';
import { inferMetadataState, useWorkflowMetadata } from '../../lib/workflow';
import { SiLivejournal } from 'react-icons/si';
import { useDocumentOperation } from '@sanity/react-hooks';
import { resolveLiveEditUrl } from '../../config/resolveProductionUrl';
import Hotkeys from 'part:@sanity/components/typography/hotkeys';

export const liveEditPreviewAction = (props) => {
  const ops = useDocumentOperation(props.id, props.type);
  const metadata = useWorkflowMetadata(props.id, inferMetadataState(props));
  if (props.type !== 'post') {
    return null;
  }
  let previewUrl;
  try {
    previewUrl = resolveLiveEditUrl(props.draft);
  } catch (error) {
    error.message = `An error was thrown while trying to get production preview url: ${error.message}`;
    // eslint-disable-next-line no-console
    console.error(error);
    return null;
  }

  if (!previewUrl) {
    return null;
  }
  const onHandle = () => {
    window.open(previewUrl, '_blank');
    props.onComplete();
  };

  return {
    icon: SiLivejournal,
    shortcut: 'mod+shift+e',
    label: 'Live Edit',
    onHandle,
  };
};
