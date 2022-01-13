import {
  Box,
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

const JamCardCollage = ({ jams, columns = 1, cardSize = 'small' }) => {
  const jamTop = jams[0];
  const jamBack = jams[1];
  const jamMiddle = jams[2];
  return (
    <Box
      position="relative"
      width="100%"
      height="0"
      pt={`${(330 / 540) * 100}%`}
      _after={{
        display: 'block',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 0,
        content: '""',
        width: '75%',
        height: '75%',
        backgroundColor: 'rgba(27, 20, 100, 0.5)',
        margin: 'auto',
        borderRadius: '100%',
        filter: 'blur(40px)',
        transform: 'translate3d(0, -5%, 0)',
      }}
    >
      <List
        position="absolute"
        top="0"
        left="0"
        zIndex="1"
        width="100%"
        height="100%"
        transform="scale(.57) translate3d(-5%, 7%, 0);"
      >
        {jamTop && (
          <ListItem
            position="absolute"
            top="0"
            right="0"
            bottom="0"
            left="0"
            zIndex="3"
            m="auto"
            transform="translate3d(35%, 0, 0)"
            boxShadow="0 2px 5px rgba(37, 41, 46, .3)"
          >
            <JamCard jam={jamTop} size={cardSize} />
          </ListItem>
        )}
        {jamBack && (
          <ListItem
            position="absolute"
            top="0"
            right="0"
            bottom="0"
            left="0"
            zIndex="1"
            m="auto"
            transform="translate3d(0, -45%, 0)"
            boxShadow="0 2px 5px rgba(37, 41, 46, .3)"
          >
            <JamCard jam={jamBack} size={cardSize} />
          </ListItem>
        )}
        {jamMiddle && (
          <ListItem
            position="absolute"
            top="0"
            right="0"
            bottom="0"
            left="0"
            zIndex="2"
            m="auto"
            transform="translate3d(-22%, 30%, 0)"
            boxShadow="0 2px 5px rgba(37, 41, 46, .3)"
          >
            <JamCard jam={jamMiddle} size={cardSize} />
          </ListItem>
        )}
      </List>
    </Box>
  );
};

export default JamCardCollage;
