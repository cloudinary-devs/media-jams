import { approveAction } from './approve';
import { deleteAction } from './delete';
import { discardChangesAction } from './discardChanges';
import { publishAction } from './publish';
import { requestChangesAction } from './requestChanges';
import { requestReviewAction } from './requestReview';
import { syncAction } from './sync';
import { unpublishAction } from './unpublish';
import { prodPreviewAction } from './prodPreview';
import { liveEditPreviewAction } from './liveEditPreview';

export function resolveWorkflowActions(/* docInfo */) {
  return [
    syncAction,
    requestReviewAction,
    requestChangesAction,
    approveAction,
    prodPreviewAction,
    publishAction,
    unpublishAction,
    liveEditPreviewAction,
    discardChangesAction,
    deleteAction,
  ];
}
