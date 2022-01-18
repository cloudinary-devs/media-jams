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

const JamCardList = ({ jams, columns = 1, cardSize = 'small' }) => {
  return (
    <Grid
      as={List}
      width="100%"
      templateColumns={`repeat(${columns}, 1fr)`}
      gridGap="6"
    >
      {jams.map((jam) => {
        return (
          <ListItem key={jam._id} boxShadow="0 2px 8px rgba(37, 41, 46, .4)">
            <JamCard jam={jam} size={cardSize} />
          </ListItem>
        );
      })}
    </Grid>
  );
};

export default JamCardList;
