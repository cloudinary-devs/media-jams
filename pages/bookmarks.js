import Layout from '@components/Layout';
import { useQuery } from 'react-query';
import { Flex, Heading, useDisclosure } from '@chakra-ui/react';
import auth0 from '@lib/auth0';
import JamAccordion from '@components/JamAccordion';
import { bookmarks } from '@lib/queries/bookmarks';
import { jams } from '@lib/queries/jams';

function Bookmarks() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { status, data, error, isFetching } = useQuery(
    'bookmarks',
    bookmarks.get,
  );
  const postIds = data?.bookmarks?.map(({ content_id }) => content_id);

  // Then get the posts for this bookmark content_id's
  const { isIdle, data: posts, isSuccess } = useQuery(
    'bookmark jams',
    () => jams.getByIds(postIds),
    {
      // The query will not execute until the postIds exists
      enabled: !!postIds,
    },
  );

  return (
    <Layout isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
      <Flex overflow="scroll" align="center" p={5}>
        <Flex w="40%" direction="column">
          {posts?.allPost?.map((post) => (
            <JamAccordion
              color="blue"
              shadow
              w="100%"
              key={post._id}
              post={post}
              defaultIndex={[0]}
              borderRadius="lg"
              mb={4}
            />
          ))}
        </Flex>
      </Flex>
    </Layout>
  );
}
export default Bookmarks;
export const getServerSideProps = auth0.withPageAuthRequired();
