import { Template } from "aws-cdk-lib/assertions";
import * as sst from "@serverless-stack/resources";
import ServerlessStack from "../stacks/ServerlessStack";

test("Test Stack", () => {
  const app = new sst.App();

  const stack = new ServerlessStack(app, "test-stack");

  const template = Template.fromStack(stack);
  template.resourceCountIs("AWS::Lambda::Function", 1);
});
