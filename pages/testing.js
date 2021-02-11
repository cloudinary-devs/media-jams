import { Grid, Box, useDisclosure } from '@chakra-ui/react';

import Layout from '@components/Layout';

export default function Testing() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Layout isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <Grid
        height="100vh"
        templateAreas={`
          "one four two"
          "one four five"
          "one three five"
        `}
        gap={8}
        p={8}
      >
        <Box borderRadius="8px" gridArea="one" bg="blue.200"></Box>

        <Box
          borderRadius="8px"
          boxShadow="1px 2px 20px 6px rgba(0,0,0,0.25)"
          bg="yellow"
          gridArea="two"
        ></Box>

        <Box
          borderRadius="8px"
          boxShadow="1px 2px 20px 6px rgba(0,0,0,0.25)"
          bg="green.200"
          gridArea="three"
        ></Box>

        <Box
          borderRadius="8px"
          boxShadow="1px 2px 20px 6px rgba(0,0,0,0.25)"
          bg="red.200"
          gridArea="four"
        ></Box>
        <Box
          borderRadius="8px"
          boxShadow="1px 2px 20px 6px rgba(0,0,0,0.25)"
          bg="gray.200"
          gridArea="five"
        ></Box>
      </Grid>
    </Layout>
  );
}
