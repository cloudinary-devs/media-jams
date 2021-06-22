import React from 'react';
import { Flex } from '@chakra-ui/react';
import JamCard from './JamCard';
import FeaturedJamCard from './FeaturedJamCard';

export default function JamList({ jams }) {
  const [featuredJam, setFeaturedJam] = React.useState();

  // Grab off the first featured Jam for the FeaturedCard
  /* 
    TODO: 
    - [] Remove the featured card from the list of Jams so it's not duplicated 
    - [] Remove the FeaturedCard during search 
  */
  React.useEffect(() => {
    const firstFeaturedJam = jams.find(
      (jam) => jam.postMetadata.featured === true,
    );
    setFeaturedJam(firstFeaturedJam);
  }, [jams]);

  return (
    <Flex
      w={{ base: '90%', lg: '1000px' }}
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
