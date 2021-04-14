/* eslint-disable react/no-multi-comp, react/no-did-mount-set-state */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './liveEditPreview.css';
import Spinner from 'part:@sanity/components/loading/spinner';
import { resolveLiveEditUrl } from '../config/resolveProductionUrl';

const LiveEditPreview = ({ document }) => {
  const [isLoading, setLoading] = React.useState(true);

  const { displayed } = document;
  const { slug, body } = displayed;
  if (!slug && !body) {
    return (
      <div className={styles.componentWrapper}>
        <p>A Post needs a title and some content to show first!</p>
      </div>
    );
  }

  const url = resolveLiveEditUrl(displayed);

  if (!url) {
    return (
      <div className={styles.componentWrapper}>
        <p>Hmm. Having problems constructing the web front-end URL.</p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        height: '100%',
      }}
    >
      {isLoading ? (
        <Spinner
          inline={true}
          message={'Artisanal render in progress ...'}
          fullscreen={true}
          center={true}
        />
      ) : null}
      <div className={styles.componentWrapper}>
        <div className={styles.iframeContainer}>
          <iframe
            src={url}
            frameBorder={'0'}
            onLoad={() => setLoading(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default LiveEditPreview;
