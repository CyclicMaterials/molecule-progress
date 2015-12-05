/**
 * @fileoverview View for Progress
 * @author Frederik Krautwald
 * @copyright 2015 Cyclic Materials. All rights reserved.
 */

import {div} from '@cycle/dom'

function transformedStyle(ratio) {
  const scaleX = ratio / 100
  return `-webkit-transform: scaleX(${scaleX}); transform: scaleX(${scaleX});`
}

function view({state$}) {
  return state$.map(
    state => {
      const {
        className,
        disabled,
        indeterminate,
        max,
        min,
        ratio,
        secondaryRatio,
        value,
        } = state

      const attributes = {
        'aria-valuenow': value,
        'aria-valuemin': min,
        'aria-valuemax': max,
        role: `progressbar`,
      }

      if (disabled) {
        attributes[`aria-disabled`] = true
      }

      const isDisabledClassName = disabled ? `.is-Disabled` : ``
      const isIndeterminateClassName = indeterminate ? `.is-Indeterminate` : ``
      const componentState = `${isDisabledClassName}${isIndeterminateClassName}`

      return div(`.molecule-Progress${componentState}${className}`, {
        attributes,
        disabled,
      }, [
        div(`.molecule-Progress_container`, [
          div(`.molecule-Progress_secondary.atom-Layout--fit`, {
            attributes: {
              style: transformedStyle(secondaryRatio),
            },
            hidden: !state.secondaryProgress,
          }),
          div(`.molecule-Progress_primary.atom-Layout--fit`, {
            attributes: {
              style: transformedStyle(ratio),
            },
          }),
        ]),
      ])
    }
  )
}

export default view
