import React, { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, StatusBar } from 'react-native'
import animalName from 'angry-purple-tiger'
import { useNavigation } from '@react-navigation/native'
import AddIcon from '@assets/images/add.svg'
import Text from '../../../components/Text'
import TouchableOpacityBox from '../../../components/TouchableOpacityBox'
import Chevron from '../../../assets/images/chevron-right.svg'
import { HotspotNavigationProp } from './hotspotTypes'
import Box from '../../../components/Box'
import { useColors } from '../../../theme/themeHooks'
import { RootNavigationProp } from '../../../navigation/main/tabTypes'

type Hotspot = { address: string }
type Props = { hotspots: Hotspot[] }
const Hotspots = ({ hotspots }: Props) => {
  const { t } = useTranslation()
  const colors = useColors()
  const navigation = useNavigation<HotspotNavigationProp>()
  const rootNav = useNavigation<RootNavigationProp>()

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
    <>
      <StatusBar hidden />
      <FlatList
        ListHeaderComponent={
          <Box>
            <Box alignItems="flex-end">
              <TouchableOpacityBox
                paddingVertical="l"
                paddingHorizontal="lx"
                onPress={addHotspot}
              >
                <AddIcon color={colors.primaryText} />
              </TouchableOpacityBox>
            </Box>
            <Text variant="h1" textAlign="center" marginBottom="l">
              {t('hotspots.title')}
            </Text>
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
