/**
 * Объект примесь
 */
var circleFns = {
  area: function () {
    return Math.PI * this.radius * this.radius
  },
  grow: function () {
    this.radius++
  },
  shrink: function () {
    this.radius--
  },
}

/**
 * Позволяет примешать Oбъект-примесь к целевому объекту
 * @param {*} destination
 * @param {*} source
 * @returns
 */
function extend(destination, source) {
  for (var k in source) {
    if (source.hasOwnProperty(k)) {
      destination[k] = source[k]
    }
  }
  return destination
}

/**
 * Создание объекта с примесью
 * @param {*} radius
 * @param {*} label
 */
var RoundButton = function (radius, label) {
  this.radius = radius
  this.label = label
}

extend(RoundButton.prototype, circleFns)
// extend(RoundButton.prototype, buttonFns)

const button = new RoundButton(5, 'Кнопка')
console.log(button, 'Площадь кнопки: ', button.area())
