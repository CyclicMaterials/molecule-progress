/**
 * @fileoverview Model for Progress
 * @author Frederik Krautwald
 * @copyright 2015 Cyclic Materials. All rights reserved.
 */

import {Observable} from 'rx'
import {RangeBehavior} from '@cyclic/atom-range-behavior'

function model(
  {
    props$ = Observable.just({}),
    RangeBehaviorFunc = RangeBehavior,
  }
) {
  const rangeBehavior = RangeBehaviorFunc({props$})
  return props$.combineLatest(
    rangeBehavior.state$,
    (props, rangeBehaviorState) => {
      const {
        className = ``,
        disabled = false,
        indeterminate = false,
        secondaryProgress = 0,
        } = props
      const {max, min, ratio, step, value} = rangeBehaviorState
      const secondaryRatio = rangeBehavior.ratioCalc(
          {value: secondaryProgress, step, min, max}
        ) * 100
      return {
        className,
        disabled,
        indeterminate,
        max,
        min,
        ratio,
        secondaryProgress,
        secondaryRatio,
        step,
        value,
      }
    }
  )
}

export default model
