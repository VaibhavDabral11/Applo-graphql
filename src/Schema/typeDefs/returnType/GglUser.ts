import {
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLBoolean,
  } from "graphql";
  
  export const GqlUserById: any = new GraphQLObjectType({
    name: "UserById",
    description: "users",
    fields: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: "id of the user",
      },
      name: {
        type: GraphQLString,
      },
      email: {
        type: GraphQLString,
      },
    },
  });
  