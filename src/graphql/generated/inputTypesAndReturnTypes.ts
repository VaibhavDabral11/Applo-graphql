// inputTypesAndReturnTypes.ts
import gql from 'graphql-tag';

interface User {
    id: string;
    name: string;
    email?: string;
    password?: string;
  }
export const createUserInputType = gql`
  input createUserInputType {
    name: String
    email: Int
    password: String
  }
`;

export const AuthPayloadType = gql`
  type AuthPayloadType {
    status:String
    message:String
    token: String
    user: User
  }
`;
