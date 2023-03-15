import React, { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator, FlatList, StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AddIcon from '@assets/images/add.svg'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Text from '../../../components/Text'
import TouchableOpacityBox from '../../../components/TouchableOpacityBox'
import { HotspotNavigationProp } from './hotspotTypes'
import Box from '../../../components/Box'
import { useColors } from '../../../theme/themeHooks'
import { RootNavigationProp } from '../../../navigation/main/tabTypes'
import HotspotListItem from './HotspotListItem'

type Hotspot = {
  address: string
  lng?: number
  lat?: number
  location?: string
}
type Props = { hotspots: Hotspot[]; loading: boolean }
const Hotspots = ({ hotspots, loading }: Props) => {
  const { t } = useTranslation()
  const colors = useColors()
  const navigation = useNavigation<HotspotNavigationProp>()
  const rootNav = useNavigation<RootNavigationProp>()
  const { top } = useSafeAreaInsets()

  const handleNav = useCallback(
    (hotspot: Hotspot) => () => {
      navigation.navigate('HotspotScreen', { hotspot })
    },
    [navigation],
  )

  const addHotspot = useCallback(() => rootNav.push('HotspotSetup'), [rootNav])

  const renderItem = useCallback(
    // eslint-disable-next-line react/no-unused-prop-types
    ({ item }: { item: Hotspot }) => {
      return (
        <HotspotListItem address={item.address} onPress={handleNav(item)} />
      )
    },
    [handleNav],
  )

  const keyExtractor = useCallback((item: Hotspot) => {
    return item.address
  }, [])

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <FlatList
        stickyHeaderIndices={[0]}
        ListEmptyComponent={loading ? <ActivityIndicator /> : null}
        ListHeaderComponent={
          <Box
            backgroundColor="primaryBackground"
            flexDirection="row"
            width="100%"
            alignItems="center"
            justifyContent="center"
            style={{ paddingTop: top }}
          >
            <TouchableOpacityBox
              paddingVertical="l"
              paddingHorizontal="lx"
              onPress={addHotspot}
              disabled
              opacity={0}
            >
              <AddIcon color={colors.primaryText} />
            </TouchableOpacityBox>
            <Text color="primaryText" variant="h2" textAlign="center">
              {t('hotspots.title')}
            </Text>
            <TouchableOpacityBox
              paddingVertical="l"
              paddingHorizontal="lx"
              onPress={addHotspot}
            >
              <AddIcon color={colors.primaryText} />
            </TouchableOpacityBox>
          </Box>
        }
        data={hotspots}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </>
  )
}

export default memo(Hotspots)
