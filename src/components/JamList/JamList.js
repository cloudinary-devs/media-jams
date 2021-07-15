import React from 'react';
import { useBreakpointValue } from '@chakra-ui/react';
import JamCard, { MobileJamCard } from './JamCard';

export default function JamList({ jams }) {
  const ResponsiveJamCardComponent = useBreakpointValue({
    base: MobileJamCard,
    lg: JamCard,
  });
  return jams.map((jam) => <ResponsiveJamCardComponent jam={jam} />);
}
