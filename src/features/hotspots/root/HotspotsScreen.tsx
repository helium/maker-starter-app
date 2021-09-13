import React, { memo, useCallback } from 'react'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import AddIcon from '@assets/images/add.svg'
import Box from '../../../components/Box'
import Text from '../../../components/Text'
import Button from '../../../components/Button'
import { RootNavigationProp } from '../../../navigation/main/tabTypes'
import { useColors } from '../../../theme/themeHooks'

const HotspotsScreen = () => {
  const { t } = useTranslation()
  const navigation = useNavigation<RootNavigationProp>()
  const { secondary } = useColors()

  const goToSetup = useCallback(() => navigation.push('HotspotSetup'), [
    navigation,
  ])

  return (
    <Box backgroundColor="primaryBackground" flex={1}>
      <BottomSheetModalProvider>
        <Box
          padding="l"
          flex={1}
          justifyContent="center"
          backgroundColor="primaryBackground"
        >
          <Text variant="h1">{t('hotspots.empty.title')}</Text>
          <Text variant="body1" marginTop="ms">
            {t('hotspots.empty.body')}
          </Text>
          <Button
            onPress={goToSetup}
            height={48}
            backgroundColor="white"
            marginTop="l"
            color="secondary"
            textVariant="body1"
            mode="contained"
            title={t('hotspots.empty.hotspots.add')}
            icon={<AddIcon color={secondary} height={10} />}
          />
        </Box>
      </BottomSheetModalProvider>
    </Box>
  )
}

export default memo(HotspotsScreen)
