/**
 * @fileoverview Demo ProgressBar Dataflow Component
 * @author Frederik Krautwald
 * @copyright 2015 Cyclic Materials. All rights reserved.
 */

import {Observable, Scheduler} from 'rx'
import 'rx-dom-concurrency'
import intent from './intent'
import model from './model'
import view from './view'
import Progress from './../../src/Progress/index'

function ProgressBar({DOM}) {
  const actions = intent({DOM})
  const props$ = actions.start$.startWith(true).map(
    start =>
      Observable.generate(
        {value: 0, min: 0, max: 100, step: 1, repeat: start ? 1 : 5, maxRepeat: 5},
        props => props.repeat <= props.maxRepeat,
        props => {
          if (props.value < props.max) {
            props.value += props.step || 1
          } else {
            props.repeat += 1
            props.value = props.min
          }
          return props
        },
        props => props,
        Scheduler.requestAnimationFrame
      ).share()
  ).flatMap(x => x)
  const progress = Progress({props$})
  const state$ = model({props$})

  return {
    DOM: view({state$, progressVTree$: progress.DOM}),
  }
}

export default ProgressBar
