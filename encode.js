var Uint64BE = require("int64-buffer").Uint64BE;

module.exports = encode

// PutUvarint encodes a uint64 into buf and returns the number of bytes written.
// If the buffer is too small, PutUvarint will panic.
function PutUvarint(buf, x) {
  var i = 0
  for (;x.toNumber() >= 0x80;) {
    buf[i] = x.toBuffer()[7] | 0x80;
    x = new Uint64BE(x >>= 7)
    i++
  }
  buf[i] = x.toBuffer()[7]
  return i + 1
}

// PutVarint encodes an int64 into buf and returns the number of bytes written.
function PutVarint(buf, x) {
  if (x < 0) {
    x = x ^ x
  }
  var ux =  new Uint64BE(x << 1)
  return PutUvarint(buf, ux)
}

function encode(num, out, offset) {
  out = out || []
  offset = offset || 0
  var oldOffset = offset
  encode.bytes = PutVarint(out, num);
  return out
}
