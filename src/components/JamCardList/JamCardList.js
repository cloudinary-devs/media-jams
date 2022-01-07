import {
  Box,
  Grid,
  Heading,
  Text,
  Avatar,
  Image,
  List,
  ListItem,
  Badge,
} from '@chakra-ui/react';

import JamCard from '@components/JamCard';

// cardSize: Sizes found in components/JamCard under sizes

const JamCardList = ({ jams, columns = 1, cardSize = 'half' }) => {
  console.log('columns', columns);
  console.log('cardSize', cardSize);

  return (
    <Grid
      as={List}
      width="100%"
      templateColumns={`repeat(${columns}, 1fr)`}
      gridGap="6"
    >
      {jams.map((jam) => {
        return (
          <ListItem>
            <JamCard jam={jam} size={cardSize} />
          </ListItem>
        );
      })}
    </Grid>
  );
};

export default JamCardList;
