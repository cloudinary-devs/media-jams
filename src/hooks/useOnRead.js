import React from 'react';
import readingTime from 'reading-time';

/**
 * Adapted from https://gist.github.com/kentcdodds/c0b14f53f33c9ffb833d1bd8ba61b3eb
 * onRead is triggered when both items are true
 * the main html elment has been scrolled all the way, AND
 * the time to read as calculated by 'reading-time' has passed.
 * @param {*} param0
 */
export function useOnRead({ parentElRef, onRead, enabled = true }) {
  React.useEffect(() => {
    const parentEl = parentElRef.current;
    if (!enabled || !parentEl || !parentEl.textContent) return;

    // calculateReadingTime comes from https://npm.im/reading-time
    const readStats = readingTime(parentEl.textContent);
    // by creating a new div, it goes at bottom of document.
    const visibilityEl = document.createElement('div');

    let scrolledTheMain = false;
    const observer = new IntersectionObserver((entries) => {
      const isVisible = entries.some((entry) => {
        console.log('entry', entry.target, entry.isIntersecting);
        return entry.target === visibilityEl && entry.isIntersecting;
      });
      if (isVisible) {
        scrolledTheMain = true;
        maybeMarkAsRead();
        observer.disconnect();
        visibilityEl.remove();
      }
    });

    let startTime = new Date().getTime();
    let timeoutTime = readStats.time * 0.6;
    let timerId;
    let timerFinished = false;
    function startTimer() {
      timerId = setTimeout(() => {
        timerFinished = true;
        document.removeEventListener(
          'visibilitychange',
          handleVisibilityChange,
        );
        maybeMarkAsRead();
      }, timeoutTime);
    }

    function handleVisibilityChange() {
      if (document.hidden) {
        clearTimeout(timerId);
        const timeElapsedSoFar = new Date().getTime() - startTime;
        timeoutTime = timeoutTime - timeElapsedSoFar;
      } else {
        startTime = new Date().getTime();
        startTimer();
      }
    }

    function maybeMarkAsRead() {
      if (timerFinished && scrolledTheMain) {
        cleanup();
        onRead();
      }
    }

    // dirty-up
    parentEl.append(visibilityEl);
    observer.observe(visibilityEl);
    startTimer();
    document.addEventListener('visibilitychange', handleVisibilityChange);

    function cleanup() {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearTimeout(timerId);
      observer.disconnect();
      visibilityEl.remove();
    }
    return cleanup;
  }, [enabled, onRead, parentElRef]);
}
