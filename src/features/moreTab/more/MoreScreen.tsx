/* eslint-disable */
// @ts-nocheck
import React, {
  Component,
  memo,
  ReactText,
  useCallback,
  useEffect,
  useMemo,
} from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, SectionList } from 'react-native'
import { useSelector } from 'react-redux'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { isEqual } from 'lodash'
import { Edge } from 'react-native-safe-area-context'
import { Account } from '@helium/react-native-sdk'
import { useAsync } from 'react-async-hook'
import SafeAreaBox from '../../../components/SafeAreaBox'
import Text from '../../../components/Text'
import { RootState } from '../../../store/rootReducer'
import { useAppDispatch } from '../../../store/store'
import appSlice from '../../../store/user/appSlice'
import { MoreNavigationProp, MoreStackParamList } from '../moreTypes'
import {
  RootNavigationProp,
  RootStackParamList,
} from '../../../navigation/main/tabTypes'
import MoreListItem, { MoreListItemType } from './MoreListItem'
import useAuthIntervals from './useAuthIntervals'
import { useSpacing } from '../../../theme/themeHooks'
import Box from '../../../components/Box'
import { SUPPORTED_LANGUAGUES } from '../../../utils/i18n/i18nTypes'
import { useLanguageContext } from '../../../providers/LanguageProvider'
import { getAddress, getMnemonic } from '../../../utils/secureAccount'
import useCopyText from '../../../utils/useCopyText'
import developerSlice from '../../../store/developer/developerSlice'
import ellipsizeAddress from '../../../utils/ellipsizeAddress'
import hotspotSlice from '../../../store/hotspot/hotspotSlice'

type Route = RouteProp<RootStackParamList & MoreStackParamList, 'MoreScreen'>
const MoreScreen = () => {
  const { t } = useTranslation()
  const { params } = useRoute<Route>()
  const dispatch = useAppDispatch()
  const app = useSelector((state: RootState) => state.app, isEqual)
  const devOptions = useSelector((state: RootState) => state.developer, isEqual)
  const authIntervals = useAuthIntervals()
  const navigation = useNavigation<MoreNavigationProp & RootNavigationProp>()
  const spacing = useSpacing()
  const { changeLanguage, language } = useLanguageContext()
  const { result: heliumAddress } = useAsync(getAddress, [])
  const { result: solanaAddress } = useAsync(() => {
    if (!heliumAddress) return
    return Account.heliumAddressToSolAddress(heliumAddress)
  }, [heliumAddress])

  const { result: mnemonic } = useAsync(getMnemonic, [])
  const copyText = useCopyText()

  useEffect(() => {
    // if devOptions change, clear the hotspot caches
    dispatch(hotspotSlice.actions.reset())
  }, [devOptions])

  useEffect(() => {
    if (!params?.pinVerifiedFor) return

    const { pinVerifiedFor } = params

    switch (pinVerifiedFor) {
      case 'disablePin':
        dispatch(appSlice.actions.disablePin())
        break
      case 'resetPin':
        navigation.push('AccountCreatePinScreen', { pinReset: true })
        break
      case 'revealWords':
        navigation.push('RevealWordsScreen')
        break
      case 'revealPrivateKey':
        navigation.push('RevealPrivateKeyScreen')
        break
    }
  }, [dispatch, params, navigation])

  const handleLanguageChange = useCallback(
    (lng: string) => {
      changeLanguage(lng)
    },
    [changeLanguage],
  )

  const handlePinRequired = useCallback(
    (value?: boolean) => {
      if (!app.isPinRequired && value) {
        // toggling on
        navigation.push('AccountCreatePinScreen', { pinReset: true })
      }

      if (app.isPinRequired && !value) {
        // toggling off, confirm pin before turning off
        navigation.push('LockScreen', { requestType: 'disablePin' })
      }
    },
    [app.isPinRequired, navigation],
  )

  const handleRevealWords = useCallback(() => {
    if (app.isPinRequired) {
      navigation.push('LockScreen', { requestType: 'revealWords' })
    } else {
      navigation.push('RevealWordsScreen')
    }
  }, [app.isPinRequired, navigation])

  const handleRevealPrivateKey = useCallback(() => {
    if (app.isPinRequired) {
      navigation.push('LockScreen', { requestType: 'revealPrivateKey' })
    } else {
      navigation.push('RevealPrivateKeyScreen')
    }
  }, [app.isPinRequired, navigation])

  const handleResetPin = useCallback(() => {
    navigation.push('LockScreen', { requestType: 'resetPin' })
  }, [navigation])

  const handleSignOut = useCallback(() => {
    const body = t(
      `more.sections.app.signOutAlert.${mnemonic ? 'bodyWithWords' : 'body'}`,
    )
    Alert.alert(t('more.sections.app.signOutAlert.title'), body, [
      {
        text: t('generic.cancel'),
        style: 'cancel',
      },
      {
        text: t('more.sections.app.signOut'),
        style: 'destructive',
        onPress: () => {
          dispatch(appSlice.actions.signOut())
        },
      },
    ])
  }, [t, dispatch, mnemonic])

  const handleCopyAddress = useCallback(
    (network: 'solana' | 'helium') => () => {
      if (!heliumAddress) return

      const addr =
        network === 'solana'
          ? Account.heliumAddressToSolAddress(heliumAddress)
          : heliumAddress

      copyText({
        message: ellipsizeAddress(addr),
        copyText: addr,
      })
    },
    [heliumAddress, copyText],
  )

  const handleIntervalSelected = useCallback(
    (value: ReactText) => {
      const number = typeof value === 'number' ? value : parseInt(value, 10)
      dispatch(appSlice.actions.updateAuthInterval(number))
    },
    [dispatch],
  )

  const SectionData = useMemo(() => {
    let pin: MoreListItemType[] = [
      {
        title: t('more.sections.security.enablePin'),
        onToggle: handlePinRequired,
        value: app.isPinRequired,
      },
    ]

    if (mnemonic) {
      pin = [
        ...pin,
        {
          title: t('more.sections.security.revealWords'),
          onPress: handleRevealWords,
        },
      ]
    }

    if (app.isPinRequired) {
      pin = [
        ...pin,
        {
          title: t('more.sections.security.requirePin'),
          value: app.authInterval || '',
          select: {
            items: authIntervals,
            onValueSelect: handleIntervalSelected,
          },
        },
        {
          title: t('more.sections.security.resetPin'),
          onPress: handleResetPin,
        },
      ]
    }

    let account: MoreListItemType = [
      {
        title: t('more.sections.account.copyHeliumAddress', {
          heliumAddress: heliumAddress && ellipsizeAddress(heliumAddress),
        }),
        onPress: handleCopyAddress('helium'),
      },
      {
        title: t('more.sections.account.copySolanaAddress', {
          solanaAddress: solanaAddress && ellipsizeAddress(solanaAddress),
        }),
        onPress: handleCopyAddress('solana'),
      },
    ]

    if (mnemonic) {
      account = [
        ...account,
        {
          title: t('more.sections.security.revealPrivateKey'),
          fontWeight: 'bold',
          onPress: handleRevealPrivateKey,
        },
      ]
    }

    const developer: MoreListItemType[] = [
      {
        title: t('more.sections.developer.enable'),
        onToggle: () =>
          dispatch(developerSlice.actions.toggleDeveloperPermission()),
        value: devOptions.enabled,
      },
    ]

    if (devOptions.enabled) {
      developer.push({
        title: t('more.sections.developer.forceSolana'),
        onToggle: () => dispatch(developerSlice.actions.toggleForceSolana()),
        value: devOptions.forceSolana,
      })

      if (devOptions.forceSolana || devOptions.status === 'complete') {
        developer.push({
          title: t('more.sections.developer.cluster'),
          value: devOptions.cluster,
          select: {
            items: [
              { label: 'mainnet-beta', value: 'mainnet-beta' },
              { label: 'devnet', value: 'devnet' },
            ],
            onValueSelect: (cluster: ReactText) => {
              dispatch(developerSlice.actions.changeCluster(cluster))
            },
          },
        })
      }

      developer.push({
        title: t('more.sections.developer.transitionStatus', {
          status: devOptions.status,
        }),
      })
    }

    return [
      {
        title: t('more.sections.account.title'),
        data: account,
      },
      {
        title: t('more.sections.security.title'),
        data: pin,
      },
      {
        title: t('more.sections.app.title'),
        data: [
          {
            title: t('more.sections.app.language'),
            value: language,
            select: {
              items: SUPPORTED_LANGUAGUES,
              onValueSelect: handleLanguageChange,
            },
          },
          {
            title: t('more.sections.app.signOut'),
            onPress: handleSignOut,
            destructive: true,
          },
        ] as MoreListItemType[],
      },
      {
        title: t('more.sections.developer.title'),
        data: developer,
      },
    ]
  }, [
    t,
    handlePinRequired,
    app.isPinRequired,
    app.authInterval,
    mnemonic,
    devOptions.enabled,
    devOptions.forceSolana,
    devOptions.status,
    devOptions.cluster,
    handleCopyAddress,
    language,
    handleLanguageChange,
    heliumAddress,
    handleSignOut,
    handleRevealWords,
    handleRevealPrivateKey,
    authIntervals,
    handleIntervalSelected,
    handleResetPin,
    dispatch,
  ])

  const contentContainer = useMemo(
    () => ({
      paddingHorizontal: spacing.m,
      paddingBottom: spacing.xxxl,
    }),
    [spacing.m, spacing.xxxl],
  )

  const renderItem = useCallback(
    ({
      item,
      index,
      section,
    }: {
      item: MoreListItemType
      index: number
      section: { data: [] }
    }) => (
      <MoreListItem
        item={item}
        isTop={index === 0}
        isBottom={index === section.data.length - 1}
      />
    ),
    [],
  )

  type Asdf = { section: { title: string; icon: Component } }
  const renderSectionHeader = useCallback(
    ({ section: { title, icon } }: Asdf) => (
      <Box
        flexDirection="row"
        alignItems="center"
        paddingTop="l"
        paddingBottom="s"
        paddingHorizontal="xs"
        backgroundColor="primaryBackground"
      >
        <>
          {icon !== undefined && icon}
          <Text variant="body1" marginLeft="s">
            {title}
          </Text>
        </>
      </Box>
    ),
    [],
  )

  const renderSectionFooter = useCallback(
    ({ section: { footer } }) => footer,
    [],
  )

  const keyExtractor = useCallback(
    (item: MoreListItemType, index: number) => item.title + index,
    [],
  )

  const edges = useMemo(() => ['left', 'right', 'top'] as Edge[], [])
  return (
    <SafeAreaBox backgroundColor="primaryBackground" flex={1} edges={edges}>
      <Text variant="h3" marginVertical="m" paddingHorizontal="l">
        {t('more.title')}
      </Text>
      <SectionList
        contentContainerStyle={contentContainer}
        sections={SectionData}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        renderSectionFooter={renderSectionFooter}
        initialNumToRender={100}
        // ^ Sometimes on initial page load there is a bug with SectionList
        // where it won't render all items right away. This seems to fix it.
      />
    </SafeAreaBox>
  )
}

export default memo(MoreScreen)
