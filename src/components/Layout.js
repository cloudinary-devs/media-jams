import { Box } from '@chakra-ui/core';
import Navbar from '@components/Navbar';
import SEO from '@components/SEO';

export default function Layout({ props, children }) {
  return (
    <>
      <SEO {...props} />
      <Navbar />
      <Box>{children}</Box>
    </>
  );
}
