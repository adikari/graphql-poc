import StatelessStack from './StatelessStack';
import * as sst from '@serverless-stack/resources';
import StatefulStack from './StatefulStack';

export default function main(app: sst.App): void {
  app.setDefaultFunctionProps({
    runtime: 'nodejs14.x'
  });

  const stateful = new StatefulStack(app, 'gql-poc-user-stateful');

  new StatelessStack(app, 'gql-poc-user', { userTable: stateful.userTable });
}
