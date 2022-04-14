import { APIGatewayProxyEventV2, APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { log } from '../util/logger';
import { userByEmail } from '../data/ddb/user-by-email';

export const handler: APIGatewayProxyHandlerV2 = async (event: APIGatewayProxyEventV2) => {
  log.info('received event', { event });

  const userId = event.pathParameters?.id as string;

  const found = await userByEmail(userId);

  return {
    statusCode: 200,
    body: JSON.stringify({ data: found })
  };
};
