
# at

  safe object access

## Installation

    $ component install threepointone/at

## API
```js 
var at = require('at').at;
var setAt = require('at').setAt;

var o = {a:
	{
		b:1
	}
};

console.log(at(o, 'a.b'));
// 1

console.log(at(o, 'a.b.c'));
//undefined

setAt(o, 'a.b.c.d.e', 'magic');

console.log(at(o, 'a.b.c.d'));
// { e:'magic' }

```

## Tests (pending)
install dependencies - 
```
npm install
```
then
```
npm test
```   

   

## License

  MIT
