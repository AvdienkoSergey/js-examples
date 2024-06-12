var circleFns = function () {
  this.area = function () {
    return Math.PI * this.radius * this.radius
  }
  this.grow = function () {
    this.radius++
  }
  this.shrink = function () {
    this.radius--
  }
  return this
}

var RoundButton = function (radius, label) {
  this.radius = radius
  this.label = label
}

circleFns.call(RoundButton.prototype)

/* 
  Стратегия с функциями так же позволяет параметризовать заимствованное 
  поведение — путем передачи аргумента опций 
*/

var fnWithOptions = function (options) {
  this.draw = function () {
    return `Кнопка "${this.label}": ${options.background} цвета, с ${options.border} окантовкой`
  }
  return this
}

fnWithOptions.call(RoundButton.prototype, {
  background: 'зеленого',
  border: 'красной',
})

/* Возможность кеширования люто влияет на производительность */
casheFn = (function () {
  function say() {
    return `Кнопка "${this.label}" делает ....`
  }
  return function () {
    this.say = say
    return this
  }
})()

casheFn.call(RoundButton.prototype)

/* 
  Компромис с кешированием лишает нас возможности кастомизации с помощью параметров 
  Можно решить проблему с помощью каррирования 
*/

/**
 * Позволяет создать частично примененную функцию
 * @returns
 */
Function.prototype.curry = function () {
  /**
   * Сохраняет текущую функцию (this указывает на функцию, на которую был вызван curry).
   */
  var fn = this
  /**
   * Преобразует переданные аргументы в массив
   * Так как arguments массивоподобный объект то преобразуем его к настоящему массиву
   */
  var args = Array.prototype.slice.call(arguments, 0)
  /**
   * Возвращает новую функцию, которая
   * Преобразует свои аргументы в массив и объединяет их с args
   * Вызывает fn с этими аргументами, используя fn.apply
   */
  return function () {
    return fn.apply(this, args.concat(Array.prototype.slice.call(arguments, 0)))
  }
}

/**
 * Демонстрирует, как использовать curry для создания метода объекта с частично примененными аргументами.
 */
var hackFn = (function () {
  function sayWithParams(doThis) {
    return `Кнопка "${this.label}" делает ${doThis}`
  }
  return function (params) {
    this.sayWithParams = sayWithParams.curry(params['doThis'])
    return this
  }
})()

hackFn.call(RoundButton.prototype, { doThis: 'грязные хаки' })

var button = new RoundButton(5, 'Совсем не простая кнопка')
console.log(button, 'Площадь кнопки: ', button.area())
console.log(button.draw())
console.log(button.say())
console.log(button.sayWithParams())
