import { useMutation } from 'react-query';

export default function useUpload({ endpoint }) {
  if (!endpoint) {
    throw new Error('Must provide an endpoint to upload');
  }

  return useMutation(async ({ file, uploadOptions }) => {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tags: uploadOptions.tags,
        public_id: uploadOptions.public_id,
        resource_type: uploadOptions.resource_type,
        file,
        ...uploadOptions,
      }),
    });

    return res.json();
  });

  // return { upload, data, isIdle, isSuccess, isLoading, isError, error };
}
