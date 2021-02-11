import { graphql } from 'msw';
import allPosts from './allPostsMock';

export const handlers = [
  graphql.query('GetAllPosts', (req, res, ctx) => {
    return res(ctx.data({ data: 'hello' }));
  }),
  graphql.query('AllTags', (req, res, ctx) => {
    return res(ctx.data({ greeting: 'hello' }));
  }),
  graphql.query('AllCategories', (req, res, ctx) => {
    return res(ctx.data({ greeting: 'hello' }));
  }),
];
