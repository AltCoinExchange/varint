// var Int64BE = require("int64-buffer").Int64BE;

module.exports = encode

var MSB = 0x80
  , REST = 0x7F
  , MSBALL = ~REST
  , INT = Math.pow(2, 31)

function encode(num, out, offset) {
  out = out || []
  offset = offset || 0
  var oldOffset = offset

  // var bigInt = new Int64BE(num << 1)
  // var buf = bigInt.toBuffer()
  // offset += buf.length
  while(num >= INT) {
    out[offset++] = (num & 0xFF) | MSB
    num /= 128
  }
  while(num & MSBALL) {
    out[offset++] = (num & 0xFF) | MSB
    num >>>= 7
  }
  out[offset] = num << 1 | 0
  
  encode.bytes = offset - oldOffset + 1
  
  return out
}
