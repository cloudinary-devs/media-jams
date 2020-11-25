import React from 'react';
import { Button, Text, Flex, Box } from '@chakra-ui/react';
import { FaHashtag } from 'react-icons/fa';

export default function RawkButton({ onClick = () => {}, children, ...props }) {
  return (
    <Button size="lg" onClick={onClick}>
      <svg
        vertical-align="middle"
        width="100%"
        height="100%"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M102.232 32.84l-.059-.01-.06.005-85.064 6.64L.707 6.961 20.387.5l123.836 2.65-15.825 33.925-26.166-4.236z"
          stroke="#555555"
        />
        <text
          x="72"
          y="20"
          fill="black"
          text-anchor="middle"
          dominant-baseline="middle"
        >
          {children}
        </text>
      </svg>
    </Button>
  );
}
