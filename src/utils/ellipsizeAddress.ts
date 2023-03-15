type EllipsizeOpts = {
  numChars?: number
}

const ellipsizeAddress = (address: string, options?: EllipsizeOpts) => {
  const numChars = options?.numChars || 8
  return [address.slice(0, numChars), address.slice(-numChars)].join('...')
}

export default ellipsizeAddress
