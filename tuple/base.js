const checkType = (typeDef) => (obj) => {
  const isType = (typeDef, obj) => {
    if (typeof typeDef === 'string') {
      return typeof obj === typeDef
    } else if (typeDef instanceof Function) {
      return obj instanceof typeDef || typeof obj === typeDef.name.toLowerCase()
    } else {
      throw new TypeError('Type not supported')
    }
  }

  if (!isType(typeDef, obj)) {
    let type = typeof obj
    throw new TypeError(
      `Type mismatch. Expected [${typeDef}] but found [${type}]`
    )
  }

  return obj
}

const autoCurry = (fn) => {
  const curried = (...args) => {
    if (args.length >= fn.length) {
      return fn.apply(null, args)
    } else {
      return (...moreArgs) => curried.apply(null, args.concat(moreArgs))
    }
  }
  return curried
}

const Tuple = function (/** Типы */) {
  const types = Array.prototype.slice.call(arguments, 0)

  /**
   * Отвечает за проверку типов и значений
   */
  const _T = function (/** Значения */) {
    const values = Array.prototype.slice.call(arguments, 0)

    /**
     * Гарантирует отсутствие пустых значений
     */
    if (values.some((val) => val === null || val === undefined)) {
      throw new ReferenceError('Tuples may not have any null values')
    }
    /**
     * Гарантирует совпадение количества аргументов
     */
    if (values.length !== types.length) {
      throw new ReferenceError('Tuple arity does not match its prototype')
    }

    values.map((val, index) => {
      this['_' + (index + 1)] = checkType(types[index])(val)
    }, this)

    Object.freeze(this)
  }

  _T.prototype.values = () => {
    return Object.keys(this).map((k) => this[k], this)
  }

  return _T
}

/** Пример 1 */
const Person = Tuple('string', 'number')

const person = new Person('Alice', 30)

try {
  const invalidPerson = new Person('Alice', '30') // Ошибка: Expected type number but got string
} catch (e) {
  console.error(e.message)
}

/** Пример 2 */
console.log(checkType(Date)(new Date()))

/** Пример 3 */
const curriedCheckType = autoCurry(checkType)
console.log(curriedCheckType(String)('Test'))

// Пример использования autoCurry для проверки трех типов
const checkThreeTypes = (type1, type2, type3, val1, val2, val3) => {
  curriedCheckType(type1)(val1)
  curriedCheckType(type2)(val2)
  curriedCheckType(type3)(val3)
  return [val1, val2, val3]
}

const checkTypes = autoCurry(checkThreeTypes)
try {
  console.log(checkTypes(String)(Number)(Boolean)('Test')(123)(true)) // ['Test', 123, true]
} catch (e) {
  console.error(e.message)
}

try {
  console.log(checkTypes(String)(Number)(Boolean)('Test')(123)('false')) // Ошибка: Expected [function Boolean] but found [string]
} catch (e) {
  console.error(e.message)
}
