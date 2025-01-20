import { gql, useQuery } from "@apollo/client";

const getMeDocument = gql`
  query Me {
    me {
      id
      username
    }
  }
`;

const useGetMe = () => {
  return useQuery(getMeDocument);
};

export { useGetMe };
