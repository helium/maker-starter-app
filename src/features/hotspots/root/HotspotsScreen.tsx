import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { useNavigation } from '@react-navigation/native'
import AddIcon from '@assets/images/add.svg'
import { useSelector } from 'react-redux'
import { useAnalytics } from '@segment/analytics-react-native'
import { Hotspot } from '@helium/http'
import Box from '../../../components/Box'
import { RootNavigationProp } from '../../../navigation/main/tabTypes'
import CircularButton from '../../../components/CircularButton'
import HotspotsList from './HotspotsList'
import { RootState } from '../../../store/rootReducer'
import { isHotspot } from '../../../utils/hotspotUtils'
import useMount from '../../../utils/useMount'
import { fetchHotspotsData } from '../../../store/hotspots/hotspotsSlice'
import { useAppDispatch } from '../../../store/store'
import { getAddress } from '../../../utils/secureAccount'

const HotspotsScreen = () => {
  const navigation = useNavigation<RootNavigationProp>()

  const dispatch = useAppDispatch()

  const hotspots = useSelector((state: RootState) => state.hotspots.hotspots)

  useMount(() => {
    dispatch(fetchHotspotsData())
  })

  const addHotspot = useCallback(() => navigation.push('HotspotSetup'), [
    navigation,
  ])

  const hasHotspots = useMemo(() => !!hotspots.data?.length, [
    hotspots.data?.length,
  ])

  const handlePresentHotspot = useCallback(async (gateway: Hotspot) => {
    if (!isHotspot(gateway)) {
    }
  }, [])

  // Set segment identity
  const { identify } = useAnalytics()
  const [address, setAddress] = useState<string>()

  const [identified, setIdentified] = useState(false)

  useMount(() => {
    getAddress().then(setAddress)
  })

  useEffect(() => {
    if (address && !identified) {
      identify(address)

      setIdentified(true)
    }
  }, [address, identified, identify])

  return (
    <Box backgroundColor="primaryBackground" flex={1}>
      <BottomSheetModalProvider>
        <Box
          padding="l"
          flex={1}
          justifyContent="center"
          backgroundColor="primaryBackground"
          style={{
            flexDirection: 'column',
          }}
        >
          <Box style={{ flex: 1.8 }} justifyContent="center">
            <CircularButton
              onPress={addHotspot}
              height={90}
              margin="l"
              mode="contained"
              Icon={AddIcon}
              marginBottom="l"
            />
          </Box>

          <Box style={{ flex: 3 }}>
            <HotspotsList
              onSelectHotspot={handlePresentHotspot}
              visible={hasHotspots}
            />
          </Box>
        </Box>
      </BottomSheetModalProvider>
    </Box>
  )
}

export default memo(HotspotsScreen)
