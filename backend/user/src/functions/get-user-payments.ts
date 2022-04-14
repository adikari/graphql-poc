import { APIGatewayProxyEventV2, APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { log } from '../util/logger';
import axios from 'axios';

export const handler: APIGatewayProxyHandlerV2 = async (event: APIGatewayProxyEventV2) => {
  log.info('received event', { event });
  const userId = event.pathParameters?.id;

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
