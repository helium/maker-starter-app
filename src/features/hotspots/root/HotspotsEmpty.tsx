import React, { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import AddIcon from '@assets/images/add.svg'
import Box from '../../../components/Box'
import Text from '../../../components/Text'
import Button from '../../../components/Button'
import { RootNavigationProp } from '../../../navigation/main/tabTypes'
import Fade from '../../../components/Fade'

const HotspotsEmpty = () => {
  const { t } = useTranslation()
  const navigation = useNavigation<RootNavigationProp>()

  const addHotspot = useCallback(
    () => navigation.push('HotspotSetup'),
    [navigation],
  )

  return (
    <Fade>
      <Box
        padding="l"
        flex={1}
        justifyContent="center"
        backgroundColor="primaryBackground"
      >
        <Text variant="h2">{t('hotspots.empty.title')}</Text>
        <Button
          onPress={addHotspot}
          height={48}
          marginTop="l"
          mode="contained"
          title={t('hotspots.empty.hotspots.add')}
          Icon={AddIcon}
        />
      </Box>
    </Fade>
  )
}

export default memo(HotspotsEmpty)
