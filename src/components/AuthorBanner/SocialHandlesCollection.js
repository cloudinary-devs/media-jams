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
export function SocialHandlesCollection({
  socialHandles,
  color = 'black',
  website = true,
}) {
  return (
    <>
      {socialHandles &&
        Object.keys(socialHandles).map((key) => {
          if (key === 'twitter') {
            return (
              <UnstyledIconButton
                key={key}
                as="a"
                color={color}
                href={socialHandles[key]}
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
                color={color}
                href={socialHandles[key]}
                size="md"
                height="0"
                icon={<FaGithub />}
              />
            );
          } else if (key === 'website' && website) {
            return (
              <UnstyledIconButton
                key={key}
                as="a"
                color={color}
                h="0"
                href={socialHandles[key]}
                size="md"
                icon={<FaGlobe />}
              />
            );
          }
        })}
    </>
  );
}
