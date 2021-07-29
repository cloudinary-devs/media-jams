import React from 'react';
import { useBreakpointValue, Box } from '@chakra-ui/react';
import JamCard from './JamCard';
import MobileJamCard from './MobileJamCard';
import FeaturedJamList from './FeaturedJamList';

export default function JamList({ jams, featuredJams }) {
  const ResponsiveJamCardComponent = useBreakpointValue({
    base: MobileJamCard,
    lg: JamCard,
  });

  return jams.map((jam, index) => (
    <Box key={jam._id}>
      {index > 0 && index === 4 && featuredJams && (
        <FeaturedJamList jams={featuredJams} />
      )}
      {ResponsiveJamCardComponent !== undefined ? (
        <ResponsiveJamCardComponent jam={jam} />
      ) : (
        ''
      )}
    </Box>
  ));
}
