import { useClipboard } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';

export default function CopyButton({ value }) {
  const { onCopy, hasCopied } = useClipboard(value);
  return (
    <Button
      justifySelf="flex-end"
      aria-label="Copy text"
      role="button"
      onClick={onCopy}
    >
      {hasCopied ? 'Copied' : 'Copy'}
    </Button>
  );
}
