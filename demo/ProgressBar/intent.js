/**
 * @fileoverview Intent for Demo ProgressBar Dataflow Component
 * @author Frederik Krautwald
 * @copyright 2015 Cyclic Materials. All rights reserved.
 */

function intent({DOM}) {
  return {
    start$: DOM.select(`.Button`).events(`click`).map(() => true),
  }
}

export default intent
