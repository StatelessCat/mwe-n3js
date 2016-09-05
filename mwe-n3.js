var N3 = require('n3')
const fs = require('fs')

const case1 = '@base <http://www.w3.org/ns/prov-dc#> .' // Error: Invalid base IRI
const case2 = '@base <http://www.w3.org/ns/prov-dc/> .' // OK

const n3jsTestCase = function (turtle, parser) {
  parser.parse(turtle, function (error, triple, prefixes) {
    if (error) {
      console.log(error)
    } else if (triple) {
      // console.log(triple.subject, triple.predicate, triple.object, '.')
    } else {
      console.log("# That's all, folks!", prefixes)
    }
  })
}

// case1
var parser = N3.Parser()
n3jsTestCase(case1, parser)

// case2
parser = N3.Parser()
n3jsTestCase(case2, parser)

// case3, loading PROV-O ontology («curled» from <http://www.w3.org/ns/prov#>)
parser = N3.Parser()
fs.readFile('./resources/prov-o.ttl', 'utf8', (err, case3) => {
  if (err) throw err
  n3jsTestCase(case3, parser) // Error: Invalid base IRI http://www.w3.org/ns/prov-dc# at line 1961.
})

