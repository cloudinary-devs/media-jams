import React from 'react';
import { useQuery } from 'react-query';
import { tags as queryTags } from '@lib/queries/tags';

import {
  Flex,
  Heading,
  CheckboxGroup,
  Checkbox,
  Button,
  Modal,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  useToken,
  useDisclosure,
  useBreakpointValue,
} from '@chakra-ui/react';

function TagButton({
  tag,
  addTag,
  removeTag,
  selectedFilters,
  children,
  ...rest
}) {
  const isTagSelected = selectedFilters.some(
    (selected) => selected.title === tag.title,
  );
  return (
    <Button
      _hover={{
        background: useToken('colors', 'primary.200'),
        color: useToken('colors', 'primary.800'),
      }}
      padding={{ lg: '2px 6px' }}
      minW={{ base: '' }}
      bg={() => (!isTagSelected ? 'grey.200' : 'primary.200')}
      color={() => (!isTagSelected ? 'grey.800' : 'primary.800')}
      borderRadius="4px"
      onClick={() => (isTagSelected ? removeTag(tag) : addTag(tag))}
      height="auto"
      {...rest}
    >
      <Text variant="B300" fontWeight="500">
        {children}
      </Text>
    </Button>
  );
}

function ToggleTagListButton({ children, onClick, ...rest }) {
  return (
    <Button
      _hover={{
        border: 'none',
        background: 'none',
        textDecoration: 'underline',
      }}
      _active={{
        background: 'none',
        width: 'none',
      }}
      onClick={onClick}
      borderRadius="4px"
      border="none"
      bg="none"
      w="none"
      color="primary.700"
      p="0"
      _focus={{ outline: 'none' }}
      {...rest}
    >
      <Text variant="B300">{children}</Text>
    </Button>
  );
}

function TagModal({ isOpen, onClose, tags, clearAllTags }) {
  const primary500 = useToken('colors', 'primary.500');
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent h="90%" w="90%" overflow="scroll">
        <ModalHeader textAlign="center">
          <Heading mt="12px" letterSpacing="-0.01em" size="H300">
            Topics
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column" justify="space-evenly">
            <CheckboxGroup colorScheme="green">
              {tags.tags?.map((tag) => (
                <Flex
                  pt="18px"
                  justify="center"
                  borderBottom="1px solid #D3DDE5"
                  w="100%"
                  justify="space-between"
                  pb="18px"
                >
                  <Text variant="B300">{tag.title} </Text>
                  <Checkbox size="lg" colorScheme="primary" value={tag.title} />
                </Flex>
              ))}
            </CheckboxGroup>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Flex direction="column" w="100%">
            <Button
              pb="22px"
              w="100%"
              onClick={clearAllTags}
              alignSelf="flex-start"
              bg="none"
              _hover={{ background: 'none' }}
            >
              <Text color="primary.500" variant="B200" fontWeight="500">
                x Clear all tags
              </Text>
            </Button>
            <Button
              bg="primary.500"
              w="100%"
              onClick={clearAllTags}
              alignSelf="flex-start"
            >
              <Text color="white" variant="B200" fontWeight="500">
                Show Results
              </Text>
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

function Tags({ selectedFilters, addTag, removeTag, clearAllTags }) {
  const [showMore, setShowMore] = React.useState(false);
  const [featuredTags, setFeaturedTags] = React.useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const showAllEventVariant = useBreakpointValue({
    base: onOpen,
    lg: () => setShowMore(true),
  });
  const { data } = useQuery('jamTags', queryTags.get);

  let collectedFeaturedTags = [];
  React.useEffect(() => {
    if (data.tags) {
      data.tags.map((tag) => tag.featured && collectedFeaturedTags.push(tag));
      setFeaturedTags(collectedFeaturedTags);
    }
  }, [data]);

  return (
    <Flex
      w="100%"
      direction={{ base: 'column', lg: 'row' }}
      justify={{ lg: 'space-between' }}
    >
      <TagModal
        tags={data}
        isOpen={isOpen}
        onClose={onClose}
        clearAllTags={clearAllTags}
      />
      {showMore ? (
        <>
          <Flex
            w={{ base: '100%', lg: '60%' }}
            justify={{ base: '', lg: 'space-around' }}
            align="center"
            flexWrap={{ base: 'nowrap', lg: 'wrap' }}
            _after={{ content: "''", flex: 'auto' }}
            sx={{ gap: '8px' }}
            direction={{ base: 'column', lg: 'row' }}
          >
            <Text variant="B300" color={useToken('colors', 'grey.900')}>
              Topics:
            </Text>
            {data.tags.map((tag) => (
              <TagButton
                tag={tag}
                addTag={addTag}
                removeTag={removeTag}
                selectedFilters={selectedFilters}
              >
                {tag.title}
              </TagButton>
            ))}
          </Flex>
          <Flex
            w={{ base: '100%', lg: '40%' }}
            justify="space-between"
            mt={{ base: '18px', lg: 0 }}
          >
            <ToggleTagListButton onClick={() => setShowMore(false)}>
              Show Less
            </ToggleTagListButton>
            <Button
              onClick={clearAllTags}
              alignSelf="flex-start"
              bg="none"
              _hover={{ background: 'none' }}
            >
              <Text color="primary.500" variant="B200" fontWeight="500">
                x Clear all tags
              </Text>
            </Button>
          </Flex>
        </>
      ) : (
        <>
          <Flex
            w={{ base: '100%', lg: '60%' }}
            justify={{ base: '', lg: 'space-around' }}
            align="center"
            flexWrap={{ base: 'nowrap', lg: 'wrap' }}
            _after={{ content: "''", flex: 'auto' }}
            sx={{ gap: '8px' }}
            direction={{ lg: 'row' }}
            overflowX={{ base: 'scroll', lg: 'initial' }}
          >
            <Text variant="B300" color={useToken('colors', 'grey.900')}>
              Topics:
            </Text>
            {featuredTags.map((tag) => (
              <TagButton
                tag={tag}
                addTag={addTag}
                removeTag={removeTag}
                selectedFilters={selectedFilters}
              >
                {tag.title}
              </TagButton>
            ))}
          </Flex>
          <Flex
            w={{ base: '100%', lg: '40%' }}
            justify="space-between"
            mt={{ base: '18px', lg: 0 }}
          >
            <ToggleTagListButton onClick={showAllEventVariant}>
              Show All
            </ToggleTagListButton>
            <Button
              onClick={clearAllTags}
              alignSelf="flex-start"
              bg="none"
              _hover={{ background: 'none' }}
            >
              <Text color="primary.500" variant="B200" fontWeight="500">
                x Clear all tags
              </Text>
            </Button>
          </Flex>
        </>
      )}
    </Flex>
  );
}

export default function TagFilters({
  selectedFilters,
  setSelectedFilters,
  addTag,
  removeTag,
  clearAllTags,
}) {
  return (
    <Flex
      w="100%"
      mt="22px"
      align="center"
      justify="space-between"
      direction={{ base: 'column', lg: 'row' }}
    >
      <Flex w={{ base: '100%', lg: '100%' }}>
        <Tags
          addTag={addTag}
          removeTag={removeTag}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          clearAllTags={clearAllTags}
        />
      </Flex>
    </Flex>
  );
}
