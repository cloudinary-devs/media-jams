import Layout from '@components/Layout';
import { useQuery } from 'react-query';
import { Flex, Heading, useDisclosure } from '@chakra-ui/react';

import JamAccordion from '@components/JamAccordion_GQL';
import { boxShadow } from '@utils/styles';

import { bookmarks } from '@lib/queries/bookmarks';
import { jams } from '@lib/queries/jams';

export default function Bookmarks() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { status, data, error, isFetching } = useQuery(
    'bookmarks',
    bookmarks.get(),
  );
  const postIds = data?.bookmarks?.map(({ content_id }) => content_id);

  // Then get the posts for this bookmark content_id's
  const { isIdle, data: posts, isSuccess } = useQuery(
    'bookmark jams',
    jams.getByIds(postIds),
    {
      // The query will not execute until the postIds exists
      enabled: !!postIds,
    },
  );
  return (
    <Layout isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <Flex
        overflow="auto"
        alignItems="center"
        pt={2}
        justifyContent="space-around"
        direction={{ base: 'column', md: 'column', lg: 'column', xl: 'row' }}
      >
        {/* HEADER */}
        <Flex
          direction="column"
          boxShadow={boxShadow}
          borderRadius="lg"
          h={{ base: '700px', md: '90%', lg: '90%', xl: '80%' }}
          w={{ base: '100%', md: '90%', lg: '90%', xl: '50%' }}
          p={5}
          overflow="auto"
        >
          <Heading textStyle="headline-interstitial" color="red.400" mb={3}>
            Bookmarked Jams
          </Heading>
          <Flex direction="column" w="100%">
            {isSuccess &&
              posts.allPost?.map((post) => (
                <JamAccordion
                  w={{ base: '100%', md: '90%', lg: '70%', xl: '50%' }}
                  key={post._id}
                  post={post}
                />
              ))}
          </Flex>
        </Flex>

        <Flex
          direction={{ base: 'row', md: 'row', lg: 'column', xl: 'column' }}
          h={{ base: '30%', md: '40%', lg: '40%', xl: '95%' }}
          w={{ base: '95%', md: '80%', lg: '90%', xl: '20%' }}
          border="1px solid black"
          borderRadius="md"
          mt={{ base: 4, md: 4, lg: 4, xl: 0 }}
          boxShadow={boxShadow}
        ></Flex>
      </Flex>
    </Layout>
  );
}
