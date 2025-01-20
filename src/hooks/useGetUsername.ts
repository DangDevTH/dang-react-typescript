import { gql, useQuery } from "@apollo/client";

const getUsernameDocument = gql`
  query Username($username: String!) {
    username(FindUserInput: { username: $username }) {
        id
        username
        name
        profileImage
        backgroundImage
    }
  }
`;      

const useGetUsername = ( username: string ) => {
    const query = useQuery(getUsernameDocument,{variables: {username}});

    return query;
};

export { useGetUsername };
 