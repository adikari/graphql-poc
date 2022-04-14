import * as sst from '@serverless-stack/resources';

interface StatelessStackProps extends sst.StackProps {
  paymentTable: sst.Table;
}

export default class StatelessStack extends sst.Stack {
  constructor(scope: sst.App, id: string, props: StatelessStackProps) {
    super(scope, id, props);

    const gqlServer = new sst.Function(this, 'GqlServer', {
      handler: 'src/server.handler',
      environment: {
        PAYMENT_TABLE: props.paymentTable.tableName
      },
      permissions: [props.paymentTable]
    });

    const api = new sst.Api(this, 'Api', {
      routes: {
        'POST /graphql': gqlServer
      }
    });

    this.addOutputs({
      GraphqlEndpoint: {
        exportName: scope.logicalPrefixedName('GraphqlEndpoint'),
        value: api.url
      }
    });
  }
}
