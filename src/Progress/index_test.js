/**
 * @fileoverview Tests for Progress
 * @author Frederik Krautwald
 */

/* eslint max-nested-callbacks: 0, max-len: 0, no-unused-expressions: 0 */
/* global describe, it */

import chai from 'chai'
import chaiVirtualDOMPlugin from 'chai-virtual-dom'
import isVirtualNode from 'virtual-dom/vnode/is-vnode'
import model from './model'
import Progress from './index'
import view from './view'
import {mockDOMSource} from '@cycle/dom'
import {Observable} from 'rx'

const expect = chai.expect
chai.use(chaiVirtualDOMPlugin)

describe(`Progress`, () => {
  it(`should be a function`, () => {
    expect(Progress).to.be.a(`function`)
  })

  it(`should output a sinks-object`, () => {
    const progress = Progress({})
    expect(progress).to.be.an(`object`)
  })

  describe(`sinks`, () => {
    describe(`DOM sink`, () => {
      it(`should be an Observable<VirtualNode>`, (done) => {
        const domSource = mockDOMSource()
        const {DOM} = Progress({DOM: domSource})
        expect(DOM).to.respondTo(`subscribe`)
        DOM.elementAt(0).subscribe(vNode => {
          expect(isVirtualNode(vNode)).to.be.true
          done()
        })
      })

      it(`should output view`, (done) => {
        const domSource = mockDOMSource()
        const {DOM, state$} = Progress({DOM: domSource})
        const viewDom$ = view({state$})
        viewDom$.combineLatest(
          DOM.elementAt(0),
          (viewDomVNode, domVNode) => ({viewDomVNode, domVNode})
        ).subscribe(vNodes => {
          expect(vNodes.domVNode).to.look.exactly.like(vNodes.viewDomVNode)
          done()
        })
      })
    })

    describe(`state$ sink`, () => {
      it(`should be an Observable<object>`, (done) => {
        const {state$} = Progress({})
        expect(state$).to.respondTo(`subscribe`)
        state$.subscribe(state => {
          expect(state).to.be.an(`object`)
          done()
        })
      })

      it(`should output model`, (done) => {
        const props = {
          isDisabled: true,
          secondaryProgress: 37,
          max: 50,
          min: 20,
          step: 2,
          value: 35,
        }
        const props$ = Observable.just(props)
        const {state$} = Progress({props$})
        const modelState$ = model({props$})
        modelState$
          .combineLatest(
          state$,
          (modelState, state) => ({modelState, state})
        )
          .subscribe(states => {
            expect(states.state).to.deep.equal(states.modelState)
          })
        done()
      })
    })
  })
})
