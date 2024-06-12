var names = [
  'alonzo church',
  'Haskell curry',
  'stephen_kleene',
  'Jon Van Ho',
  'stephen_kleene',
]

var result = []
for (let i = 0; i < names.length; i++) {
  var n = names[i]
  if (n !== undefined && n !== null) {
    var ns = n.replace(/_/, ' ').split(' ')
    for (let j = 0; j < ns.length; j++) {
      var p = ns[j]
      p = p.charAt(0).toUpperCase() + p.slice(1)
      ns[j] = p
    }
    if (result.indexOf(ns.join(' ')) < 0) {
      result.push(ns.join(' '))
    }
  }
}

console.log(result.sort())
