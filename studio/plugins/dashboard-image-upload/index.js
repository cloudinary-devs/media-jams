/* eslint-disable complexity */
import React from 'react';
import { useDropzone } from 'react-dropzone';
import r2 from 'r2';
import jsonResponse from 'get-it/lib/middleware/jsonResponse';
import promise from 'get-it/lib/middleware/promise';
// import Button from 'part:@sanity/components/buttons/default';
import { IntentLink } from 'part:@sanity/base/router';
import Spinner from 'part:@sanity/components/loading/spinner';
import schema from 'part:@sanity/base/schema';
import IntentButton from 'part:@sanity/components/buttons/intent';
import { List, Item } from 'part:@sanity/components/lists/default';
import { getPublishedId } from 'part:@sanity/base/util/draft-utils';
import { MdPublish, MdClear } from 'react-icons/md';
import {
  Container,
  Card,
  Heading,
  Stack,
  Box,
  Flex,
  Text,
  Inline,
  Button,
} from '@sanity/ui';
import { intersection } from 'lodash';

import styles from './DashboardImageUpload.css';
import useUpload from './hooks/useUpload';
import { useCurrentUser } from './hooks/getCurrentUser';

// TODO: generate status object with icon, name, message
const MediaPortal = () => {
  const [fileToUpload, setFileToUpload] = React.useState(null);
  const [cloudiaryFile, setCloudinaryFile] = React.useState(null);
  const [uploadStatus, setStatus] = React.useState('idle');
  const { id } = useCurrentUser();

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  function onDrop(acceptedFiles) {
    setFileToUpload({
      file: acceptedFiles[0],
      preview: URL.createObjectURL(acceptedFiles[0]),
    });
  }

  async function handleOnClick() {
    setStatus('uploading');
    var formdata = new FormData();
    formdata.append('image', fileToUpload.file);
    formdata.append('folder', id);
    var requestOptions = {
      method: 'POST',
      body: formdata,
    };

    fetch('http://localhost:3000/api/media-portal', requestOptions)
      .then((resp) => resp.json())
      .then((result) => {
        setStatus('idle');
        setCloudinaryFile(result);
      })
      .catch((error) => setStatus(`Error: ${error}`));
  }
  return (
    <Container width={6}>
      <Card margin={3} padding={4}>
        <Stack space={3}>
          <Heading as="h2" size={5}>
            Media
          </Heading>

          <div
            className={styles.dropzone}
            h="200px"
            width="80%"
            alignSelf="center"
            alignItems="center"
            justifyContent="center"
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <p>Choose file to upload...</p>
          </div>
          {uploadStatus.startsWith('Error') && <span>{uploadStatus}</span>}
          {fileToUpload && (
            <Flex direction="column" marginTop={16}>
              <div className={styles.thumbImage}>
                <img className={styles.img} src={fileToUpload.preview} />
              </div>
              {cloudiaryFile && <Text>{cloudiaryFile.secure_url}</Text>}
            </Flex>
          )}
          <Inline space={[3, 3, 4]} style={{ textAlign: 'center' }}>
            <Button
              fontSize={[2, 2, 3]}
              icon={MdClear}
              mode="ghost"
              padding={[3, 3, 4]}
              text="Clear"
              onClick={() => {
                setFileToUpload(null);
                setCloudinaryFile(null);
                setStatus('idle');
              }}
            />
            <Button
              fontSize={[2, 2, 3]}
              icon={uploadStatus == 'uploading' ? Spinner : MdPublish}
              padding={[3, 3, 4]}
              text={uploadStatus == 'uploading' ? 'Processing...' : 'Upload'}
              tone="primary"
              disabled={!fileToUpload}
              onClick={handleOnClick}
            />
          </Inline>
        </Stack>
      </Card>
    </Container>
  );
};

export default {
  name: 'dashboard-image-upload',
  component: MediaPortal,
};
