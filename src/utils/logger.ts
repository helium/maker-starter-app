/* eslint-disable no-console */
import * as Sentry from '@sentry/react-native'

export const prettyPrintToConsole = (whatever: unknown, prefix = '') => {
  console.log(`${prefix}\n${JSON.stringify(whatever, null, 2)}`)
}

export const setUser = (userAddress: string) => {
  if (__DEV__) return
  Sentry.setUser({ username: userAddress })
}

export const error = (e: unknown) => {
  if (__DEV__) {
    console.error(e)
  }
  Sentry.captureException(e)
}

export const breadcrumb = (message: string, data?: Sentry.Breadcrumb) => {
  const crumb = {
    message,
    data,
  }
  if (__DEV__) {
    if (data) {
      prettyPrintToConsole(crumb)
    } else {
      console.log(message)
    }
  }

  Sentry.addBreadcrumb(crumb)
}
