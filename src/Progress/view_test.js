/**
 * @fileoverview Tests for Progress/view
 * @author Frederik Krautwald
 */

/* eslint max-nested-callbacks: 0, max-len: 0, no-unused-expressions: 0 */
/* global describe, it */

import chai from 'chai'
import chaiVirtualDOMPlugin from 'chai-virtual-dom'
import isVirtualNode from 'virtual-dom/vnode/is-vnode'
import view from './view'
import {assign} from 'fast.js'
import {div} from '@cycle/dom'
import {Observable} from 'rx'

const expect = chai.expect
chai.use(chaiVirtualDOMPlugin)

const defaultState = {
  className: ``,
  disabled: false,
  indeterminate: false,
  max: 100,
  min: 0,
  ratio: 0,
  secondaryProgress: 0,
  secondaryRatio: 0,
  step: 1,
  value: 0,
}

describe(`Progress`, () => {
  describe(`view`, () => {
    it(`should be a function`, () => {
      expect(view).to.be.a(`function`)
    })

    it(`should output an Observable<VirtualNode>`, (done) => {
      const state$ = Observable.just(defaultState)
      const dom$ = view({state$})
      expect(dom$).to.respondTo(`subscribe`)
      dom$.subscribe(vNode => {
        expect(isVirtualNode(vNode)).to.be.true
        done()
      })
    })

    it(`should output default DOM`, (done) => {
      const state = defaultState
      const state$ = Observable.just(state)
      const dom$ = view({state$})
      dom$.subscribe(vNode => {
        expect(vNode).to.look.exactly.like(
          div(`.molecule-Progress`, {
            attributes: {
              'aria-valuenow': state.value,
              'aria-valuemin': state.min,
              'aria-valuemax': state.max,
              role: `progressbar`,
            },
          }, [
            div(`.molecule-Progress_container`, [
              div(`.molecule-Progress_secondaryProgress.atom-Layout--fit`, {
                attributes: {
                  style: `-webkit-transform: scaleX(0); transform: scaleX(0);`,
                },
                hidden: true,
              }),
              div(`.molecule-Progress_primaryProgress.atom-Layout--fit`, {
                attributes: {
                  style: `-webkit-transform: scaleX(0); transform: scaleX(0);`,
                },
              }),
            ]),
          ])
        )
        done()
      })
    })

    it(`should output DOM with secondaryProgress shown`, (done) => {
      const state = assign({}, defaultState, {
        secondaryProgress: 10,
        secondaryRatio: 10,
      })
      const state$ = Observable.just(state)
      const dom$ = view({state$})
      dom$.subscribe(vNode => {
        expect(vNode).to.look.exactly.like(
          div(`.molecule-Progress`, {
            attributes: {
              'aria-valuenow': state.value,
              'aria-valuemin': state.min,
              'aria-valuemax': state.max,
              role: `progressbar`,
            },
          }, [
            div(`.molecule-Progress_container`, [
              div(`.molecule-Progress_secondaryProgress.atom-Layout--fit`, {
                attributes: {
                  style: `-webkit-transform: scaleX(0.1); transform: scaleX(0.1);`,
                },
              }),
              div(`.molecule-Progress_primaryProgress.atom-Layout--fit`, {
                attributes: {
                  style: `-webkit-transform: scaleX(0); transform: scaleX(0);`,
                },
              }),
            ]),
          ])
        )
        done()
      })
    })

    it(`should output DOM with is-Indeterminate class`, (done) => {
      const state = assign({}, defaultState, {indeterminate: true})
      const state$ = Observable.just(state)
      const dom$ = view({state$})
      dom$.subscribe(vNode => {
        expect(vNode).to.look.exactly.like(
          div(`.molecule-Progress.is-Indeterminate`, {
            attributes: {
              'aria-valuenow': state.value,
              'aria-valuemin': state.min,
              'aria-valuemax': state.max,
              role: `progressbar`,
            },
          }, [
            div(`.molecule-Progress_container`, [
              div(`.molecule-Progress_secondaryProgress.atom-Layout--fit`, {
                attributes: {
                  style: `-webkit-transform: scaleX(0); transform: scaleX(0);`,
                },
                hidden: true,
              }),
              div(`.molecule-Progress_primaryProgress.atom-Layout--fit`, {
                attributes: {
                  style: `-webkit-transform: scaleX(0); transform: scaleX(0);`,
                },
              }),
            ]),
          ])
        )
        done()
      })
    })

    it(`should output DOM with transformed progress`, (done) => {
      const state = assign({}, defaultState, {
        ratio: 30,
        secondaryProgress: 10,
        secondaryRatio: 10,
        value: 30,
      })
      const state$ = Observable.just(state)
      const dom$ = view({state$})
      dom$.subscribe(vNode => {
        expect(vNode).to.look.exactly.like(
          div(`.molecule-Progress`, {
            attributes: {
              'aria-valuenow': state.value,
              'aria-valuemin': state.min,
              'aria-valuemax': state.max,
              role: `progressbar`,
            },
          }, [
            div(`.molecule-Progress_container`, [
              div(`.molecule-Progress_secondaryProgress.atom-Layout--fit`, {
                attributes: {
                  style: `-webkit-transform: scaleX(0.1); transform: scaleX(0.1);`,
                },
              }),
              div(`.molecule-Progress_primaryProgress.atom-Layout--fit`, {
                attributes: {
                  style: `-webkit-transform: scaleX(0.3); transform: scaleX(0.3);`,
                },
              }),
            ]),
          ])
        )
        done()
      })
    })

    it(`should output DOM with is-Disabled class and disabled attribute`, (done) => {
      const state = assign({}, defaultState, {disabled: true})
      const state$ = Observable.just(state)
      const dom$ = view({state$})
      dom$.subscribe(vNode => {
        expect(vNode).to.look.exactly.like(
          div(`.molecule-Progress.is-Disabled`, {
            attributes: {
              'aria-valuenow': state.value,
              'aria-valuemin': state.min,
              'aria-valuemax': state.max,
              role: `progressbar`,
              'aria-disabled': true,
            },
            disabled: true,
          }, [
            div(`.molecule-Progress_container`, [
              div(`.molecule-Progress_secondaryProgress.atom-Layout--fit`, {
                attributes: {
                  style: `-webkit-transform: scaleX(0); transform: scaleX(0);`,
                },
                hidden: true,
              }),
              div(`.molecule-Progress_primaryProgress.atom-Layout--fit`, {
                attributes: {
                  style: `-webkit-transform: scaleX(0); transform: scaleX(0);`,
                },
              }),
            ]),
          ])
        )
        done()
      })
    })

    it(`should output DOM with custom class`, (done) => {
      const state = assign({}, defaultState, {className: `.custom-class`})
      const state$ = Observable.just(state)
      const dom$ = view({state$})
      dom$.subscribe(vNode => {
        expect(vNode).to.look.exactly.like(
          div(`.molecule-Progress.custom-class`, {
            attributes: {
              'aria-valuenow': state.value,
              'aria-valuemin': state.min,
              'aria-valuemax': state.max,
              role: `progressbar`,
            },
          }, [
            div(`.molecule-Progress_container`, [
              div(`.molecule-Progress_secondaryProgress.atom-Layout--fit`, {
                attributes: {
                  style: `-webkit-transform: scaleX(0); transform: scaleX(0);`,
                },
                hidden: true,
              }),
              div(`.molecule-Progress_primaryProgress.atom-Layout--fit`, {
                attributes: {
                  style: `-webkit-transform: scaleX(0); transform: scaleX(0);`,
                },
              }),
            ]),
          ])
        )
        done()
      })
    })
  })
})
