/**
 * @fileoverview Model for Demo ProgressBar Dataflow Component
 * @author Frederik Krautwald
 * @copyright 2015 Cyclic Materials. All rights reserved.
 */

function model({props$}) {
  return props$.map(
    props => ({
      disabled: !(props.repeat === props.maxRepeat && props.value === props.max),
    })
  )
}

export default model
