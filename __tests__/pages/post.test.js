import React from 'react';
import { render, screen, act, waitFor, debug } from 'test-utils';
import { renderHook } from '@testing-library/react-hooks';
import Post, { getStaticProps } from '../../pages/post/';

test('`getStaticProps` should prefetch query tags & categories', async () => {
  const response = await getStaticProps();
  const { queries } = response.props.dehydratedState;
  expect(queries.length).toEqual(2);
  expect(queries[0]).toEqual(
    expect.objectContaining({
      queryKey: 'jamTags',
      queryHash: '["jamTags"]',
    }),
  );
  expect(queries[1]).toEqual(
    expect.objectContaining({
      queryKey: 'jamCategories',
      queryHash: '["jamCategories"]',
    }),
  );
});

test('post index should render w/o error', async () => {
  const response = await getStaticProps();
  const { props } = response;

  act(() => {
    render(<Post {...props} />);
    expect(true).toBeTruthy();
  });
});
