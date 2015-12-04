/**
 * @fileoverview View for Demo ProgressBar Dataflow Component
 * @author Frederik Krautwald
 * @copyright 2015 Cyclic Materials. All rights reserved.
 */

import {Observable} from 'rx'
import {div, button} from '@cycle/dom'

function view({state$, progressVTree$}) {
  return Observable.combineLatest(
    state$,
    progressVTree$,
    (state, progressVTree) =>
      div(`.demo-ProgressBar`, [
        progressVTree,
        button(`.Button`, {disabled: state.disabled}, `Start`),
      ])
  )
}

export default view
