import React, { memo, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import animalName from 'angry-purple-tiger'
import { useNavigation } from '@react-navigation/native'
import Text from '../../../components/Text'
import TouchableOpacityBox from '../../../components/TouchableOpacityBox'
import Chevron from '../../../assets/images/chevron-right.svg'
import { Hotspot, HotspotNavigationProp } from './hotspotTypes'

type Props = { hotspots: Hotspot[] }
const Hotspots = ({ hotspots }: Props) => {
  const { t } = useTranslation()
  const { top } = useSafeAreaInsets()
  const navigation = useNavigation<HotspotNavigationProp>()

  const contentContainerStyle = useMemo(() => ({ paddingVertical: top }), [top])

  const handleNav = useCallback(
    (hotspot: Hotspot) => () => {
      navigation.navigate('HotspotScreen', { hotspot })
    },
    [navigation],
  )

  const renderItem = useCallback(
    // eslint-disable-next-line react/no-unused-prop-types
    ({ item }: { item: Hotspot }) => {
      return (
        <TouchableOpacityBox
          padding="l"
          backgroundColor="offWhite"
          flexDirection="row"
          alignItems="center"
          borderBottomColor="white"
          borderBottomWidth={2}
          onPress={handleNav(item)}
        >
          <Text variant="body1" flex={1}>
            {animalName(item.address)}
          </Text>
          <Chevron color="#C1CFEE" />
        </TouchableOpacityBox>
      )
    },
    [handleNav],
  )

  const keyExtractor = useCallback((item: Hotspot) => {
    return item.address
  }, [])

  return (
    <FlatList
      contentContainerStyle={contentContainerStyle}
      ListHeaderComponent={
        <Text variant="h1" textAlign="center" marginBottom="l">
          {t('hotspots.title')}
        </Text>
      }
      data={hotspots}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  )
}

export default memo(Hotspots)
