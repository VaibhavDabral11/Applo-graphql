import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { GqlUserById } from "../returnType/GglUser";

export const AuthPayload = new GraphQLObjectType({
  name: "AuthPayload",
  description: "authentication payload",
  fields: {
    token: {
      type: GraphQLString,
    },
    user: {
      type: GqlUserById,
    },
  },
});