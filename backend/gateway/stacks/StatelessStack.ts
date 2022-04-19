import * as sst from '@serverless-stack/resources';

export default class StatelessStack extends sst.Stack {
  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props);

    if (!process.env.APOLLO_KEY) {
      throw new Error('APOLLO_KEY is not set');
    }

    const gqlServer = new sst.Function(this, 'GqlServer', {
      handler: 'src/server.handler',
      timeout: 180,
      environment: {
        APOLLO_KEY: process.env.APOLLO_KEY,
        APOLLO_GRAPH_ID: 'federation-d0xg3q',
        APOLLO_GRAPH_VARIANT: this.stage
      }
    });

    // this api is entrypoint to all graphql servers (eg, payment, user)
    const api = new sst.Api(this, 'Api', {
      routes: {
        'POST /graphql': gqlServer
      }
    });

    this.addOutputs({
      ApiEndpoint: api.url
    });
  }
}
