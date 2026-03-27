const { describe, it } = require('node:test');
const assert = require('node:assert/strict');

// Tests run against the compiled dist/
const {
  jsonFormat, jsonMinify, jsonValidate,
  base64Encode, base64Decode,
  jwtDecode,
  hash, md5, sha256,
  uuidV4, uuidGenerate,
  regexTest,
  urlEncode, urlDecode,
  timestampConvert, nowTimestamp,
  textDiff,
} = require('../dist/index');

describe('JSON tools', () => {
  it('formats valid JSON', () => {
    const r = jsonFormat('{"b":1,"a":2}');
    assert.equal(r.valid, true);
    assert.ok(r.result.includes('\n'));
  });

  it('formats with sorted keys', () => {
    const r = jsonFormat('{"b":1,"a":2}', { sortKeys: true });
    assert.ok(r.result.indexOf('"a"') < r.result.indexOf('"b"'));
  });

  it('minifies JSON', () => {
    const r = jsonMinify('{ "a" : 1 }');
    assert.equal(r.result, '{"a":1}');
    assert.equal(r.valid, true);
  });

  it('returns valid=false for bad JSON', () => {
    const r = jsonFormat('{bad}');
    assert.equal(r.valid, false);
  });

  it('validates JSON', () => {
    assert.equal(jsonValidate('{"a":1}'), true);
    assert.equal(jsonValidate('{bad}'), false);
  });
});

describe('Base64', () => {
  it('encodes and decodes', () => {
    const encoded = base64Encode('Hello, World!');
    assert.equal(encoded, 'SGVsbG8sIFdvcmxkIQ==');
    assert.equal(base64Decode(encoded), 'Hello, World!');
  });
});

describe('JWT', () => {
  it('decodes a JWT token', () => {
    // Craft a simple JWT
    const header = Buffer.from('{"alg":"HS256","typ":"JWT"}').toString('base64url');
    const payload = Buffer.from('{"sub":"1234","name":"Test"}').toString('base64url');
    const token = `${header}.${payload}.fakesig`;
    const r = jwtDecode(token);
    assert.deepEqual(r.header, { alg: 'HS256', typ: 'JWT' });
    assert.equal(r.payload.sub, '1234');
    assert.equal(r.signature, 'fakesig');
  });

  it('throws on invalid JWT', () => {
    assert.throws(() => jwtDecode('not-a-jwt'), /Invalid JWT/);
  });
});

describe('Hash', () => {
  it('generates SHA256', () => {
    const h = sha256('hello');
    assert.equal(h, '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824');
  });

  it('generates MD5', () => {
    const h = md5('hello');
    assert.equal(h, '5d41402abc4b2a76b9719d911017c592');
  });

  it('supports algorithm parameter', () => {
    const h = hash('test', 'sha1');
    assert.equal(h.length, 40); // SHA1 = 40 hex chars
  });
});

describe('UUID', () => {
  it('generates valid v4 UUID', () => {
    const id = uuidV4();
    assert.match(id, /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
  });

  it('generates multiple UUIDs', () => {
    const ids = uuidGenerate({ count: 5 });
    assert.equal(ids.length, 5);
    assert.equal(new Set(ids).size, 5); // all unique
  });
});

describe('Regex', () => {
  it('finds matches', () => {
    const r = regexTest('\\d+', 'abc 123 def 456');
    assert.equal(r.valid, true);
    assert.equal(r.count, 2);
    assert.equal(r.matches[0].match, '123');
    assert.equal(r.matches[1].match, '456');
  });

  it('returns groups', () => {
    const r = regexTest('(\\w+)@(\\w+)', 'user@host');
    assert.equal(r.matches[0].groups[0], 'user');
    assert.equal(r.matches[0].groups[1], 'host');
  });

  it('handles invalid regex', () => {
    const r = regexTest('[invalid', 'test');
    assert.equal(r.valid, false);
    assert.ok(r.error);
  });
});

describe('URL', () => {
  it('encodes and decodes', () => {
    const encoded = urlEncode('hello world&foo=bar');
    assert.ok(!encoded.includes(' '));
    assert.ok(!encoded.includes('&'));
    assert.equal(urlDecode(encoded), 'hello world&foo=bar');
  });
});

describe('Timestamp', () => {
  it('converts unix seconds', () => {
    const r = timestampConvert(1700000000);
    assert.ok(r.utc.includes('2023'));
    assert.equal(r.unix, 1700000000);
    assert.equal(r.unixMs, 1700000000000);
  });

  it('auto-detects milliseconds', () => {
    const r = timestampConvert(1700000000000);
    assert.equal(r.unix, 1700000000);
  });

  it('nowTimestamp returns current time', () => {
    const r = nowTimestamp();
    assert.ok(r.unix > 1700000000);
  });
});

describe('Diff', () => {
  it('diffs two texts', () => {
    const r = textDiff('line1\nline2\nline3', 'line1\nmodified\nline3');
    assert.ok(r.includes('-line2'));
    assert.ok(r.includes('+modified'));
  });

  it('returns empty for identical texts', () => {
    assert.equal(textDiff('same', 'same'), '');
  });
});
