import React from 'react';
import { Flex, Icon, Avatar, Heading, Text, Tooltip } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { IoMdHand } from 'react-icons/io';
import { FaTwitter, FaGithub } from 'react-icons/fa';
import { boxShadow } from '@utils/styles';

import Link from 'next/link';

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
      p={6}
      borderRadius="8px "
      align="center"
      justify="space-evenly"
      boxShadow={boxShadow}
      direction="column"
      textAlign="center"
      _last={{ marginRight: '8px' }}
      {...rest}
    >
      <Avatar
        h={{
          base: 20,
          md: 20,
          lg: 14,
        }}
        w={{
          base: 20,
          md: 20,
          lg: 14,
        }}
        src={author.image?.asset.url}
        borderColor="green.400"
        borderWidth="3px"
        showBorder
      />

      <Link href={`/author/${author.slug?.current || ''}`}>
        <Heading mt={3} fontSize="md" _hover={{ cursor: 'pointer' }}>
          {author.name}
        </Heading>
      </Link>

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
            color="yellow.300"
            boxSize="2em"
            mt={3}
          />
        </span>
      </Tooltip>
    </Flex>
  );
}
