import { gql } from 'graphql-request';
import fetchGraphQL from '@lib/featchGraphQL';

export const jams = {
  getJam: () => fetchGraphQL(),
};
