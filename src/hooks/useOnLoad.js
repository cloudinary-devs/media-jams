import { useState, useEffect } from 'react';

// Via https://stackoverflow.com/questions/55744746/how-to-ensure-that-page-has-finished-loading-on-a-react-site

export default function useOnLoad(onLoad) {
  const [loaded, setLoaded] = useState(false);

  function onReadyStateChange() {
    if (readyStateComplete()) {
      setLoaded(true);
    }
  }

  useEffect(() => {
    if (readyStateComplete()) return;

    if (typeof document.onreadystatechange === 'function') {
      const previousFunctions = document.onreadystatechange;
      document.onreadystatechange = function () {
        onReadyStateChange();
        previousFunctions();
      };
    } else {
      document.onreadystatechange = onReadyStateChange;
    }
  }, []);

  useEffect(() => {
    if (loaded & (typeof onLoad !== 'function') || readyStateComplete()) {
      onLoad();
    }
  }, [loaded]);

  return {
    loaded,
  };
}

function readyStateComplete() {
  return document.readyState === 'complete';
}
