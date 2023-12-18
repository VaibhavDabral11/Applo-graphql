import {
    GraphQLID,
    GraphQLInputObjectType,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from "graphql";

export const getUserInput = new GraphQLInputObjectType({
    name: "getUser",
    description: "get user",
    fields: {
        UserId: {
            type: new GraphQLNonNull(GraphQLInt),
            description: "id"
        }
    }
});