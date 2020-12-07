import React from 'react';
import { inferMetadataState, useWorkflowMetadata } from '../../lib/workflow';
import PublicIcon from 'part:@sanity/base/public-icon';
import { useDocumentOperation } from '@sanity/react-hooks';
import { resolveProductionUrl } from '../../config/resolveProductionUrl';
import Hotkeys from 'part:@sanity/components/typography/hotkeys';

export const prodPreviewAction = (props) => {
  const ops = useDocumentOperation(props.id, props.type);
  const metadata = useWorkflowMetadata(props.id, inferMetadataState(props));
  console.log(props, metadata, ops);
  if (props.type !== 'post') {
    return null;
  }
  let previewUrl;
  try {
    previewUrl = resolveProductionUrl(props.draft);
  } catch (error) {
    error.message = `An error was thrown while trying to get production preview url: ${error.message}`;
    // eslint-disable-next-line no-console
    console.error(error);
    return null;
  }

  if (!previewUrl) {
    return null;
  }
  console.log(previewUrl);
  const onHandle = () => {
    window.open(previewUrl, '_blank');
    props.onComplete();
  };

  return {
    icon: PublicIcon,
    shortcut: 'mod+shift+o',
    label: 'Preview Draft',
    onHandle,
  };
};
