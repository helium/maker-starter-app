import React, { useEffect, useState } from 'react'

import { ActivityIndicatorCentered } from '../components/ActivityIndicator'
import { getAddress } from '../utils/secureAccount'

export function WithAccountAddress<T>(Component: React.FC<T>) {
  return function WithAccountAddressComponent(props: any) {
    const [address, setAddress] = useState<string>()

    useEffect(() => {
      getAddress().then(setAddress)
    }, [])

    return !address ? (
      <ActivityIndicatorCentered />
    ) : (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <Component {...props} accountAddress={address} />
    )
  }
}

export type WithAccountAddressProps = {
  accountAddress: string
}
