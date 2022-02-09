function encode(str) {
  return Buffer.from('' + str, 'utf-8').toString('base64')
}

function decode(base64Str) {
  return Buffer.from('' + base64Str, 'base64').toString('utf-8')
}

export { encode, decode }
