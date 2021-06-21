import React from 'react';
import { Flex } from '@chakra-ui/react';
import JamCard from './JamCard';
import FeaturedJamCard from './FeaturedJamCard';

export default function JamList({ jams }) {
  const [featuredJam, setFeaturedJam] = React.useState();

  React.useEffect(() => {
    const takeFirstJam = jams.shift();
    setFeaturedJam(takeFirstJam);
  }, [jams]);
  return (
    <Flex
      w="1000px"
      mt="26px"
      alignSelf="center"
      h="100%"
      direction="column"
      justify="space-around"
      sx={{ gap: '16px' }}
    >
      {featuredJam && <FeaturedJamCard jam={featuredJam} />}
      {jams.map((jam) => (
        <JamCard jam={jam} />
      ))}
    </Flex>
  );
}
