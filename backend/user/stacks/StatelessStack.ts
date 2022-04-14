import * as sst from '@serverless-stack/resources';
// import * as cdk from 'aws-cdk-lib';

interface StatelessStackProps extends sst.StackProps {
  userTable: sst.Table;
}

export default class StatelessStack extends sst.Stack {
  constructor(scope: sst.App, id: string, props: StatelessStackProps) {
    super(scope, id, props);

    const gqlServer = new sst.Function(this, 'GqlServer', {
      handler: 'src/server.handler',
      environment: {
        USER_TABLE: props.userTable.tableName
      },
      permissions: [props.userTable]
    });

    const restapi = new sst.Api(this, 'Rest', {
      routes: {
        'GET    /users/{id}': 'src/functions/get-user-by-id.handler',
        'GET    /users/{id}/payments': {
          environment: {
            PAYMENT_API_URL: 'payment-api-url'
          },
          srcPath: 'src/get-user-payments.handler'
        }
      }
    });

    const api = new sst.Api(this, 'Api', {
      routes: {
        'POST /graphql': gqlServer
      }
    });

    this.addOutputs({
      GraphqlEndpoint: api.url,
      RestEndpoint: restapi.url
    });
  }
}
