'use strict'
import Config from '../src/config'

describe('Config', () => {
  it('should set test settings, and get right result', () => {
    let config = new Config({
      test: 'test1'
    })

    expect(config.get('test')).toEqual('test1')
  })

  it('should set setting object', () => {
    let config = new Config()
    config.settings({
      name: 'Doc Brown',
      occupation: 'Weather Man'
    })

    expect(config.get('name')).toEqual('Doc Brown')
    expect(config.get('occupation')).toEqual('Weather Man')
  })

  it('should get null setting', () => {
    let config = new Config(null)
    expect(config.get('name')).toEqual(null)
    expect(config.get('occupation')).toEqual(null)
  })

  it('should set/get single setting', () => {
    let config = new Config(null)
    config.set('name', 'Doc Brown')
    config.set('occupation', 'Weather Man')

    expect(config.get('name')).toEqual('Doc Brown')
    expect(config.get('occupation')).toEqual('Weather Man')
  })

  it('should init w/ given config settings', () => {
    let config = new Config({
      name: 'Doc Brown',
      occupation: 'Weather Man'
    })
    expect(config.get('name')).toEqual('Doc Brown')
    expect(config.get('occupation')).toEqual('Weather Man')
  })

  it('should get a fallback value', () => {
    let config = new Config({
      name: 'Doc Brown'
    })
    expect(config.get('name', 'Marty')).toEqual('Doc Brown')
    expect(config.get('occupation', 'Weather Man')).toEqual('Weather Man')
  })

  it('should get a boolean value with a boolean config value', () => {
    let config = new Config({
      key1: true,
      key2: false
    })
    expect(config.getBoolean('key1')).toEqual(true)
    expect(config.getBoolean('key2')).toEqual(false)
  })

  it('should get a boolean value with a string config value', () => {
    let config = new Config({
      key1: 'true',
      key2: 'false',
      key3: 'whatever'
    })
    expect(config.getBoolean('key1')).toEqual(true)
    expect(config.getBoolean('key2')).toEqual(false)
    expect(config.getBoolean('key3')).toEqual(false)
    expect(config.getBoolean('key4')).toEqual(false)
    expect(config.getBoolean('key5', true)).toEqual(true)
  })

  it('should get a boolean value with a number config value', () => {
    let config = new Config({
      key1: 0,
      key2: 1,
      key3: 'whatever'
    })
    expect(config.getBoolean('key1')).toEqual(false)
    expect(config.getBoolean('key2')).toEqual(true)
  })

  it('should get a number value with a number config value', () => {
    let config = new Config({
      key: 6
    })
    expect(config.getNumber('key')).toEqual(6)
  })

  it('should get a number value with a string config value', () => {
    let config = new Config({
      key: '6',
      numThenString: '6baymax',
      stringThenNum: 'baymax6'
    })
    expect(config.getNumber('key', 5)).toEqual(6)
    expect(config.getNumber('numThenString', 4)).toEqual(6)
    expect(isNaN(config.getNumber('stringThenNum'))).toEqual(true)
  })

  it('should get a number NaN value with a NaN config value', () => {
    let config = new Config({
      allString: 'allstring',
      imNull: null,
      imUndefined: undefined
    })
    expect(isNaN(config.getNumber('notfound'))).toEqual(true)
    expect(isNaN(config.getNumber('allString'))).toEqual(true)
    expect(isNaN(config.getNumber('imNull'))).toEqual(true)
    expect(isNaN(config.getNumber('imUndefined'))).toEqual(true)
  })

  it('should get a number fallback value with a NaN config value', () => {
    let config = new Config({
      allString: 'allstring',
      imNull: null,
      imUndefined: undefined
    })
    expect(config.getNumber('notfound', 6)).toEqual(6)
    expect(config.getNumber('allString', 6)).toEqual(6)
    expect(config.getNumber('imNull', 6)).toEqual(6)
    expect(config.getNumber('imUndefined', 6)).toEqual(6)
  })

  it('should get settings object', () => {
    let config = new Config({
      name: 'Doc Brown',
      occupation: 'Weather Man'
    })

    expect(config.settings()).toEqual({
      name: 'Doc Brown',
      occupation: 'Weather Man'
    })
  })

  it('should create default config w/ bad settings value', () => {
    let config = new Config(null)
    expect(config.settings()).toEqual({})
  })

  it('should throw error when get undefined value', () => {
    let config = new Config(null)
    expect(config.get).toThrow(Error)
  })

  it('should throw error when set undefined key or value', () => {
    let config = new Config(null)
    let tmpKeyFn = () => {
      config.set(undefined, 'value')
    }
    let tmpValueFn = () => {
      config.set('value', undefined)
    }
    expect(tmpKeyFn).toThrow(Error)
    expect(tmpValueFn).toThrow(Error)
  })

  it('should create default config w/ bad settings value', () => {
    let config = new Config({
      testNum: 2,
      testFn: function(this: Config) {
        return `testFnReturnValue+${this.get('testNum')}`
      }
    })
    expect(config.getNumber('testNum')).toEqual(2)
    expect(config.get('testFn')).toEqual('testFnReturnValue+2')
  })
})
