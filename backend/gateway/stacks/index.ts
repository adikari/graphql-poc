import StatelessStack from "./StatelessStack";
import * as sst from "@serverless-stack/resources";

export default function main(app: sst.App): void {
  app.setDefaultFunctionProps({
    runtime: "nodejs14.x"
  });

  new StatelessStack(app, "gql-poc-gateway");
}
