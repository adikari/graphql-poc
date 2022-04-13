import { LambdaLog } from 'lambda-log';
import { nanoid } from 'nanoid';

export const log = new LambdaLog({
  tags: ['user'],
  dev: Boolean(process.env.JEST_WORKER_ID || process.env.IS_LOCAL),
  meta: {
    correlationId: nanoid(),
    awsRegion: process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION,
    functionName: process.env.AWS_LAMBDA_FUNCTION_NAME,
    functionVersion: process.env.AWS_LAMBDA_FUNCTION_VERSION,
    functionMemorySize: process.env.AWS_LAMBDA_FUNCTION_MEMORY_SIZE
  }
});
