var names = [
  'alonzo church',
  'Haskell curry',
  'stephen_kleene',
  'Jon Van Ho',
  'stephen_kleene',
]

const opposite =
  (func) =>
  (...args) =>
    !func.apply(null, [...args])
const isEmpty = (value) => value === undefined || value === null
const isNotEmpty = opposite(isEmpty)
const clearUnnecessary = (value) => value.replace(/_/, ' ').split(' ')
const startCase = (value) =>
  value
    .slice(' ')
    .map((v) => `${v.charAt(0).toUpperCase()}${v.slice(1)}`)
    .join(' ')
const executeUniq = (arr) => new Set(arr).values()
const toArray = (collection) => Array.from(collection)

console.log(
  toArray(
    executeUniq(
      names
        .filter((name) => isNotEmpty(name))
        .map((name) => clearUnnecessary(name))
        .map((name) => startCase(name))
        .sort()
    )
  )
)
