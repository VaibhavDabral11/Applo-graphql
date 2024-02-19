
import gql from 'graphql-tag';
import { createUserInputType, AuthPayloadType } from '../generated/inputTypesAndReturnTypes';

const mainTypeDefs = gql`
  ${createUserInputType}
  ${AuthPayloadType}

  input SignUpInput {
    name: String!
    email: String!
    password: String!
  }
  type User {
  id: ID!
  name: String
  email: String
  password: String
  }
  type AuthPayload {
    status:String
    message:String
    token: String
    user: User
  }
  type Mutation {
    SignUp(input: SignUpInput!): AuthPayload
  }
`;

export default mainTypeDefs;

// type Mutation {
//   signUp(
//     """User to be created"""
//     input: CreateUserInput!
//   ): AuthPayload