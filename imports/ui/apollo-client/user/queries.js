import gql from 'graphql-tag';
import userFragment from './fragments';

const userQuery = gql`
  query {
    user {
      ...userFragment
    }
  }
  ${userFragment}
`;

export default userQuery;
