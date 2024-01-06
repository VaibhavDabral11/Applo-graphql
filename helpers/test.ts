import { request, gql } from 'graphql-request';
// Define your mutation document
const createCustomerPlanMutation = gql`
mutation SignIn($input: LoginUserInput!) {
  signIn(input: $input) {
    status
    message
    data {
      token
      user {
        id
        name
        email
        role
        status
        emailVerified
        department
        designation
      }
    }
  }
}
`;
// Define the GraphQL request function
async function makeGraphQLRequest() {
  const inputData = {
    input: {
      email: "abhirup.basu@globtier.co.in",
      password: "Basu1234"
    }
  }
  try {
    const response: any = await request('http://localhost:4000/graphql', createCustomerPlanMutation, inputData);
    console.log("graphqlllllllllllllllllllllllllllllllllllllllllllllllll", response);
    const user = response.signIn.data.user;
    console.log("userrrrrrrrrrrrrrrrrrrr", user)
  } catch (error) {
    console.error(error);
  }
}
makeGraphQLRequest()
