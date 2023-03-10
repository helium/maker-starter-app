import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import animalName from 'angry-purple-tiger'
import Address from '@helium/address'
import Text from '../../../components/Text'
import BackButton from '../../../components/BackButton'
import SafeAreaBox from '../../../components/SafeAreaBox'
import TextInput from '../../../components/TextInput'
import Button from '../../../components/Button'
import { HotspotAssertNavigationProp } from './HotspotAssertTypes'

const HotspotAssertAddressScreen = () => {
  const navigation = useNavigation<HotspotAssertNavigationProp>()
  const { t } = useTranslation()

  const [hotspotAddress, setHotspotAddress] = useState('')
  const [gatewayName, setGatewayName] = useState('')

  useEffect(() => {
    if (!Address.isValid(hotspotAddress)) {
      setGatewayName('')
      return
    }

    setGatewayName(animalName(hotspotAddress))
  }, [hotspotAddress])

  const disabled = useMemo(() => {
    return !Address.isValid(hotspotAddress)
  }, [hotspotAddress])

  const onSubmit = useCallback(() => {
    navigation.navigate('HotspotSetupPickLocationScreen', {
      hotspotAddress,
      hotspotType: 'Helium',
      addGatewayTxn: '',
    })
  }, [hotspotAddress, navigation])

  return (
    <SafeAreaBox
      backgroundColor="primaryBackground"
      flex={1}
      paddingHorizontal="m"
    >
      <BackButton
        marginHorizontal="n_lx"
        onPress={navigation.goBack}
        marginBottom="l"
      />
      <Text variant="h1" marginBottom="l">
        {t('hotspotAssertAddress.title')}
      </Text>
      <Text variant="body1" marginBottom="l">
        {gatewayName}
      </Text>
      <TextInput
        borderRadius="s"
        padding="s"
        marginBottom="m"
        backgroundColor="white"
        onChangeText={setHotspotAddress}
        value={hotspotAddress}
        placeholderTextColor="black"
        placeholder={t('hotspotAssertAddress.enterHotspot')}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
        multiline
        numberOfLines={2}
        variant="regular"
      />
      <Button
        title={t('generic.next')}
        mode="contained"
        marginVertical="l"
        height={48}
        disabled={disabled}
        onPress={onSubmit}
      />
    </SafeAreaBox>
  )
}

export default HotspotAssertAddressScreen
