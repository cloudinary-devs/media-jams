/* eslint-disable react/no-multi-comp, react/no-did-mount-set-state */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './iframePreview.css';

import resolveProductionPreviewUrl from '../config/resolveProductionUrl';

class IframePreview extends React.PureComponent {
  static propTypes = {
    document: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  };

  static defaultProps = {
    document: null,
  };

  render() {
    const { displayed } = this.props.document;
    const { slug, body } = displayed;
    if (!slug && !body) {
      return (
        <div className={styles.componentWrapper}>
          <p>A Post needs a title and some content to show first!</p>
        </div>
      );
    }

    const url = resolveProductionPreviewUrl(displayed);

    if (!url) {
      return (
        <div className={styles.componentWrapper}>
          <p>Hmm. Having problems constructing the web front-end URL.</p>
        </div>
      );
    }

    return (
      <div className={styles.componentWrapper}>
        <div className={styles.iframeContainer}>
          <iframe src={url} frameBorder={'0'} />
        </div>
      </div>
    );
  }
}

export default IframePreview;
