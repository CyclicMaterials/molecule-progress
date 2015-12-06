/**
 * @fileoverview Demo TransitingProgress Dataflow Component
 * @author Frederik Krautwald
 * @copyright 2015 Cyclic Materials. All rights reserved.
 */

import 'rx-dom-concurrency'
import intent from './intent'
import model from './model'
import view from './view'
import Progress from './../../src/Progress/index'

function TransitingProgress({DOM}) {
  const actions = intent({DOM})
  const props$ = actions.value$.startWith(0).map(
    value => ({value, className: `.is-Transiting`})
  )
  const progress = Progress({props$})
  const state$ = model({props$})

  return {
    DOM: view({state$, progressVTree$: progress.DOM}),
  }
}

export default TransitingProgress
