import React, { memo, useCallback, useEffect, useState } from 'react'
import { Asset, useOnboarding } from '@helium/react-native-sdk'
import { Hotspot } from '@helium/http'
import { useNavigation } from '@react-navigation/native'
import Box from '../../../components/Box'
import HotspotsEmpty from './HotspotsEmpty'
import Hotspots from './Hotspots'
import { getAddress } from '../../../utils/secureAccount'
import { RootNavigationProp } from '../../../navigation/main/tabTypes'
import useDeveloperOptions from '../../../utils/useDeveloperOptions'

const getHotspotAddress = (item: Asset | Hotspot): string => {
  const asset = item as Asset
  if (asset?.content?.json_uri) {
    return asset.content.json_uri.split('/').slice(-1)[0]
  }

  const hotspot = item as Hotspot
  return hotspot.address
}

const HotspotsScreen = () => {
  const [hotspots, setHotspots] =
    useState<
      { address: string; lat?: number; lng?: number; location?: string }[]
    >()
  const nav = useNavigation<RootNavigationProp>()
  const { status, cluster } = useDeveloperOptions()

  const { getHotspots } = useOnboarding()

  const fetch = useCallback(async () => {
    const heliumAddress = await getAddress()
    if (!heliumAddress) {
      // TODO: Handle Error
      return
    }

    const nextHotspots = await getHotspots({
      heliumAddress,
    })

    if (!nextHotspots) return

    setHotspots(
      nextHotspots?.map((h) => ({ address: getHotspotAddress(h), ...h })),
    )
  }, [getHotspots])

  useEffect(() => {
    const unsubscribe = nav.addListener('focus', () => {
      fetch()
    })

    return unsubscribe
  }, [fetch, nav, status, cluster])

  return (
    <Box backgroundColor="primaryBackground" flex={1}>
      {hotspots !== undefined && hotspots.length === 0 ? (
        <HotspotsEmpty />
      ) : (
        <Hotspots hotspots={hotspots || []} loading={hotspots === undefined} />
      )}
    </Box>
  )
}

export default memo(HotspotsScreen)
