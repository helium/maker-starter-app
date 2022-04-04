import React, { memo, useCallback, useMemo } from 'react'
import { Hotspot } from '@helium/http'
import animalName from 'angry-purple-tiger'
import { useTranslation } from 'react-i18next'
import LocationIcon from '@assets/images/location-icon.svg'
import Balance, { NetworkTokens } from '@helium/currency'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { Pressable } from 'react-native'
import Box from './Box'
import Text from './Text'
import { isDataOnly, isRelay } from '../utils/hotspotUtils'
import { useColors } from '../theme/themeHooks'
import Signal from '../assets/images/signal.svg'
import VisibilityOff from '../assets/images/visibility_off.svg'
import HotspotMenuSheet from './HotspotMenuSheet'

type HotspotListItemProps = {
  onPress?: (hotspot: Hotspot) => void
  gateway: Hotspot
  totalReward?: Balance<NetworkTokens>
  showCarot?: boolean
  loading?: boolean
  showAddress?: boolean
  distanceAway?: string
  showRelayStatus?: boolean
  showAntennaDetails?: boolean
  pressable?: boolean
  hidden?: boolean
}

const HotspotListItem = ({
  onPress,
  gateway,
  totalReward,
  loading = false,
  showCarot = false,
  showAddress = true,
  showRelayStatus = false,
  showAntennaDetails = false,
  pressable = true,
  distanceAway,
  hidden,
}: HotspotListItemProps) => {
  const { t } = useTranslation()
  const colors = useColors()
  const handlePress = useCallback(() => onPress?.(gateway), [gateway, onPress])

  const locationText = useMemo(() => {
    const { geocode: geo } = gateway as Hotspot
    if (!geo || (!geo.longStreet && !geo.longCity && !geo.shortCountry)) {
      return t('hotspot_details.no_location_title')
    }
    return `${geo.longStreet}, ${geo.longCity}, ${geo.shortCountry}`
  }, [gateway, t])

  const isRelayed = useMemo(() => isRelay(gateway?.status?.listenAddrs), [
    gateway?.status,
  ])

  const statusBackgroundColor = useMemo(() => {
    if (hidden || isDataOnly(gateway)) return 'grayLightText'
    return gateway.status?.online === 'online' ? 'greenOnline' : 'yellow'
  }, [hidden, gateway])

  return (
    <Box marginBottom="xxs">
      <Pressable onPress={handlePress} disabled={!pressable}>
        {({ pressed }) => (
          <Box
            backgroundColor={
              pressed ? 'cardBackgroundSecondary' : 'cardBackground'
            }
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            padding="m"
            flex={1}
          >
            <Box flexDirection="column">
              <Box flexDirection="row" alignItems="center">
                <Box
                  height={10}
                  width={10}
                  borderRadius="m"
                  backgroundColor={statusBackgroundColor}
                />
                <Text
                  variant="body2Medium"
                  color={hidden ? 'grayLightText' : 'cardMainText'}
                  paddingStart="s"
                  paddingEnd="s"
                  ellipsizeMode="tail"
                  numberOfLines={2}
                  maxFontSizeMultiplier={1.2}
                  maxWidth={220}
                >
                  {animalName(gateway.address)}
                </Text>
                {hidden && <VisibilityOff height={10} width={10} />}
              </Box>
              {showAddress && (
                <Text
                  variant="body3Light"
                  color={hidden ? 'grayLightText' : 'cardSecondaryText'}
                  marginTop="s"
                  maxFontSizeMultiplier={1.2}
                >
                  {locationText}
                </Text>
              )}
              <Box flexDirection="row" alignItems="center" marginTop="s">
                {loading && !totalReward && (
                  <SkeletonPlaceholder speed={3000}>
                    <SkeletonPlaceholder.Item
                      height={15}
                      width={168.5}
                      borderRadius={4}
                    />
                  </SkeletonPlaceholder>
                )}
                {distanceAway !== undefined && (
                  <Box marginRight="s" flexDirection="row" alignItems="center">
                    <LocationIcon
                      color={colors.purpleMain}
                      width={10}
                      height={10}
                    />
                    <Text
                      color="grayText"
                      variant="regular"
                      fontSize={12}
                      marginLeft="xs"
                      maxFontSizeMultiplier={1.2}
                    >
                      {t('hotspot_details.distance_away', {
                        distance: distanceAway,
                      })}
                    </Text>
                  </Box>
                )}
                {showAntennaDetails && (
                  <Box marginLeft="s" flexDirection="row" alignItems="center">
                    <Signal width={10} height={10} color={colors.grayText} />
                    <Text
                      color="grayText"
                      variant="regular"
                      fontSize={12}
                      marginLeft="xs"
                      maxFontSizeMultiplier={1.2}
                    >
                      {t('generic.meters', {
                        distance: (gateway as Hotspot)?.elevation || 0,
                      })}
                    </Text>
                    {(gateway as Hotspot)?.gain !== undefined && (
                      <Text
                        color="grayText"
                        variant="regular"
                        fontSize={12}
                        marginLeft="xs"
                        maxFontSizeMultiplier={1.2}
                      >
                        {(((gateway as Hotspot).gain || 0) / 10).toFixed(1) +
                          t('antennas.onboarding.dbi')}
                      </Text>
                    )}
                  </Box>
                )}
                {showRelayStatus && isRelayed && (
                  <Text
                    color="grayText"
                    variant="regular"
                    fontSize={12}
                    marginLeft="s"
                    maxFontSizeMultiplier={1.2}
                  >
                    {t('hotspot_details.relayed')}
                  </Text>
                )}
              </Box>
            </Box>
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
            >
              {showCarot && (
                <Box marginStart="m">
                  <HotspotMenuSheet item={gateway} />
                </Box>
              )}
            </Box>
          </Box>
        )}
      </Pressable>
    </Box>
  )
}

export default memo(HotspotListItem)
