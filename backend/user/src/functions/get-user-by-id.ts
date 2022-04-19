import { APIGatewayProxyEventV2, APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { log } from '../util/logger';
import { userByEmail } from '../data/ddb/user-by-email';

// this is the api handler for rest api
// it gets the user by id. this should only validate the api paremeters and call the service method to resolve the value
// this allows us to build graphql and rest api simultaneously without having to write a lot of code
export const handler: APIGatewayProxyHandlerV2 = async (event: APIGatewayProxyEventV2) => {
  log.info('received event', { event });

  const userId = event.pathParameters?.id as string;

  const found = await userByEmail(userId);

  return {
    statusCode: 200,
    body: JSON.stringify({ data: found })
  };
};
