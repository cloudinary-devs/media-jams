import React from 'react';
import { render, screen, act, waitFor } from 'test-utils';
import categoriesMock from '../../__mocks__/categoriesMock';
import TabbedTagSelection from '@components/TabbedTagSelection';
const addTag = jest.fn();
const removeTag = jest.fn();
const searchTags = [];

test('renders tablist categories w/o error', () => {
  render(
    <TabbedTagSelection
      tabs={categoriesMock}
      searchTags={searchTags}
      addTag={addTag}
      removeTag={removeTag}
    />,
  );
  const [firstTab] = screen.getAllByRole('tablist');
  expect(firstTab).toBeInTheDocument();
});

test('select category titles shows relivent tags', () => {
  render(
    <TabbedTagSelection
      tabs={categoriesMock}
      searchTags={searchTags}
      addTag={addTag}
      removeTag={removeTag}
    />,
  );
  const [firstTab, secondTab, ...restTabs] = categoriesMock;
  expect(screen.getByRole('tab', { name: firstTab.title })).toBeInTheDocument();
  expect(
    screen.getByRole('tab', { name: secondTab.title }),
  ).toBeInTheDocument();
});
