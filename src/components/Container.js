import React from 'react';
import { theme, Flex } from '@chakra-ui/core';

const Container = ({ children, ...props }) => {
  const breakpoints = [...theme.breakpoints];
  const newArr = [];
  breakpoints.forEach((em) => {
    const re = /(em)/;
    const newEm = parseInt(em.replace(re, '') - 1.5) + 'em';

    newArr.push(newEm);
  });

  return (
    <Flex
      direction="column"
      flexGrow={1}
      pos="relative"
      m="0 auto"
      p={['3rem 1.25rem', '5rem 3rem']}
      w="auto"
      maxW={[...newArr]}
      minH="100%"
      {...props}
    >
      {children}
    </Flex>
  );
};

export default Container;
