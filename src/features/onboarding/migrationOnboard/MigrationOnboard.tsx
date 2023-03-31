import React, { memo, useCallback, useMemo, useState } from 'react'
import HeliumSolanaLogo from '@assets/images/heliumSolanaLogo.svg'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import Text from '../../../components/Text'
import SafeAreaBox from '../../../components/SafeAreaBox'
import Box from '../../../components/Box'
import Button from '../../../components/Button'
import { wp } from '../../../utils/layout'
import { useColors, useSpacing } from '../../../theme/themeHooks'
import { useAppDispatch } from '../../../store/store'
import appSlice from '../../../store/user/appSlice'
import TextTransform from '../../../components/TextTransform'

type Item = {
  index: number
}

const SolanaItem = () => {
  const { t } = useTranslation()
  return (
    <Box
      justifyContent="center"
      alignItems="center"
      paddingTop="xl"
      paddingHorizontal="l"
    >
      <Box height={200}>
        <HeliumSolanaLogo />
      </Box>
      <Text variant="h1" fontWeight="600" textAlign="center" fontSize={32}>
        {t('migrate.solana.title')}
      </Text>
      <Text
        variant="subtitle1"
        fontWeight="600"
        textAlign="center"
        color="primary"
        paddingVertical="l"
      >
        {t('migrate.solana.subtitle1')}
      </Text>
      <Text
        variant="subtitle1"
        fontWeight="400"
        textAlign="center"
        color="secondary"
      >
        {t('migrate.solana.subtitle2')}
      </Text>
    </Box>
  )
}

const HeliumItem = () => {
  const { t } = useTranslation()
  return (
    <Box
      justifyContent="center"
      alignItems="center"
      paddingTop="xl"
      paddingHorizontal="l"
    >
      <Box height={200} justifyContent="center" alignItems="center">
        <Image source={require('assets/images/heliumLogoLarge.png')} />
      </Box>
      <Text variant="h1" fontWeight="600" textAlign="center" fontSize={32}>
        {t('migrate.helium.title')}
      </Text>
      <Text
        variant="subtitle1"
        fontWeight="600"
        textAlign="center"
        color="primary"
        paddingVertical="l"
      >
        {t('migrate.helium.subtitle1')}
      </Text>
      <TextTransform
        variant="subtitle1"
        fontWeight="400"
        textAlign="center"
        color="secondary"
        i18nKey="migrate.helium.subtitle2"
      />
    </Box>
  )
}

const MigrationOnboard = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigation = useNavigation()
  const spacing = useSpacing()
  const colors = useColors()
  const [slideIndex, setSlideIndex] = useState(0)
  const [viewedSlides, setViewedSlides] = useState(false)
  const data = useMemo(() => [{ index: 0 }, { index: 1 }], [])

  const onSnapToItem = useCallback(
    (index: number) => {
      setSlideIndex(index)
      if (index === data.length - 1) {
        setViewedSlides(true)
      }
    },
    [data.length],
  )

  const renderItem = useCallback((event: { item: Item }) => {
    switch (event.item.index) {
      default:
      case 0:
        return <SolanaItem />
      case 1:
        return <HeliumItem />
    }
  }, [])

  const onMigrate = useCallback(() => {
    dispatch(appSlice.actions.setOnboarded(true))
    navigation.navigate('MainTabs', {
      screen: 'More',
    })
  }, [dispatch, navigation])

  return (
    <SafeAreaBox
      flex={1}
      justifyContent="center"
      alignItems="center"
      padding="l"
      backgroundColor="white"
    >
      <Carousel
        layout="default"
        vertical={false}
        data={data}
        renderItem={renderItem}
        sliderWidth={wp(100)}
        itemWidth={wp(100)}
        inactiveSlideScale={1}
        onSnapToItem={(i) => onSnapToItem(i)}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={slideIndex}
        dotStyle={{
          width: 6,
          height: 6,
          borderRadius: 3,
          marginHorizontal: spacing.xs,
          backgroundColor: colors.secondaryText,
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={1}
      />
      <Box flex={1} />
      <Button
        mode="contained"
        variant="primary"
        width="100%"
        marginBottom="s"
        disabled={!viewedSlides}
        onPress={onMigrate}
        title={t('migrate.action')}
      />
      <Button
        disabled={!viewedSlides}
        onPress={navigation.goBack}
        mode="text"
        variant="primary"
        title={t('migrate.skip')}
      />
    </SafeAreaBox>
  )
}

export default memo(MigrationOnboard)
