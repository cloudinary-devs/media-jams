/* eslint-disable complexity */
import React from 'react';
import { useDropzone } from 'react-dropzone';
import Spinner from 'part:@sanity/components/loading/spinner';
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
  ToastProvider,
} from '@sanity/ui';

import styles from './DashboardImageUpload.css';
import CopyToClipBoard from './CopyToClipboard';
import { useCurrentUser } from './hooks/getCurrentUser';

const baseAPIUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.VERCEL_ENV === 'production'
      ? `https://mediajams.dev`
      : `https://mediajams-git-studio-creator-input-mediajams.vercel.app`
    : `http://localhost:3000`;

// TODO: generate status object with icon, name, message
const MediaPortal = () => {
  const [fileToUpload, setFileToUpload] = React.useState(null);
  const [cloudinaruFile, setCloudinaryFile] = React.useState(null);
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

    fetch(`${baseAPIUrl}/api/media-portal`, {
      method: 'POST',
      body: formdata,
      headers: { 'Content-Key': 'application/json' },
    })
      .then((resp) => resp.json())
      .then((result) => {
        setStatus('idle');
        setCloudinaryFile(result);
      })
      .catch((error) => setStatus(`Error: ${error}`));
  }
  return (
    <ToastProvider>
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
                {cloudinaruFile && (
                  <CopyToClipBoard text={cloudinaruFile.secure_url} />
                )}
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
    </ToastProvider>
  );
};

export default {
  name: 'dashboard-image-upload',
  component: MediaPortal,
};
