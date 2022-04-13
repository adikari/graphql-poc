import * as sst from '@serverless-stack/resources';

export default class StatefulStack extends sst.Stack {
  userTable: sst.Table;

  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props);

    this.userTable = new sst.Table(this, 'UserTable', {
      fields: {
        pk: sst.TableFieldType.STRING,
        sk: sst.TableFieldType.STRING
      },
      primaryIndex: { partitionKey: 'pk', sortKey: 'sk' }
    });
  }
}
