import { graphql } from 'msw';
import allPosts from './allPostsMock';

export const handlers = [
  graphql.query('GetAllPosts', (req, res, ctx) => {
    return res(ctx.data(allPosts));
  }),
  graphql.query('AllTags', (req, res, ctx) => {
    return res(ctx.data({ tags: {} }));
  }),
  graphql.query('AllCategories', (req, res, ctx) => {
    return res(ctx.data({ categories: {} }));
  }),
];
