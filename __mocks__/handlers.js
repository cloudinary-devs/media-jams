import { graphql } from 'msw';
import allPosts from './allPostsMock';

export const handlers = [
  graphql.query('GetAllPosts', (req, res, ctx) => {
    return res(ctx.data(allPosts));
  }),
  graphql.query('Bookmarks', (req, res, ctx) => {
    return res(
      ctx.data({
        bookmarks: [
          { content_id: '447d8c2b-5e17-435a-b32f-7707dfa553c8' },
          { content_id: '35c9ea1c-de41-471c-a92e-516957e50570' },
          { content_id: '4c88106f-e7be-45fb-a707-6bfeffa111c1' },
        ],
      }),
    );
  }),
  graphql.query('AllTags', (req, res, ctx) => {
    return res(ctx.data({ tags: {} }));
  }),
  graphql.query('AllCategories', (req, res, ctx) => {
    return res(ctx.data({ categories: {} }));
  }),
  graphql.query('PostsByAuthor', (req, res, ctx) => {
    return res(ctx.data({ categories: {} }));
  }),
  graphql.query('AllRoutes', (req, res, ctx) => {
    return res(
      ctx.data({
        data: {
          data: {
            routes: [
              {
                _id: '02992886-28b2-4868-9ecb-11c3201dec4e',
                slug: {
                  current: 'legal/privacy',
                },
                page: {
                  title: 'Privacy Policy',
                },
              },
              {
                _id: '3c4745e9-edeb-4f08-adad-d97ef49f5c37',
                slug: {
                  current: 'legal/termsofservice',
                },
                page: {
                  title: 'Terms of Service',
                },
              },
            ],
          },
        },
      }),
    );
  }),
];
