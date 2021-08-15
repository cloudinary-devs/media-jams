import React from 'react';
import { IconButton } from '@chakra-ui/react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const SocialGroup = () => (
  <>
    <IconButton
      as="a"
      href="www.google.com"
      aria-label="LinkedIn Profile"
      icon={<FaLinkedin />}
    />
    <IconButton
      as="a"
      href="www.google.com"
      aria-label="Github Profile"
      icon={<FaGithub />}
    />
    <IconButton
      as="a"
      href="www.google.com"
      aria-label="Twitter Profile"
      icon={<FaTwitter />}
    />
  </>
);

export default SocialGroup;
