import React, { memo, useCallback, useMemo } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import animalName from 'angry-purple-tiger'
import { useTranslation } from 'react-i18next'
import { HotspotStackParamList } from './hotspotTypes'
import Text from '../../../components/Text'
import SafeAreaBox from '../../../components/SafeAreaBox'
import Button from '../../../components/Button'
import { RootNavigationProp } from '../../../navigation/main/tabTypes'

type Route = RouteProp<HotspotStackParamList, 'HotspotScreen'>
const HotspotScreen = () => {
  const {
    params: { hotspot },
  } = useRoute<Route>()
  const { t } = useTranslation()
  const navigation = useNavigation<RootNavigationProp>()

  const formattedHotspotName = useMemo(() => {
    if (!hotspot || !hotspot.address) return ''

    const name = animalName(hotspot.address)
    const pieces = name.split(' ')
    if (pieces.length < 3) return name

    return [`${pieces[0]} ${pieces[1]}`, pieces[2]]
  }, [hotspot])

  const assertHotspot = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    navigation.navigate('HotspotAssert', {
      screen: 'HotspotSetupPickLocationScreen',
      params: { hotspotAddress: hotspot.address },
    })
  }, [hotspot.address, navigation])

  const transferHotspot = useCallback(
    () =>
      navigation.push('TransferHotspot', { hotspotAddress: hotspot.address }),
    [hotspot.address, navigation],
  )

  return (
    <SafeAreaBox
      backgroundColor="primaryBackground"
      flex={1}
      paddingHorizontal="l"
      justifyContent="center"
    >
      <Text
        fontSize={29}
        lineHeight={31}
        color="black"
        fontWeight="200"
        numberOfLines={1}
        width="100%"
        adjustsFontSizeToFit
      >
        {formattedHotspotName[0]}
      </Text>
      <Text
        variant="body1"
        fontSize={29}
        lineHeight={31}
        paddingRight="s"
        color="black"
        numberOfLines={1}
        adjustsFontSizeToFit
        marginBottom="l"
      >
        {formattedHotspotName[1]}
      </Text>

      <Button
        onPress={assertHotspot}
        height={48}
        marginTop="l"
        mode="contained"
        title={t('hotspots.empty.hotspots.assertLocation')}
      />
      <Button
        onPress={transferHotspot}
        height={48}
        marginTop="l"
        mode="contained"
        title={t('hotspots.empty.hotspots.transfer')}
      />
    </SafeAreaBox>
  )
}

export default memo(HotspotScreen)
