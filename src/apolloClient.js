import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
const client = new ApolloClient({
  link: new HttpLink({
    uri: "PUT-HERE-URL-TO-GRAPHQL-END-POINT",
    headers: {
      // PUT-HERE-ANY-HEADER-VARS-IF-EXISTS
    },
  }),
  cache: new InMemoryCache(),
});
export default client;