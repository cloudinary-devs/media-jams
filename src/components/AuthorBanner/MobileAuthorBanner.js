import {
  IconButton,
  Flex,
  Avatar,
  Heading,
  Text,
  Box,
  useToken,
  useBreakpointValue,
} from '@chakra-ui/react';
import BlockContent from '@sanity/block-content-to-react';
import { SocialHandlesCollection } from './SocialHandlesCollection';
import imageFetch from '@utils/image-fetch';

export default function MobileAuthorBanner({ author }) {
  const jobTitleVariant = useBreakpointValue({ base: 'B100', lg: 'B300' });
  return (
    <Flex
      w={{ base: '90%', lg: '1000px' }}
      mt="24px"
      border={`2px solid ${useToken('colors', 'primary.400')}`}
      borderRadius="8px"
      h={{ base: 'auto', lg: '300px' }}
      boxShadow={`4px 3px 0px 3px ${useToken('colors', 'primary.400')}`}
      p={{ base: 0, lg: 14 }}
    >
      <Flex w="100%">
        <Flex
          sx={{ gap: '8px' }}
          justify="space-between"
          align={{ base: 'center' }}
          direction="column"
          textAlign={{ base: 'center', lg: 'initial' }}
        >
          <Flex p="12px">
            <Avatar
              width="96px"
              height={{ base: '96px', lg: '132px' }}
              name={author.name}
              src={imageFetch(author.image?.asset.url)}
              border="1px solid #88B1FC"
              showBorder
              mt={{ base: '8px' }}
            />
            <Flex
              w="100%"
              justify={{ base: 'center', lg: 'space-between' }}
              direction={{ base: 'column', lg: 'row' }}
              textAlign="left"
              ml="16px"
            >
              <Heading
                size={{ base: 'H200', lg: 'H300' }}
                color="grey.900"
                fontWeight="bold"
              >
                {author.name}
              </Heading>
              <Text mt="4px" color="grey.700" variant={jobTitleVariant}>
                {author.jobTitle}
              </Text>
              <Flex mt="12px" justify="flex-start" ml="-12px">
                <SocialHandlesCollection
                  socialHandles={author?.socialHandles}
                />
              </Flex>
            </Flex>
          </Flex>
          <Box
            w="100%"
            textAlign="left"
            fontSize="16px"
            lineHeight="148%"
            color="grey.800"
            p="18px 16px 24px 16px"
          >
            <BlockContent blocks={author?.bioRaw} />
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}
