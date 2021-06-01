import {SynthUtils} from '@aws-cdk/assert'
import {Stack} from '@aws-cdk/core'

import * as infra from '../lib/infra-stack'

test('infra snapshot test', () => {
  const stack = new Stack()
  new infra.InfraStack(stack, 'TestStack')
  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot()
})
