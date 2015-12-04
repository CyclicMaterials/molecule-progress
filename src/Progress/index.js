/**
 * @fileoverview Progress dataflow component
 * @author Frederik Krautwald
 * @copyright 2015 Cyclic Materials. All rights reserved.
 */

import {Observable} from 'rx'
import model from './model'
import {RangeBehavior} from '@cyclic/atom-range-behavior'
import view from './view'

function Progress(
  {
    props$ = Observable.just({}),
    RangeBehaviorFunc = RangeBehavior,
  }
) {
  const state$ = model({props$, RangeBehaviorFunc})
  return {
    DOM: view({state$}),
    state$,
  }
}

export default Progress
