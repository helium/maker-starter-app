import Config from 'react-native-config'
import { getWalletApiToken } from './secureAccount'

const makeRequest = async (url: string, opts: RequestInit) => {
  const token = await getWalletApiToken()
  if (!token) {
    throw new Error('no token')
  }

  const baseUrl = Config.WALLET_API_BASE_URL
  const route = [baseUrl, url].join('/')

  const response = await fetch(route, {
    ...opts,
    headers: {
      ...opts.headers,
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })

  if (!response.ok) {
    const errorMessage = `Bad response, status:${response.status} message:${response.statusText} ${opts.method} url:${route}`
    throw new Error(errorMessage)
  }

  const text = await response.text()
  try {
    const json = JSON.parse(text)
    const data = json.data || json
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    data.serverDate = response.headers.map?.date
    return data
  } catch (err) {
    return text
  }
}

export const postWallet = async (
  url: string,
  data?: unknown,
  { camelCase } = { camelCase: false },
) => {
  const opts = {
    method: 'POST',
    body: data ? JSON.stringify(data) : null,
  } as RequestInit
  if (camelCase) {
    opts.headers = { Accent: 'camel' }
  }

  return makeRequest(url, opts)
}
