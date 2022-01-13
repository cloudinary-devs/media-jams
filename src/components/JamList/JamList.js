import React from 'react';
import { useBreakpointValue, Box } from '@chakra-ui/react';
import JamCard from './JamCard';
import MobileJamCard from './MobileJamCard';

import FeaturedJamList from './FeaturedJamList';
/*
For inserting sections at specific sections inbetween list items

{
  index > 0 && index === 4
    && featuredJams
    && <FeaturedJamList jams={featuredJams} />
}
*/

export default function JamList({ jams = [] }) {
  console.log('JamList');
  const ResponsiveJamCardComponent = useBreakpointValue({
    base: MobileJamCard,
    lg: JamCard,
  });

  return jams.map((jam, index) => (
    <Box key={jam._id}>
      {ResponsiveJamCardComponent !== undefined ? (
        <ResponsiveJamCardComponent jam={jam} />
      ) : (
        ''
      )}
    </Box>
  ));
}
