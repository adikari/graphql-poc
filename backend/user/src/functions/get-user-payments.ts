import { APIGatewayProxyEventV2, APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { log } from '../util/logger';
import axios from 'axios';

// this is the api handler for rest api
// it gets the user by id. this should only validate the api paremeters and call the service method to resolve the value
// this allows us to build graphql and rest api simultaneously without having to write a lot of code
export const handler: APIGatewayProxyHandlerV2 = async (event: APIGatewayProxyEventV2) => {
  log.info('received event', { event });
  const userId = event.pathParameters?.id;

  // because the payment is owned by payment service, we need to do cross service call
  // we are simply performing the graphql request and send it via http using axios
  // there are many ways to handle cross service calls, this is just one of them for sake of simplicity and reusability
  const query = `
    query GetPaymentsByUserEmail($email: String!) {
      paymentsByUserEmail(email: $email) {
        id
        beneficiary
        date
        amount
        user {
          id
        }
      }
    }
  `;

  const res = await axios.post(
    process.env.PAYMENT_GQL_URL,
    { query, variables: { email: userId } },
    { headers: { 'content-type': 'application/json' } }
  );

  log.info('data from payment endpoint', { data: res.data });

  const payments = res.data?.data?.paymentsByUserEmail ?? [];

  return {
    statusCode: 200,
    body: JSON.stringify({ data: payments })
  };
};
