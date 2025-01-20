
import Cookies from "js-cookie"
import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { API_URL } from "./urls";
import { useDecrypt } from "../security/encryption";

const httpLink = createHttpLink({ uri: `${API_URL}/graphql` });

const uploadLink = createUploadLink({
  uri: `${API_URL}/graphql`, 
});

const authLink = new ApolloLink((operation, forward) => {
let token: string;
try {
   token = useDecrypt(String(Cookies.get(import.meta.env.VITE_COOKIE_NAME))).token;
   console.log('decrypt token: ', token);
} catch (error) {
  token = ''
}
  operation.setContext({
    headers: {
      Authorization: Cookies.get(import.meta.env.VITE_COOKIE_NAME)
        ? `Bearer ${String(token)}`
        : "",
    },
  });
  return forward(operation);
});

function postsMerge(existing: any[] = [], incoming: any[], { args }: any) {
  const merged = existing.slice(0); // Clone existing array
  const { skip = 0 } = args; // ใช้ `skip` จาก args

  for (let i = 0; i < incoming.length; i++) {
    merged[skip + i] = incoming[i]; // วาง incoming ที่ตำแหน่ง skip + i
  }

  return merged;
}


const client = new ApolloClient({
  link: ApolloLink.from([authLink, uploadLink, httpLink,]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          posts: {
            keyArgs: ["username"], 
            merge: postsMerge, 
          },
        },
      },
    },
  }),
});



export default client;
