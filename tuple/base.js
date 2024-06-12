const checkType = (expectedType) => (value) => {
  if (typeof expectedType === 'string') {
    if (typeof value !== expectedType) {
      throw new TypeError(
        `Expected type ${expectedType} but got ${typeof value}`
      )
    }
  } else if (expectedType instanceof Function) {
    if (!(value instanceof expectedType)) {
      throw new TypeError(
        `Expected instance of ${expectedType.name} but got ${value.constructor.name}`
      )
    }
  } else {
    throw new TypeError('Type not supported')
  }
  return value
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

// Пример использования
const Person = Tuple('string', 'number')

const person = new Person('Alice', 30)

try {
  const invalidPerson = new Person('Alice', '30') // Ошибка: Expected type number but got string
} catch (e) {
  console.error(e.message)
}
