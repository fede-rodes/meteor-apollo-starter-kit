import gql from 'graphql-tag';
import userFragment from '../fragment/user';

const userQuery = gql`
  query {
    user {
      ...userFragment
    }
  }
  ${userFragment}
`;

export default userQuery;
