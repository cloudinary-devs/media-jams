import { Flex, Icon, Avatar, Heading, Text, Tooltip } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { IoMdHand } from 'react-icons/io';
import { FaTwitter, FaGithub } from 'react-icons/fa';
import { boxShadow } from '@utils/styles';

export default function AuthorCard({ author, ...rest }) {
  const wave = keyframes`
    0% { transform: rotate( 0.0deg) }
    10% { transform: rotate(14.0deg) }
    20% { transform: rotate(-8.0deg) }
    30% { transform: rotate(14.0deg) }
    40% { transform: rotate(-4.0deg) }
    50% { transform: rotate(10.0deg) }
    60% { transform: rotate( 0.0deg) }
    100% { transform: rotate( 0.0deg) }
  `;
  return (
    <Flex
      p={8}
      borderRadius="8px "
      align="center"
      justify="space-evenly"
      boxShadow={boxShadow}
      direction="column"
      textAlign="center"
      {...rest}
    >
      <Avatar size="xl" src={author.image?.asset.url} />
      <Heading fontSize="xl">{author.name}</Heading>
      <Text fontSize="xs">{author.jobTitle}</Text>
      <Flex mt={3}>
        <Icon as={FaTwitter} mr={3} />
        <Icon as={FaGithub} />
      </Flex>
      <Tooltip
        label="Some bio about the author. This could honestly be something that the author writes specifically for the learners."
        hasArrow
        placement="bottom"
      >
        <span>
          <Icon
            sx={{
              ':hover': {
                animationName: `${wave}`,
                animationDuration: '3s',
                animationIterationCount: 'infinite',
                transformOrigin: '70% 70%',
                display: 'inline-block',
              },
            }}
            as={IoMdHand}
            color="yellow.400"
            boxSize="2em"
            mt={3}
          />
        </span>
      </Tooltip>
    </Flex>
  );
}
