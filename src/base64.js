const Base64 = {
  encode: src => {
    const fraction = src.length % 3
    const data = Buffer.alloc(src.length + fraction)
    src.copy(data)

    const converted = []
    for (i = 0; i < data.length; i += 3) {
      converted.push(convert(data[i], data[i + 1], data[i + 2]))
    }
    return converted.join('')
  },
}

/*
 * convert 3 bytes to 4 6bits
 *  b1        b2        b3
 *  xxxxxxxx  xxxxxxxx  xxxxxxxx
 *  ^^^^^^        ^^^^  ^^
 *        ^^  ^^^^        ^^^^^^
 *  c
 * */
const convert = (b1, b2, b3) => {
  return [
    b1 >> 2,
    ((b1 & 0x3) << 4) | (b2 >> 4),
    ((b2 & 0xF) << 2) | (b3 >> 6),
    b3 & 0x3F,
  ].map(c => c & 0x3f).map(encode6bit).join('')
}

const table = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split('')
const encode6bit = b => table[b]

module.exports = Base64
