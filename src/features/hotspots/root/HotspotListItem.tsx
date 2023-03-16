import React, { memo, useEffect, useMemo } from 'react'
import animalName from 'angry-purple-tiger'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Text from '../../../components/Text'
import TouchableOpacityBox from '../../../components/TouchableOpacityBox'
import Chevron from '../../../assets/images/chevron-right.svg'
import { useColors } from '../../../theme/themeHooks'
import Fade from '../../../components/Fade'
import useHotspot from '../../../store/hotspot/useHotspot'
import Box from '../../../components/Box'
import { useAppDispatch } from '../../../store/store'
import { getGeocodedAddress } from '../../../store/location/locationSlice'
import { RootState } from '../../../store/rootReducer'
import formatLocationName from '../../../utils/formatLocationName'

type Props = { onPress: () => void; address: string }
const HotspotListItem = ({ onPress, address }: Props) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const colors = useColors()
  const { hotspotDetails } = useHotspot(address, { fetchOnMount: true })
  const locations = useSelector((state: RootState) => state.location.locations)

  useEffect(() => {
    if (
      !hotspotDetails?.location ||
      !hotspotDetails?.lat ||
      !hotspotDetails?.lng
    ) {
      return
    }
    dispatch(
      getGeocodedAddress({
        lat: hotspotDetails.lat,
        lng: hotspotDetails.lng,
        location: hotspotDetails.location,
      }),
    )
  }, [dispatch, hotspotDetails])

  const locationName = useMemo(() => {
    if (hotspotDetails?.location && locations[hotspotDetails.location]) {
      const loc = locations[hotspotDetails.location]
      return formatLocationName(loc)
    }
    return t('hotspots.noLocation')
  }, [hotspotDetails, locations, t])

  return (
    <Fade>
      <TouchableOpacityBox
        padding="l"
        backgroundColor="secondaryBackground"
        flexDirection="row"
        alignItems="center"
        borderBottomColor="white"
        borderBottomWidth={2}
        onPress={onPress}
      >
        <Box flex={1}>
          <Text variant="body1" color="primaryText">
            {animalName(address)}
          </Text>
          <Text variant="body3" color="secondaryText">
            {locationName}
          </Text>
        </Box>
        <Chevron color={colors.graySteel} />
      </TouchableOpacityBox>
    </Fade>
  )
}

export default memo(HotspotListItem)
