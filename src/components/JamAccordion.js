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

export default function JamAccordion({ color, post, width, defaultIndex }) {
  const { author } = post;

  return (
    <Accordion
      w={width}
      borderRadius="lg"
      boxShadow={boxShadow}
      mb={3}
      borderColor="none"
      bg="white"
      allowToggle
      defaultIndex={defaultIndex ? defaultIndex : null}
    >
      <AccordionItem p={3} borderRadius="lg">
        <Flex justifyContent="space-between">
          <Flex flex="1" textAlign="left">
            <Avatar
              boxShadow={boxShadow}
              size="lg"
              name={author.name}
              mr={4}
              src={author.image}
            />
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
                    color={`${color}.400`}
                    fontSize={{ base: '9px', md: '14px' }}
                  >
                    # {tag}
                  </Text>
                ))}
              </Flex>
            </Flex>
          </Flex>
          <Flex justifyContent="space-around" width={36} alignItems="center">
            <Button
              colorScheme={color}
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
              as={Button}
              h="50%"
              alignSelf="center"
              borderRadius="lg"
              variant={color}
              w="30px"
              justifyContent="center"
            >
              <AccordionIcon />
            </AccordionButton>
          </Flex>
        </Flex>
        <AccordionPanel pt={4}>
          <Flex direction="column">
            <Text>{post.description}</Text>
          </Flex>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
