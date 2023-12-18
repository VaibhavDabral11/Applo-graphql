import {
    GraphQLBoolean,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLScalarType,
    GraphQLString,
  } from "graphql";
  
  const DefaultPayload = new GraphQLObjectType({
    name: "DefaultPayload",
    description: "Default payload",
    fields: {
      status: {
        type: GraphQLInt,
      },
      message: {
        type: GraphQLString,
      },
      data: {
        type: new GraphQLScalarType({
          name: "data",
          serialize: (value) => value,
        }),
      },
    },
  });
  
  export default DefaultPayload;