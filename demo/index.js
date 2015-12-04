/**
 * @fileoverview Demo
 * @author Frederik Krautwald
 * @copyright 2015 Cyclic Materials. All rights reserved.
 */

import {run} from '@cycle/core'
import {div, h4, br, makeDOMDriver} from '@cycle/dom'
import {Observable} from 'rx'
import ProgressBar from './ProgressBar/index'
import Progress from './../src/Progress/index'

function main({DOM}) {
  const progressBar = ProgressBar({DOM})
  const progressIndeterminate = Progress({
    props$: Observable.just({indeterminate: true}),
  })
  const progressIndeterminateBlue = Progress({
    props$: Observable.just({indeterminate: true, className: `.blue`}),
  })
  const progressColorBlue = Progress({
    props$: Observable.just({value: 40, className: `.blue`}),
  })
  const progressColorRed = Progress({
    props$: Observable.just(
      {value: 800, min: 100, max: 1000, className: `.red`}
    ),
  })
  const progressColorOrange = Progress({
    props$: Observable.just({value: 40, className: `.orange`}),
  })
  const progressColorGreen = Progress({
    props$: Observable.just({value: 200, max: 200, className: `.green`}),
  })
  const progressColorBlueSecondary = Progress({
    props$: Observable.just(
      {value: 40, secondaryProgress: 80, className: `.blue`}
    ),
  })
  const progressDisabledIndeterminate = Progress({
    props$: Observable.just({indeterminate: true, disabled: true}),
  })
  const progressDisabledBlueSecondary = Progress({
    props$: Observable.just(
      {value: 40, secondaryProgress: 80, className: `.blue`, disabled: true}
    ),
  })

  return {
    DOM: Observable.combineLatest(
      progressBar.DOM,
      progressIndeterminate.DOM,
      progressIndeterminateBlue.DOM,
      progressColorBlue.DOM,
      progressColorRed.DOM,
      progressColorOrange.DOM,
      progressColorGreen.DOM,
      progressColorBlueSecondary.DOM,
      progressDisabledIndeterminate.DOM,
      progressDisabledBlueSecondary.DOM,
      (...vTrees) =>
        div(`.template-DemoPages_sectionContainer.isVertical`, [
          h4(`Progress bar`),
          div(`.template-DemoPages_verticalSection`, [
            vTrees[0],
          ]),

          h4(`Indeterminate`),
          div(`.template-DemoPages_verticalSection`, [
            vTrees[1],
            br(),
            vTrees[2],
            br(),
          ]),

          h4(`Color`),
          div(`.template-DemoPages_verticalSection`, [
            vTrees[3],
            br(),
            vTrees[4],
            br(),
            vTrees[5],
            br(),
            vTrees[6],
            br(),
            vTrees[7],
            br(),
          ]),

          h4(`Disabled`),
          div(`.template-DemoPages_verticalSection`, [
            vTrees[8],
            br(),
            vTrees[9],
            br(),
          ]),
        ])
    ),
  }
}

run(main, {
  DOM: makeDOMDriver(`.demo-container`),
})
