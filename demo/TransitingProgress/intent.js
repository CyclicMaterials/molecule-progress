/**
 * @fileoverview Intent for Demo TransitingProgress Dataflow Component
 * @author Frederik Krautwald
 * @copyright 2015 Cyclic Materials. All rights reserved.
 */

function intent({DOM}) {
  return {
    value$: DOM.select(`.InputValue`).events(`change`)
      .map(ev => ev.target.value),
  }
}

export default intent
