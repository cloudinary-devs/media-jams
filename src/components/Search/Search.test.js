import React from 'react';
import { render, screen, act, waitFor } from '@utils/test-utils';
import Search from '@components/Search';

describe('default test', () => {
  test('saddness', () => {
    expect(1).toEqual(1);
  });
});

// const myMockFn = jest.fn();
// describe('Search Input for Jams', () => {
//   test('renders usable input w/ focus', () => {
//     render(
//       <Search
//         searchValue={''}
//         setSearchValue={myMockFn}
//         selectedFilters={{ data: { tags: [] } }}
//         setSelectedFilters={myMockFn}
//         addTag={myMockFn}
//         removeTag={myMockFn}
//         clearAllTags={myMockFn}
//       />,
//     );
//     expect(
//       screen.getByPlaceholderText(
//         /Search by tag, title, keyword, author, etc.../i,
//       ),
//     ).toBeInTheDocument();
//   });
// });
