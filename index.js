const suite = new (require('benchmark').Suite)()

function createObject (proto) {
  const F = function () {}
  F.prototype = proto
  return new F()
}

const proto = {
  name: 'Plain Object',
  log () {
    console.log(this.name)
  }
}

suite
  .add('Function#new', () => {
    createObject(proto)
  })
  .add('Object#create', () => {
    Object.create(proto)
  })
  .on('cycle', function(event) {
    const description = String(event.target)
    console.log(description)
  })
  .on('complete', function() {
    const result = 'Fastest is ' + this.filter('fastest').map('name')
    console.log(result)
  })
  .run({ 'async': true })
