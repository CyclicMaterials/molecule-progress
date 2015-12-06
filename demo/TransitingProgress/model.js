/**
 * @fileoverview Model for Demo TransitingProgress Dataflow Component
 * @author Frederik Krautwald
 * @copyright 2015 Cyclic Materials. All rights reserved.
 */

function model({props$}) {
  return props$.map(props => props)
}

export default model
