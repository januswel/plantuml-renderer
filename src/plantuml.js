const zlib = require('zlib')
const Base64 = require('./base64')

const PlantUML = {
  encode: src => Base64.encode(zlib.deflateRawSync(src)),
}

module.exports = PlantUML
