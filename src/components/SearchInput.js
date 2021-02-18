import React from 'react';
import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { FaFilter } from 'react-icons/fa';
import { useMixPanel } from '@lib/mixpanel';
import useDebounce from '../hooks/useDebounce';

export default function SearchInput({
  searchValue,
  setSearchValue,
  showFilters,
  setShowFilters,
  width,
  color,
  ...rest
}) {
  const mixpanel = useMixPanel();
  const debounceSearchValue = useDebounce(searchValue, 500);

  React.useEffect(() => {
    mixpanel.track('Search Tag', { searchInput: debounceSearchValue });
  }, [mixpanel, debounceSearchValue]);
  const onChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  return (
    <InputGroup w={width} {...rest}>
      <Input
        colorScheme={color}
        variant="outline"
        placeholder="Search by tag, title, or keyword..."
        padding="1.2rem 0 1.2rem 1rem"
        value={searchValue}
        onChange={onChange}
        borderColor={color}
        _placeholder={{
          lineSpacing: '4px',
          fontSize: 'sm',
        }}
      />
      <InputRightElement
        display={{ base: 'inherit', lg: 'none', xl: 'none' }}
        p={3}
      >
        <IconButton
          onClick={() => setShowFilters(!showFilters)}
          icon={<FaFilter />}
          colorScheme="red"
          size="sm"
        ></IconButton>
      </InputRightElement>
    </InputGroup>
  );
}
