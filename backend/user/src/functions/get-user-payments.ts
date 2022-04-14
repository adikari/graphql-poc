import { APIGatewayProxyEventV2, APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { log } from '../util/logger';
import axios from 'axios';

export const handler: APIGatewayProxyHandlerV2 = async (event: APIGatewayProxyEventV2) => {
  log.info('received event', { event });
  const userId = event.pathParameters?.id;

  if (!userId) {
    return {
      statusCode: 400,
      body: 'userId is missing in path params'
    };
  }

  const query = `
    query GetPaymentsByUserEmail($email: String!) {
      paymentsByUserEmail(email: $email) {
        id
        beneficiary
        date
        amount
        user {
          id
          email
        }
      }
    }
  `;

  const res = await axios.post(
    process.env.PAYMENT_GQL_URL,
    { body: JSON.stringify({ query, variables: { email: userId } }) },
    { headers: { 'content-type': 'application/json' } }
  );

  log.info('response from payment', res);

  return {
    statusCode: 200,
    body: JSON.stringify({ data: res.data })
  };
};
