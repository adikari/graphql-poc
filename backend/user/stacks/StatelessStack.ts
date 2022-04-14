import * as sst from '@serverless-stack/resources';
import * as cdk from 'aws-cdk-lib';

interface StatelessStackProps extends sst.StackProps {
  userTable: sst.Table;
}

export default class StatelessStack extends sst.Stack {
  constructor(scope: sst.App, id: string, props: StatelessStackProps) {
    super(scope, id, props);

    const paymentGraphqlEndpoint = cdk.Fn.importValue(`${this.stage}-payment-GraphqlEndpoint`);

    const restapi = new sst.Api(this, 'Rest', {
      routes: {
        'GET /users/{id}': {
          function: {
            handler: 'src/functions/get-user-by-id.handler',
            permissions: [props.userTable]
          }
        },
        'GET /users/{id}/payments': {
          function: {
            handler: 'src/functions/get-user-payments.handler',
            environment: {
              PAYMENT_GQL_URL: `${paymentGraphqlEndpoint}/graphql`
            }
          }
        }
      }
    });

    const graphqlApi = new sst.Api(this, 'Api', {
      routes: {
        'POST /graphql': {
          function: {
            handler: 'src/server.handler',
            permissions: [props.userTable]
          }
        }
      }
    });

    this.addOutputs({
      GraphqlEndpoint: graphqlApi.url,
      RestEndpoint: restapi.url
    });
  }
}
