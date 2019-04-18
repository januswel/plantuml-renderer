#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const http = require('http')

const PlantUML = require('./plantuml')


const targetIsSpecified = () => 2 < process.argv.length
if (!targetIsSpecified) {
  console.error('specify file name')
}

const src = process.argv[2]

const srcData = fs.readFileSync(src)
const url = `http://localhost:13080/png/${PlantUML.encode(srcData)}`

const dst = path.basename(src, '.uml') + '.png'
var out = fs.createWriteStream(dst)

console.log(`requesting: ${url}`)
const request = http.get(url, response => {
  response.pipe(out)

  response.on('end', () => {
    out.close()
  })
}).on('error', error => {
  out.close()
  console.error(error)
})
