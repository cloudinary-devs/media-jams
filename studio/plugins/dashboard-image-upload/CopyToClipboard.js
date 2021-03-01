import React from 'react';
import { Card, Text, TextArea, Button, useToast } from '@sanity/ui';
import styles from './DashboardImageUpload.css';

const CopyToClipBoard = ({ text }) => {
  const toast = useToast();
  const textAreaRef = React.useRef(null);
  const [data, setData] = React.useState(null);
  const [copySuccess, setCopySuccess] = React.useState('');
  React.useEffect(() => setData(text), [text]);

  const handleCopy = () => {
    if (textAreaRef.current && data) {
      textAreaRef.current.select();
      document.execCommand('copy');
      toast.push({
        status: 'info',
        title: 'Media URL Copied to clipboard.',
      });
    }
  };

  return !data ? null : (
    <Button
      as="button"
      onClick={handleCopy}
      style={{ whiteSpace: 'normal' }}
      padding={[3, 3, 4]}
    >
      <textarea
        className={styles.textArea}
        readOnly
        ref={textAreaRef}
        value={data}
      />
    </Button>
  );
};

export default CopyToClipBoard;
