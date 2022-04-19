import React from 'react';
import { IconButton } from '@chakra-ui/react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const SocialGroup = ({ linkedin, github, twitter }) => (
  <>
    {linkedin && (
      <IconButton
        as="a"
        href={linkedin}
        aria-label="LinkedIn Profile"
        icon={<FaLinkedin />}
      />
    )}
    {github && (
      <IconButton
        as="a"
        href={github}
        aria-label="Github Profile"
        icon={<FaGithub />}
      />
    )}
    {twitter && (
        <IconButton
        as="a"
        href={twitter}
        aria-label="Twitter Profile"
        icon={<FaTwitter />}
      />
    )}
  </>
);

export default SocialGroup;

