import React from 'react';
import { Flex } from '@chakra-ui/react';
import JamCard from './JamCard';

export default function JamList({ jams }) {
  return jams.map((jam) => <JamCard jam={jam} />);
}
