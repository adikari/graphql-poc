import * as sst from '@serverless-stack/resources';

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

    const api = new sst.Api(this, 'Api', {
      routes: {
        'POST /graphql': gqlServer
      }
    });

    this.addOutputs({
      GraphqlEndpoint: api.url
    });
  }
}
