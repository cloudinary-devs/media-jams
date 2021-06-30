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
import { FaTwitter, FaGithub, FaGlobe } from 'react-icons/fa';

function UnstyledIconButton(props) {
  return (
    <IconButton
      border="none"
      bg="none"
      outline="none"
      _hover={{
        bg: 'none',
        border: 'none',
      }}
      _focus={{
        outline: 'none',
      }}
      {...props}
    />
  );
}
function SocialHandlesCollection({ author }) {
  return (
    <Flex mt="8px" alignSelf={{ base: 'center', lg: 'normal' }}>
      {author?.socialHandles &&
        Object.keys(author?.socialHandles).map((key) => {
          if (key === 'twitter') {
            return (
              <UnstyledIconButton
                key={key}
                as="a"
                color="black"
                href={author.socialHandles[key]}
                size="md"
                h="0"
                icon={<FaTwitter />}
              />
            );
          } else if (key === 'github') {
            return (
              <UnstyledIconButton
                key={key}
                as="a"
                color="black"
                href={author.socialHandles[key]}
                size="md"
                height="0"
                icon={<FaGithub />}
              />
            );
          } else if (key === 'website') {
            return (
              <UnstyledIconButton
                key={key}
                as="a"
                color="black"
                h="0"
                href={author.socialHandles[key]}
                size="md"
                icon={<FaGlobe />}
              />
            );
          }
        })}
    </Flex>
  );
}

export default function AuthorBanner({ author }) {
  const jobTitleVariant = useBreakpointValue({ base: 'B100', lg: 'B300' });
  return (
    <Flex
      w={{ base: '90%', lg: '1000px' }}
      mt="24px"
      border={`2px solid ${useToken('colors', 'primary.400')}`}
      borderRadius="8px"
      h={{ base: '520px', lg: '300px' }}
      boxShadow={`4px 3px 0px 3px ${useToken('colors', 'primary.400')}`}
      p={{ base: 0, lg: 14 }}
    >
      <Flex w="100%">
        <Flex
          sx={{ gap: '8px' }}
          direction={{ base: 'column', lg: 'row' }}
          align={{ base: 'center' }}
          textAlign={{ base: 'center', lg: 'initial' }}
        >
          <Avatar
            width={{ base: '96px', lg: '132px' }}
            height={{ base: '96px', lg: '132px' }}
            name={author.name}
            src={author.image?.asset.url}
            border="1px solid #88B1FC"
            showBorder
            mt={{ base: '8px' }}
          />
          <Flex p="12px" ml={{ base: 0, lg: '20px' }} direction="column">
            <Flex
              w="100%"
              justify={{ base: '', lg: 'space-between' }}
              direction={{ base: 'column', lg: 'row' }}
              mb="8px"
            >
              <Flex direction="column">
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
              </Flex>
              <SocialHandlesCollection author={author} />
            </Flex>
            <Box
              w="100%"
              textAlign="left"
              fontSize="16px"
              lineHeight="148%"
              color="grey.800"
            >
              <BlockContent blocks={author?.bioRaw} />
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
