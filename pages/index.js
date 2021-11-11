import 'tippy.js/dist/tippy.css';
import React from 'react';
import { Flex, Box, useBreakpointValue } from '@chakra-ui/react';
import Layout from '@components/Layout';
import FeaturedJamCard from '@components/JamList/FeaturedJamCard';
import MobileFeaturedJamCard from '@components/JamList/MobileFeaturedJamCard';
import LoadMoreButton from '@components/JamList/LoadMoreButton';
import JamList from '@components/JamList';
import Banner from '@components/Banner';
import Search from '@components/Search';

import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { useJamsQuery, useFeaturedJamsQuery } from '@hooks/useJams';
import { useSearch } from '@components/SearchProvider';
import Fuse from 'fuse.js';
import { tags as queryTags } from '@lib/queries/tags';
import { jams as queryJams } from '@lib/queries/jams';

const fuseOptions = {
  threshold: 0.35,
  location: 0,
  distance: 100,
  minMatchCharLength: 3,
  shouldSort: true,
  includeScore: true,
  useExtendedSearch: true,
  keys: ['title', 'tags.title', ['author', 'name']],
};

export default function Dashboard() {
  const ResonsiveFeaturedCard = useBreakpointValue({
    base: MobileFeaturedJamCard,
    lg: FeaturedJamCard,
  });

  const {
    state: { searchValue, selectedTagFilters, filteredJams },
    handleFilter,
    updateSearchValue,
  } = useSearch();
  const [showJams, setShowJams] = React.useState({
    inc: 0,
    jams: [],
    disabled: false,
  });
  const { data: allJams, isLoading: isLoadingJams } = useJamsQuery();
  const { data: featuredJams, isLoading } = useFeaturedJamsQuery();

  const fuse = new Fuse(allJams?.jams, fuseOptions);

  React.useEffect(() => {
    // do some checking here to ensure data exist
    if (isLoadingJams === false && allJams?.jams) {
      handleFilter(allJams?.jams);
      loadMoreJams();
    }
  }, [isLoadingJams, allJams]);

  // handle updating the filteredPosts with different search criteria
  React.useEffect(() => {
    if (searchValue === '' && selectedTagFilters.length === 0) {
      handleFilter(allJams?.jams);
    } else {
      // Allow for a search for tag
      const formattedTags = selectedTagFilters.map((item) => item.title);

      const queries = {
        $or: [
          { title: searchValue },
          {
            $path: ['author.name'],
            $val: searchValue,
          },
          {
            $and:
              formattedTags.length > 0
                ? [{ $path: 'tags.title', $val: formattedTags[0] }]
                : [],
          },
        ],
      };
      const results = fuse.search(queries).map((result) => result.item);
      handleFilter(results);
      // routerPushTags({ tags: selectedFilters.map((f) => f.title).join(',') });
    }
  }, [searchValue, selectedTagFilters, isLoadingJams]);

  const loadMoreJams = () => {
    setShowJams((prevState) => {
      // Removed featured jams for duplication
      const jams = allJams?.jams.filter((j) => !j.postMetadata.featured);
      const updatedInc = prevState.inc + 10;

      // increment by n w/o going over the total num of jams available
      const inc = updatedInc < jams.length ? updatedInc : jams.length;

      return {
        inc,
        // load slice of n jams into show list
        jams: jams.slice(0, inc),
        disabled: inc == jams.length,
      };
    });
  };

  const FeaturedJams = () =>
    featuredJams?.jams.map((jam) => (
      <Box key={jam.id}>
        {ResonsiveFeaturedCard !== undefined ? (
          <ResonsiveFeaturedCard jam={jam} />
        ) : (
          ''
        )}
      </Box>
    ));

  return (
    <Flex w="100%" height="100%" direction="column" overflowY="auto">
      <Banner />
      <Flex direction="column" w="100%">
        <Search searchValue={searchValue} setSearchValue={updateSearchValue} />

        <Flex
          w={{ base: '90%', lg: '884px' }}
          mt="26px"
          mb="50px"
          alignSelf="center"
          h="100%"
          direction="column"
          justify="space-around"
          sx={{ gap: '24px' }}
        >
          {searchValue === '' && selectedTagFilters.length === 0 ? (
            <>
              <FeaturedJams />
              <JamList jams={showJams?.jams} />
              <LoadMoreButton
                onClick={loadMoreJams}
                disabled={showJams.disabled}
              />
            </>
          ) : (
            <JamList jams={filteredJams} />
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}

Dashboard.getLayout = (page) => <Layout>{page}</Layout>;

export const getStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.fetchQuery('jamTags', queryTags.getStatic);
  await queryClient.setQueryData('jamTags', (old) => ({ tags: old.tags }));
  await queryClient.fetchQuery('featuredJams', queryJams.getStaticFeaturedJams);
  await queryClient.setQueryData('featuredJams', (old) => ({
    jams: old.data.jams,
  }));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
