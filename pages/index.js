import 'tippy.js/dist/tippy.css';
import React from 'react';
import { Flex, useBreakpointValue } from '@chakra-ui/react';
import Layout from '@components/Layout';
import FeaturedJamCard from '@components/JamList/FeaturedJamCard';
import MobileFeaturedJamCard from '@components/JamList/MobileFeaturedJamCard';
import JamList from '@components/JamList';
import Banner from '@components/Banner';
import Search from '@components/Search';

import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { useJamsQuery } from '@hooks/useJams';
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
  const [searchValue, setSearchValue] = React.useState('');
  const [selectedFilters, setSelectedFilters] = React.useState([]);
  const [filteredPosts, setFilteredPosts] = React.useState([]);
  const [featuredJams, setFeaturedJams] = React.useState([]);
  const { data, isLoading } = useJamsQuery();

  const fuse = new Fuse(data?.jams, fuseOptions);

  React.useEffect(() => {
    // do some checking here to ensure data exist
    if (isLoading === false && data?.jams) {
      const featured = data.jams?.filter(
        (jam) => jam.postMetadata.featured === true,
      );

      setFeaturedJams(featured);
      setFilteredPosts(data.jams);
    }
  }, [isLoading, data?.jams]);

  // handle updating the filteredPosts with different search criteria
  React.useEffect(() => {
    if (searchValue === '' && selectedFilters.length === 0) {
      handleFilter(data?.jams);
    } else {
      // Allow for a search for tag
      const formattedTags = selectedFilters.map((item) => item.title);

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
  }, [searchValue, selectedFilters, isLoading]);

  function addTag(tag) {
    return setSelectedFilters((prev) => [...prev, tag]);
  }

  function removeTag(tag) {
    return setSelectedFilters((prev) => prev.filter((pt) => pt !== tag));
  }

  const handleFilter = (data) => {
    setFilteredPosts(data);
  };

  const clearAllTags = () => {
    setSelectedFilters([]);
  };

  return (
    <Flex w="100%" height="100%" direction="column" overflowY="auto">
      <Banner />
      <Flex direction="column" w="100%">
        <Search
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          addTag={addTag}
          removeTag={removeTag}
          clearAllTags={clearAllTags}
        />

        <Flex
          w={{ base: '90%', lg: '884px' }}
          mt="26px"
          alignSelf="center"
          h="100%"
          direction="column"
          justify="space-around"
          sx={{ gap: '24px' }}
        >
          {searchValue.length < 1 && featuredJams.length > 0 && (
            <ResonsiveFeaturedCard jam={featuredJams[0]} />
          )}
          <JamList jams={filteredPosts} featuredJam={featuredJams[0]} />
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
  await queryClient.fetchQuery('allJams', queryJams.getStatic);
  await queryClient.setQueryData('allJams', (old) => ({ jams: old.data.jams }));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
