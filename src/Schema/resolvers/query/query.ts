import { GraphQLObjectType } from "graphql";
import { getuserQuery } from "./queryService";

export const query = new GraphQLObjectType({
    name: "query",
    fields: {
        AllUsers: getuserQuery
    },
})