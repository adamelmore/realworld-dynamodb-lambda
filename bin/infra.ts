#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from '@aws-cdk/core'
import * as codepipeline_actions from '@aws-cdk/aws-codepipeline-actions'
import {InfraStack} from '../lib/infra-stack'

import {Construct, Stage, Stack, StackProps, StageProps, SecretValue} from '@aws-cdk/core'
import {CdkPipeline, SimpleSynthAction} from '@aws-cdk/pipelines'
import * as codepipeline from '@aws-cdk/aws-codepipeline'

class Realworld extends Stage {
  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props)

    new InfraStack(this, 'InfraStack')
  }
}

/**
 * Stack to hold the pipeline
 */
class RealworldPipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    const sourceArtifact = new codepipeline.Artifact()
    const cloudAssemblyArtifact = new codepipeline.Artifact()

    const pipeline = new CdkPipeline(this, 'Pipeline', {
      pipelineName: 'MyAppPipeline',
      cloudAssemblyArtifact,

      sourceAction: new codepipeline_actions.GitHubSourceAction({
        actionName: 'GitHub',
        output: sourceArtifact,
        oauthToken: SecretValue.secretsManager('toptal/github-token'),
        owner: 'adamelmore',
        repo: 'realworld-dynamodb-lambda',
        branch: 'master',
      }),

      synthAction: new SimpleSynthAction({
        sourceArtifact,
        cloudAssemblyArtifact,

        installCommand: 'npm install',
        testCommands: ['npm test'],
        synthCommand: 'npx cdk synth',
      }),
    })

    pipeline.addApplicationStage(
      new Realworld(this, 'Prod', {
        env: {
          account: '119712928745',
          region: 'us-east-1',
        },
      })
    )
  }
}

const app = new cdk.App()
new RealworldPipelineStack(app, 'RealworldPipelineStack', {
  env: {
    account: '119712928745',
    region: 'us-east-1',
  },
})
