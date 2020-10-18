import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as gateway from "@aws-cdk/aws-apigateway";

export class CdkNestStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const testLambda = new lambda.Function(this, "TestHanlder", {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset("lambda/test"),
      handler: "index.handler"
    });

    const backendLambda = new lambda.Function(this, "BackendHandler", {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset("lambda/api"),
      handler: "index.handler"
    });

    new gateway.LambdaRestApi(this, "TestEndpoint", {
      handler: testLambda
    });

    new gateway.LambdaRestApi(this, "BackendEndpoint", {
      handler: backendLambda
    });
  }
}
