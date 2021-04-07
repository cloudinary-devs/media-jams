import { Badge } from '@chakra-ui/react';
import * as React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

export const links = [
  {
    title: 'About',
    links: [
      { label: 'Our Story', href: '#' },
      { label: 'Media Kit', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Email us', href: 'mailto:info@mediajams.dev?subject=Hi There' },
    ],
  },
  {
    title: 'Get Started',
    links: [
      { label: 'Log in', href: '/api/auth/login' },
      { label: 'Sign up', href: '/api/auth/signup' },
      { label: 'Discord Community', href: 'https://discord.gg/mediadevs' },
      { label: 'Creator Documentation', href: '/docs' },
    ],
  },
];

export const socialLinks = [
  { label: 'Facebook', icon: <FaFacebook />, href: '#' },
  { label: 'Instagram', icon: <FaInstagram />, href: '#' },
  { label: 'LinkedIn', icon: <FaLinkedin />, href: '#' },
  { label: 'LinkedIn', icon: <FaTwitter />, href: '#' },
];

export const footerLinks = [
  { label: 'Terms of Service', href: '#' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Offer terms', href: '#' },
  { label: 'Legal notice', href: '#' },
  { label: 'Sitemap', href: '#' },
];
