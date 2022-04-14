import StatelessStack from './StatelessStack';
import * as sst from '@serverless-stack/resources';
import StatefulStack from './StatefulStack';

export default function main(app: sst.App): void {
  const stateful = new StatefulStack(app, 'gql-poc-user-stateful');

  app.setDefaultFunctionProps({
    runtime: 'nodejs14.x',
    environment: {
      USER_TABLE: stateful.userTable.tableName
    }
  });

  new StatelessStack(app, 'gql-poc-user', { userTable: stateful.userTable });
}
