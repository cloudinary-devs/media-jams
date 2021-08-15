import React from 'react';
import { Box, SkeletonCircle, SkeletonText } from '@chakra-ui/react';

export const LoadingSkeleton = ({ isLoading = false, children }) =>
  isLoading ? (
    <Box borderRadius="8px" maxWidth="2xl">
      <SkeletonCircle isLoaded={!isLoading} size="10" />
      <SkeletonText isLoaded={!isLoading} mt="4" noOfLines={4} spacing="4" />
    </Box>
  ) : (
    <>{children}</>
  );
