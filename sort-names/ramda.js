const R = require('ramda')

var names = [
  'alonzo church',
  'Haskell curry',
  'stephen_kleene',
  'Jon Van Ho',
  'stephen_kleene',
]

const isEmpty = R.either(R.isNil, R.isEmpty)
const isNotEmpty = R.complement(isEmpty)
const clearUnnecessary = R.pipe(R.replace(/_/, ' '), R.split(' '))
const capitalize = R.pipe(
  R.converge(R.concat, [R.pipe(R.head, R.toUpper), R.tail])
)
const startCase = R.pipe(R.map(capitalize), R.join(' '))
const executeUniq = R.pipe(R.uniq, R.values)

const processNames = R.pipe(
  R.filter(isNotEmpty),
  R.map(clearUnnecessary),
  R.map(startCase),
  R.sortBy(R.identity),
  executeUniq
)

console.log(processNames(names))
