import React, { useEffect, useState } from 'react';
import getIt from 'get-it';
import jsonResponse from 'get-it/lib/middleware/jsonResponse';
import promise from 'get-it/lib/middleware/promise';
import { DashboardWidget } from '@sanity/dashboard';
import { Button, Flex, Card, Code, Stack, Text } from '@sanity/ui';
import styled from 'styled-components';
import { userModerator } from '../../app/lib/user';
import sanityClient from 'part:@sanity/base/client';

const request = getIt([promise(), jsonResponse()]);

const client = sanityClient.withConfig({ apiVersion: '2019-05-28' });

const Image = styled.img`
  display: block;
  width: 100%;
`;

function Jams() {
  const [docs, setDocs] = useState({ published: 0, drafts: 0 });
  const [error, setError] = useState(null);
  const isModerator = userModerator();

  useEffect(() => {
    async function fetchDocCount() {
      const published = await client.fetch(
        'count(*[ _type == "post" && !(_id in path("drafts.**"))])',
      );
      const drafts = await client.fetch(
        'count(*[ _type == "post" && (_id in path("drafts.**"))])',
      );
      setDocs({ published, drafts });
    }

    fetchDocCount();
  }, []);
  /**
   * Only render for Users with Moderator ROLE
   */
  if (!isModerator) return null;
  return (
    <DashboardWidget header="Jams Count">
      {error && (
        <Card paddingX={3} paddingY={4} tone="critical">
          <Code>{JSON.stringify(error, null, 2)}</Code>
        </Card>
      )}
      {!error && (
        <Stack padding={4} space={[3, 3, 4, 5]}>
          <Card padding={[3, 3, 4]} radius={2} shadow={1}>
            <Text size={[2, 2, 3]}>Published: {docs.published}</Text>
          </Card>
          <Card padding={[3, 3, 4]} radius={2} shadow={1}>
            <Text size={[2, 2, 3]}>Drafts: {docs.drafts}</Text>
          </Card>
        </Stack>
      )}
    </DashboardWidget>
  );
}

export default {
  name: 'jams-count',
  component: Jams,
};
