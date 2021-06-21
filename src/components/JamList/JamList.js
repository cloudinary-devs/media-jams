import { Flex } from '@chakra-ui/react';
import JamCard from './JamCard';

export default function JamList({ jams }) {
  return (
    <Flex
      mt="26px"
      w="1000px"
      alignSelf="center"
      h="100%"
      direction="column"
      justify="space-around"
      sx={{ gap: '16px' }}
    >
      {jams.map((jam) => (
        <JamCard jam={jam} />
      ))}
    </Flex>
  );
}
