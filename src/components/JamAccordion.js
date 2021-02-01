import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Button,
  Flex,
  Heading,
  Text,
  Avatar,
  AccordionIcon,
} from '@chakra-ui/react';

import { boxShadow } from '@utils/styles';

export default function JamAccordion({ post, width }) {
  const { author } = post;

  return (
    <Accordion
      w={width}
      borderRadius="md"
      boxShadow={boxShadow}
      mb={3}
      allowToggle
    >
      <AccordionItem p={3}>
        <Flex justifyContent="space-between">
          <Flex flex="1" textAlign="left">
            <Avatar size="lg" name={author.name} mr={2} src={author.image} />
            <Flex direction="column">
              <Heading
                fontSize={{ base: '.8rem', md: '1rem', lg: '1.125rem' }}
                textStyle="headline-card"
              >
                {post.title}
              </Heading>
              <Text fontSize={{ base: '12px', md: 'sm' }}>
                By {author.name}
              </Text>
              <Flex flexWrap="wrap">
                {post.tags.map((tag) => (
                  <Text
                    mr={2}
                    color="red.400"
                    fontSize={{ base: '9px', md: '14px' }}
                  >
                    # {tag}
                  </Text>
                ))}
              </Flex>
            </Flex>
          </Flex>
          <Flex justifyContent="space-around" width="20%" alignItems="center">
            <Button
              colorScheme="blue"
              size="sm"
              w={16}
              p="8px"
              mr={2}
              as="a"
              href={`/post/${post.slug}`}
            >
              More
            </Button>
            <AccordionButton
              h="50%"
              alignSelf="center"
              borderRadius="lg"
              w="30px"
              justifyContent="center"
            >
              <AccordionIcon />
            </AccordionButton>
          </Flex>
        </Flex>
        <AccordionPanel>
          <Flex direction="column">
            <Text>{post.description}</Text>
          </Flex>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
