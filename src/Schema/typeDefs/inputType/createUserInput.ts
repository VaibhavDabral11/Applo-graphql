import {
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInputObjectType,
} from "graphql";

export const createUserInput: any = new GraphQLInputObjectType({
    name: "createUser",
    description: "createUser or signIn Api",
    fields: {
        name: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'name'
        },
        email: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'email'
        },
        password: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'password'
        }
    },
});
