'use strict'

const isFunction = (val: any) => typeof val === 'function'
const isUndefined = (val: any) => typeof val === 'undefined'
const isObject = (val: any) => typeof val === 'object'
const isArray = Array.isArray

/**
 * @name Config
 * @description
 * The Config lets you configure your entire app.
 */
export default class Config {
  private _c: any = {} // catch
  private _s: any = {} // setting

  constructor(config?: any) {
    this._s = config && isObject(config) && !isArray(config) ? config : {}
  }

  /**
   * @name get
   * @description
   * Returns a single config value, given a key.
   *
   * @param {string} [key] - the key for the config value
   * @param {any} [fallbackValue] - a fallback value to use when the config
   * value was not found, or is config value is `null`. Fallback value
   *  defaults to `null`.
   *  @return {any}
   */
  get(key?: string, fallbackValue: any = null): any {
    if (isUndefined(key)) {
      throw new Error('[config:get()] config key is not defined')
    }

    if (isUndefined(this._c[key as string])) {
      let userDefaultValue: any = this._s[key as string]

      // cache the value
      this._c[key as string] = isUndefined(userDefaultValue) ? null : userDefaultValue
    }

    let rtnVal: any = this._c[key as string]
    if (isFunction(rtnVal)) {
      rtnVal = rtnVal.call(this, this)
    }

    return rtnVal !== null ? rtnVal : fallbackValue
  }

  /**
   * @name getBoolean
   * @description
   * Same as `get()`, however always returns a boolean value. If the
   * value from `get()` is `null`, then it'll return the `fallbackValue`
   * which defaults to `false`. Otherwise, `getBoolean()` will return
   * if the config value is truthy or not. It also returns `true` if
   * the config value was the string value `"true"`.
   * @param {string} [key] - the key for the config value
   * @param {boolean} [fallbackValue] - a fallback value to use when the config
   * value was `null`. Fallback value defaults to `false`.
   * @return {boolean}
   */
  getBoolean(key: string, fallbackValue: boolean = false): boolean {
    const val = this.get(key)
    if (val === null) {
      return fallbackValue
    }
    if (typeof val === 'string') {
      return val === 'true'
    }
    return !!val
  }

  /**
   * @name getNumber
   * @description
   * Same as `get()`, however always returns a number value. Uses `parseFloat()`
   * on the value received from `get()`. If the result from the parse is `NaN`,
   * then it will return the value passed to `fallbackValue`. If no fallback
   * value was provided then it'll default to returning `NaN` when the result
   * is not a valid number.
   * @param {string} [key] - the key for the config value
   * @param {number} [fallbackValue] - a fallback value to use when the config
   * value turned out to be `NaN`. Fallback value defaults to `NaN`.
   * @return {number}
   */
  getNumber(key: string, fallbackValue: number = NaN): number {
    const val = parseFloat(this.get(key))
    return isNaN(val) ? fallbackValue : val
  }

  /**
   * @name set
   * @description
   * Sets a single config value.
   *
   * @param {string} [key] - The key used to look up the value at a later point in time.
   * @param {string} [value] - The config value being stored.
   */
  set(key?: string, value?: string) {
    if (isUndefined(key) || isUndefined(value)) {
      throw new Error('[config:set()] key or value is not defined')
    }
    this._s[key as string] = value
    delete this._c[key as string] // clear cache
    return this
  }

  /**
   * @name settings()
   * @description
   * Get or set(reset) all configs.
   */
  settings(...args: Object[]) {
    switch (args.length) {
      case 0:
        return this._s
      case 1:
        // settings({...})
        this._s = args[0]
        this._c = {} // clear cache
        break
    }

    return this
  }
}
