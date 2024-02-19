import { GraphQLObjectType } from "graphql";
import { createUserMutation } from "./AuthMutation";

const mutation = new GraphQLObjectType({
  name: "mutation",
  fields: {
    SignUp: createUserMutation
  },
});

export default mutation;