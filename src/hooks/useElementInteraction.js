import React from 'react';

/**
 * window on blur is triggered when the iframe window becomes focused
 * using mouse over and out to know if that blur happens over the iframe or somewhere else.
 * @param elementRef ref to element to track
 * @param onInteraction function to invoke when interaction is triggered
 */
export function useElementInteration({ elementRef, onInteraction }) {
  const [elementMouseOver, setElementOver] = React.useState(false);
  const toogleElementMouseover = React.useCallback(() =>
    setElementOver(!elementMouseOver),
  );
  React.useEffect(() => {
    const element = elementRef.current;
    if (!element) return undefined;
    function captureEvent(e) {
      if (!elementMouseOver) return undefined;
      onInteraction();
    }
    window.addEventListener('blur', captureEvent);

    element.addEventListener('mouseover', toogleElementMouseover);
    element.addEventListener('mouseout', toogleElementMouseover);

    function cleanup() {
      element.removeEventListener('mouseover', toogleElementMouseover);
      element.removeEventListener('mouseout', toogleElementMouseover);
      window.removeEventListener('blur', captureEvent);
    }
    return cleanup;
  }, [elementRef, onInteraction]);
}
