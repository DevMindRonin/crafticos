import { noteTypeDefs } from "./note.types";
import { mutationTypeDefs } from "./mutations.types";
import { queryTypeDefs } from "./queries.types";
import { authTypeDefs } from "./auth.types";

export const typeDefs = `#graphql
  ${noteTypeDefs}
  ${mutationTypeDefs}
  ${queryTypeDefs}
  ${authTypeDefs}
`;
