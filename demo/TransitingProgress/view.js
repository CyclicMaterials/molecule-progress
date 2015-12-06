/**
 * @fileoverview View for Demo TransitingProgress Dataflow Component
 * @author Frederik Krautwald
 * @copyright 2015 Cyclic Materials. All rights reserved.
 */

import {Observable} from 'rx'
import {div, input} from '@cycle/dom'

function view({state$, progressVTree$}) {
  return Observable.combineLatest(
    state$,
    progressVTree$,
    (state, progressVTree) =>
      div(`.demo-TransitingProgress`, [
        progressVTree,
        input(`.InputValue`, {type: `number`, value: state.value}),
      ])
  )
}

export default view
