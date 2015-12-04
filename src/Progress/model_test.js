/**
 * @fileoverview Tests for Progress/model
 * @author Frederik Krautwald
 */

/* eslint max-nested-callbacks: 0, max-len: 0, no-unused-expressions: 0 */
/* global describe, it */

import chai from 'chai'
import model from './model'
import {Observable} from 'rx'

const expect = chai.expect

describe(`Progress`, () => {
  describe(`model`, () => {
    it(`should be a function`, () => {
      expect(model).to.be.a(`function`)
    })

    it(`should output an Observable<object>`, (done) => {
      const state$ = model({})
      expect(state$).to.respondTo(`subscribe`)
      state$.subscribe(state => {
        expect(state).to.be.an(`object`)
        done()
      })
    })

    describe(`state-object`, () => {
      it(`should have <number>secondaryProgress property`, (done) => {
        const propName = `secondaryProgress`
        const state$ = model({})
        state$.subscribe(state => {
          expect(state).to.have.ownProperty(propName)
          expect(state[propName]).to.be.a(`number`)
          expect(state[propName]).to.equal(0)
          done()
        })
      })

      it(`should have <number>secondaryRatio property`, (done) => {
        const propName = `secondaryRatio`
        const state$ = model({})
        state$.subscribe(state => {
          expect(state).to.have.ownProperty(propName)
          expect(state[propName]).to.be.a(`number`)
          expect(state[propName]).to.equal(0)
          done()
        })
      })

      it(`should have <boolean>indeterminate property`, (done) => {
        const propName = `indeterminate`
        const state$ = model({})
        state$.subscribe(state => {
          expect(state).to.have.ownProperty(propName)
          expect(state[propName]).to.be.a(`boolean`)
          expect(state[propName]).to.be.false
          done()
        })
      })

      it(`should have <boolean>disabled property`, (done) => {
        const propName = `disabled`
        const state$ = model({})
        state$.subscribe(state => {
          expect(state).to.have.ownProperty(propName)
          expect(state[propName]).to.be.a(`boolean`)
          expect(state[propName]).to.be.false
          done()
        })
      })

      it(`should have <number>max property`, (done) => {
        const propName = `max`
        const state$ = model({})
        state$.subscribe(state => {
          expect(state).to.have.ownProperty(propName)
          expect(state[propName]).to.be.a(`number`)
          expect(state[propName]).to.equal(100)
          done()
        })
      })

      it(`should have <number>min property`, (done) => {
        const propName = `min`
        const state$ = model({})
        state$.subscribe(state => {
          expect(state).to.have.ownProperty(propName)
          expect(state[propName]).to.be.a(`number`)
          expect(state[propName]).to.equal(0)
          done()
        })
      })

      it(`should have <number>ratio property`, (done) => {
        const propName = `ratio`
        const state$ = model({})
        state$.subscribe(state => {
          expect(state).to.have.ownProperty(propName)
          expect(state[propName]).to.be.a(`number`)
          expect(state[propName]).to.equal(0)
          done()
        })
      })

      it(`should have <number>step property`, (done) => {
        const propName = `step`
        const state$ = model({})
        state$.subscribe(state => {
          expect(state).to.have.ownProperty(propName)
          expect(state[propName]).to.be.a(`number`)
          expect(state[propName]).to.equal(1)
          done()
        })
      })

      it(`should have <number>className property`, (done) => {
        const propName = `className`
        const state$ = model({})
        state$.subscribe(state => {
          expect(state).to.have.ownProperty(propName)
          expect(state[propName]).to.be.a(`string`)
          expect(state[propName]).to.equal(``)
          done()
        })
      })

      it(`should have <number>value property`, (done) => {
        const propName = `value`
        const state$ = model({})
        state$.subscribe(state => {
          expect(state).to.have.ownProperty(propName)
          expect(state[propName]).to.be.a(`number`)
          expect(state[propName]).to.equal(0)
          done()
        })
      })

      it(`should get data from <Observable>props$`, (done) => {
        const props = {
          className: `.custom-class`,
          disabled: true,
          indeterminate: true,
          secondaryProgress: 37,
          max: 50,
          min: 20,
          step: 2,
          value: 35,
        }
        const props$ = Observable.just(props)
        const state$ = model({props$})
        state$.subscribe(state => {
          expect(state.className).to.equal(props.className)
          expect(state.disabled).to.equal(props.disabled)
          expect(state.indeterminate).to.equal(props.indeterminate)
          expect(state.secondaryProgress).to.equal(props.secondaryProgress)
          expect(state.max).to.equal(props.max)
          expect(state.min).to.equal(props.min)
          expect(state.step).to.equal(props.step)
          expect(state.value).to.equal(props.value)
          done()
        })
      })

      it(`should compute <number>secondaryRatio from <number>secondaryProgress`, (done) => {
        const props = {secondaryProgress: 10}
        const props$ = Observable.just(props)
        const state$ = model({props$})
        state$.subscribe(state => {
          expect(state.secondaryRatio).to.equal(props.secondaryProgress)
          done()
        })
      })
    })
  })
})
