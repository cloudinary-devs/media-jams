export function inferMetadataState(props) {
  if (!props.draft && !props.published) return { state: 'draft', init: true };
  if (props.draft) return { state: 'draft', init: true };
  return { state: 'draft', init: true };
}
