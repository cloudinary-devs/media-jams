import { useClipboard } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';

export default function CopyButton({ value, ...props }) {
  const { onCopy, hasCopied } = useClipboard(value);
  return (
    <Button
      size="xs"
      aria-label="Copy text"
      role="button"
      onClick={onCopy}
      {...props}
    >
      {hasCopied ? 'Copied' : 'Copy'}
    </Button>
  );
}
