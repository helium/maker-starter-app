import React, { memo, useState } from 'react'
import { useSolana } from '@helium/react-native-sdk'
import { useAsync } from 'react-async-hook'
import Box from '../../../components/Box'
import HotspotsEmpty from './HotspotsEmpty'
import Hotspots from './Hotspots'
import { getHotspots as getHeliumHotspots } from '../../../utils/appDataClient'
import { getAddress } from '../../../utils/secureAccount'
import { Hotspot } from './hotspotTypes'

// TODO: Implement paging and a loading screen before initial hotspots are fetched
const HotspotsScreen = () => {
  const [hotspots, setHotspots] = useState<Hotspot[]>([])
  const { status, getHotspots: getSolHotspots } = useSolana()

  useAsync(async () => {
    const heliumAddress = await getAddress()
    if (!heliumAddress) {
      // TODO: Handle Error
      return
    }

    if (status.isHelium) {
      const nextHotspots = await getHeliumHotspots(heliumAddress)
      setHotspots(nextHotspots)
      return
    }

    if (status.isSolana) {
      const solHotspots = await getSolHotspots({ heliumAddress })
      const nextHotspots = solHotspots?.map((h) => {
        const address = h.content.json_uri.split('/').slice(-1)[0]
        return { address, ...h }
      })

      setHotspots(nextHotspots || [])

      return
    }
    if (status.inProgress) {
      // eslint-disable-next-line no-console
      console.error('Blockchain transition in progress')
    }
  }, [getSolHotspots, status])

  return (
    <Box backgroundColor="primaryBackground" flex={1}>
      {hotspots.length === 0 ? (
        <HotspotsEmpty />
      ) : (
        <Hotspots hotspots={hotspots} />
      )}
    </Box>
  )
}

export default memo(HotspotsScreen)
