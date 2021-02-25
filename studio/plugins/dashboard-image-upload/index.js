/* eslint-disable complexity */
import React from 'react';
import { useDropzone } from 'react-dropzone';
import jsonResponse from 'get-it/lib/middleware/jsonResponse';
import promise from 'get-it/lib/middleware/promise';
import Button from 'part:@sanity/components/buttons/default';
import { IntentLink } from 'part:@sanity/base/router';
import Spinner from 'part:@sanity/components/loading/spinner';
import schema from 'part:@sanity/base/schema';
import IntentButton from 'part:@sanity/components/buttons/intent';
import { List, Item } from 'part:@sanity/components/lists/default';
import { getPublishedId } from 'part:@sanity/base/util/draft-utils';
import {
  Container,
  Card,
  Grid,
  Heading,
  Stack,
  Box,
  Flex,
  Text,
  TextInput,
  Label,
  Switch,
} from '@sanity/ui';
import { intersection } from 'lodash';

import styles from './DashboardImageUpload.css';
import useUpload from './hooks/useUpload';

const MediaPortal = () => {
  const [fileToUpload, setFileToUpload] = React.useState({});

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  function onDrop(acceptedFiles) {
    setFileToUpload(acceptedFiles[0]);
  }

  function onSubmit(file, options) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      // Add your method of upload here
    });

    reader.readAsDataURL(file);
  }
  return (
    <Container width={6}>
      <Card margin={3} padding={4}>
        <Stack space={3}>
          <Heading as="h2" size={5}>
            Media Portal
          </Heading>
          <Stack w="80%" spacing={2}>
            <TextInput w="92%" size="sm" fontSize="sm" placeholder="Title" />
          </Stack>
          <Flex
            rounded="md"
            border="2px solid black"
            cursor="pointer"
            h="200px"
            width="80%"
            alignSelf="center"
            alignItems="center"
            justifyContent="center"
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <p>Choose file to upload...</p>
          </Flex>
          <Button size="lg" variant="outline" mt={4}>
            Upload Photo
          </Button>
        </Stack>
      </Card>
    </Container>
  );
};

export default {
  name: 'dashboard-image-upload',
  component: MediaPortal,
};
