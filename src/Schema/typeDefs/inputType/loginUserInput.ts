import {
    GraphQLNonNull,
    GraphQLInputObjectType,
    GraphQLString,
} from "graphql";

export const loginInput: any = new GraphQLInputObjectType({
    name: "LoginInput",
    description: "Input type for user login",
    fields: {
        email: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'User email'
        },
        password: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'User password'
        }
    },
});
