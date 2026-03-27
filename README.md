# devtools-kit

A zero-dependency developer toolkit for Node.js. 9 essential utilities that work offline — JSON formatting, Base64, JWT decoding, hashing, UUID generation, regex testing, URL encoding, timestamp conversion, and text diffing.

## Install

```bash
npm install devtools-kit
```

## Quick Start

```js
const { jsonFormat, sha256, uuidV4, jwtDecode, base64Encode } = require('devtools-kit');

// Format JSON
const { result } = jsonFormat('{"name":"devtools-kit","version":"1.0.0"}');
console.log(result);

// Hash a string
console.log(sha256('hello world'));

// Generate a UUID
console.log(uuidV4());
```

## API Reference

### JSON

```js
const { jsonFormat, jsonMinify, jsonValidate } = require('devtools-kit');

jsonFormat('{"b":1,"a":2}', { indent: 4, sortKeys: true });
// => { result: '{\n    "a": 2,\n    "b": 1\n}', valid: true }

jsonMinify('{ "a" : 1 }');
// => { result: '{"a":1}', valid: true }

jsonValidate('{"valid": true}'); // => true
jsonValidate('{bad}');           // => false
```

### Base64

```js
const { base64Encode, base64Decode } = require('devtools-kit');

base64Encode('Hello, World!'); // => 'SGVsbG8sIFdvcmxkIQ=='
base64Decode('SGVsbG8sIFdvcmxkIQ=='); // => 'Hello, World!'
```

### JWT Decoder

```js
const { jwtDecode } = require('devtools-kit');

const { header, payload, signature } = jwtDecode('eyJhbGciOi...');
// header  => { alg: 'HS256', typ: 'JWT' }
// payload => { sub: '1234567890', name: 'John Doe', iat: 1516239022 }
```

### Hash Generation

```js
const { hash, md5, sha1, sha256, sha512 } = require('devtools-kit');

sha256('hello');      // => '2cf24dba5fb0a30e...'
md5('hello');         // => '5d41402abc4b2a76...'
hash('hello', 'sha512'); // specify algorithm
```

Supported algorithms: `md5`, `sha1`, `sha256`, `sha512`

### UUID Generation

```js
const { uuidV4, uuidV1, uuidGenerate } = require('devtools-kit');

uuidV4();  // => 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
uuidV1();  // => time-based UUID

uuidGenerate({ version: '4', count: 5 }); // => array of 5 UUIDs
```

### Regex Tester

```js
const { regexTest } = require('devtools-kit');

const result = regexTest('(\\d+)', 'abc 123 def 456', 'g');
// => {
//   matches: [
//     { match: '123', start: 4, end: 7, groups: ['123'] },
//     { match: '456', start: 12, end: 15, groups: ['456'] }
//   ],
//   count: 2,
//   valid: true
// }
```

### URL Encoding

```js
const { urlEncode, urlDecode } = require('devtools-kit');

urlEncode('hello world&foo=bar'); // => 'hello%20world%26foo%3Dbar'
urlDecode('hello%20world');        // => 'hello world'
```

### Timestamp Converter

```js
const { timestampConvert, nowTimestamp } = require('devtools-kit');

timestampConvert(1700000000);
// => { utc: '2023-11-14 22:13:20 UTC', iso: '...', unix: 1700000000, unixMs: 1700000000000 }

// Auto-detects milliseconds
timestampConvert(1700000000000); // same result

nowTimestamp(); // current time in all formats
```

### Text Diff

```js
const { textDiff } = require('devtools-kit');

const diff = textDiff('line1\nline2\nline3', 'line1\nmodified\nline3');
// Returns unified diff format
```

## TypeScript

Full TypeScript support with exported types:

```ts
import { jsonFormat, JsonResult, HashAlgorithm, RegexResult } from 'devtools-kit';
```

## License

MIT
