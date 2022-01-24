import {
  Alert,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import HeliumActionSheet from './HeliumActionSheet'
import Box from './Box'
import Text from './Text'
import TouchableOpacityBox from './TouchableOpacityBox'
import InfoIcon from '../assets/images/info-hollow.svg'
import { decimalSeparator, groupSeparator, locale } from '../i18n'
import { useColors } from '../theme/themeHooks'
import { Antenna, defaultAntenna } from '../types/Antenna'

type Props = {
  onAntennaUpdated: (antenna: Antenna) => void
  onGainUpdated: (gain: number) => void
  onElevationUpdated: (elevation: number) => void
  selectedAntenna?: Antenna
  outline?: boolean
}
const HotspotConfigurationPicker = ({
  selectedAntenna,
  onAntennaUpdated,
  onGainUpdated,
  onElevationUpdated,
  outline,
}: Props) => {
  const { t } = useTranslation()
  const colors = useColors()

  const gainInputRef = useRef<TextInput | null>(null)
  const elevationInputRef = useRef<TextInput | null>(null)

  const [gain, setGain] = useState<string | undefined>(
    selectedAntenna
      ? selectedAntenna.gain.toLocaleString(locale, {
          maximumFractionDigits: 1,
          minimumFractionDigits: 1,
        })
      : undefined,
  )

  const antennas = useMemo(
    () => [
      {
        ...defaultAntenna,
        label: defaultAntenna.name,
        value: defaultAntenna.name,
      },
    ],
    [],
  )

  const onSelectAntenna = (_value: string | number, index: number) => {
    const antenna = antennas[index]
    onAntennaUpdated(antenna)
    onGainUpdated(antenna.gain)
    setGain(
      antenna.gain.toLocaleString(locale, {
        maximumFractionDigits: 1,
        minimumFractionDigits: 1,
      }),
    )
  }

  const showElevationInfo = () =>
    Alert.alert(
      t('antennas.elevation_info.title'),
      t('antennas.elevation_info.desc'),
    )
  const showGainInfo = () =>
    Alert.alert(t('antennas.gain_info.title'), t('antennas.gain_info.desc'))

  const focusGain = () => {
    gainInputRef.current?.focus()
  }
  const focusElevation = () => {
    elevationInputRef.current?.focus()
  }

  const onChangeGain = (text: string) => setGain(text)
  const onDoneEditingGain = () => {
    let gainFloat = gain
      ? parseFloat(
          gain.replace(groupSeparator, '').replace(decimalSeparator, '.'),
        )
      : 0
    let gainString
    if (!gainFloat || gainFloat <= 1) {
      gainString = '1'
    } else if (gainFloat >= 15) {
      gainString = '15'
      gainFloat = 15
    } else {
      gainString = gainFloat.toLocaleString(locale, {
        maximumFractionDigits: 1,
      })
    }
    setGain(gainString)
    onGainUpdated(gainFloat)
  }

  const onChangeElevation = (text: string) => {
    const elevationInteger = text
      ? parseInt(
          text.replace(groupSeparator, '').replace(decimalSeparator, '.'),
          10,
        )
      : 0
    let stringElevation
    if (!elevationInteger) {
      stringElevation = '0'
    } else {
      stringElevation = elevationInteger.toString()
    }
    onElevationUpdated(parseInt(stringElevation, 10))
  }

  useEffect(() => {
    if (selectedAntenna) {
      setGain(
        selectedAntenna.gain.toLocaleString(locale, {
          maximumFractionDigits: 1,
          minimumFractionDigits: 1,
        }),
      )
    }
  }, [selectedAntenna])

  return (
    <Box
      backgroundColor="surfaceSecondary"
      borderRadius="m"
      marginVertical="l"
      borderWidth={outline ? 1 : 0}
      borderColor="primary"
    >
      <HeliumActionSheet
        title={t('antennas.onboarding.select')}
        textProps={{ variant: 'body1', fontSize: 16, color: 'boneBlack' }}
        initialValue={t('antennas.onboarding.select')}
        data={antennas}
        iconColor="boneBlack"
        selectedValue={selectedAntenna?.name}
        onValueSelected={onSelectAntenna}
        buttonProps={{ justifyContent: 'space-between' }}
        padding="m"
        paddingVertical="lm"
        maxModalHeight={700}
      />
      <Box backgroundColor="primary" height={1} />
      <TouchableWithoutFeedback onPress={focusGain}>
        <Box
          padding="m"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box flexDirection="row" alignItems="center">
            <Text color="surfaceSecondaryText" marginRight="xs">
              {t('antennas.onboarding.gain')}
            </Text>
            <TouchableOpacityBox onPress={showGainInfo} padding="xs">
              <InfoIcon color={colors.primary} />
            </TouchableOpacityBox>
          </Box>
          <Box
            flexDirection="row"
            alignItems="center"
            visible={gain !== undefined}
          >
            <TextInput
              style={styles.textInput}
              ref={gainInputRef}
              keyboardType="numeric"
              value={gain}
              returnKeyType="done"
              onChangeText={onChangeGain}
              onEndEditing={onDoneEditingGain}
              editable={selectedAntenna?.name === 'Custom Antenna'}
            />
            <Text marginLeft="xxs">{t('antennas.onboarding.dbi')}</Text>
          </Box>
        </Box>
      </TouchableWithoutFeedback>
      <Box backgroundColor="primary" height={1} />
      <TouchableWithoutFeedback onPress={focusElevation}>
        <Box
          padding="m"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box flexDirection="row" alignItems="center">
            <Text color="surfaceSecondaryText" marginRight="xs">
              {t('antennas.onboarding.elevation')}
            </Text>
            <TouchableOpacityBox onPress={showElevationInfo} padding="xs">
              <InfoIcon color={colors.primary} />
            </TouchableOpacityBox>
          </Box>
          <TextInput
            ref={elevationInputRef}
            placeholder="0"
            keyboardType="numeric"
            returnKeyType="done"
            onChangeText={onChangeElevation}
          />
        </Box>
      </TouchableWithoutFeedback>
    </Box>
  )
}

const styles = StyleSheet.create({ textInput: { color: 'boneBlack' } })

export default HotspotConfigurationPicker
