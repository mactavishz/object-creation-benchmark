
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

new Benchmark.Suite()
  .add('Function#new', () => {
    createObject(proto)
  })
  .add('Object#create', () => {
    Object.create(proto)
  })
  .on('cycle', function(event) {
    const description = String(event.target)
    const p = document.createElement('p')
    p.innerHTML = description
    document.body.appendChild(p)
  })
  .on('complete', function() {
    const result = 'Fastest is ' + this.filter('fastest').map('name')
    document.body.innerHTML += `
      <strong><p>${result}</p></strong>
    `
    document.querySelector('#status').innerText = 'Completed'
  })
  .run({ 'async': true })