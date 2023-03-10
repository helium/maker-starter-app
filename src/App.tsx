import { GestureHandlerRootView } from 'react-native-gesture-handler'
import React, { useEffect, useMemo, useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import {
  LogBox,
  Platform,
  StatusBar,
  UIManager,
  // useColorScheme,
} from 'react-native'
import useAppState from 'react-native-appstate-hook'
import { ThemeProvider } from '@shopify/restyle'
import Config from 'react-native-config'
import { useSelector } from 'react-redux'
import MapboxGL from '@react-native-mapbox-gl/maps'
import { useAsync } from 'react-async-hook'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import * as SplashScreen from 'expo-splash-screen'
import { NavigationContainer } from '@react-navigation/native'
import {
  HotspotBleProvider,
  OnboardingProvider,
  SolanaProvider,
} from '@helium/react-native-sdk'
import { theme, darkThemeColors } from './theme/theme'
import NavigationRoot from './navigation/NavigationRoot'
import { useAppDispatch } from './store/store'
import appSlice, { restoreAppSettings } from './store/user/appSlice'
import { RootState } from './store/rootReducer'
import SecurityScreen from './features/security/SecurityScreen'
import AppLinkProvider from './providers/AppLinkProvider'
import { navigationRef } from './navigation/navigator'
import useMount from './utils/useMount'
import { getAddress } from './utils/secureAccount'
import useCheckWalletLink from './utils/useCheckWalletLink'
import globalStyles from './theme/globalStyles'

SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
})

const App = () => {
  // const colorScheme = useColorScheme()

  useCheckWalletLink()

  if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true)
    }
  }

  LogBox.ignoreLogs([
    "Accessing the 'state' property of the 'route' object is not supported.",
    'Setting a timer',
    'Calling getNode() on the ref of an Animated component',
    'Native splash screen is already hidden',
    'No Native splash screen',
    'RCTBridge required dispatch_sync to load',
    'Require cycle',
    'new NativeEventEmitter',
    'EventEmitter.removeListener(',
    'Internal React error:',
  ])

  const { appState } = useAppState()
  const dispatch = useAppDispatch()

  const {
    lastIdle,
    isPinRequired,
    authInterval,
    isRestored,
    isRequestingPermission,
    isLocked,
  } = useSelector((state: RootState) => state.app)

  const { walletLinkToken } = useSelector((state: RootState) => state.app)
  const [heliumWallet, setHeliumWallet] = useState<string>()

  useEffect(() => {
    if (!walletLinkToken) {
      if (heliumWallet) {
        setHeliumWallet('')
      }
      return
    }

    getAddress().then(setHeliumWallet)
  }, [heliumWallet, walletLinkToken])

  useMount(() => {
    dispatch(restoreAppSettings())
  })

  useEffect(() => {
    MapboxGL.setAccessToken(Config.MAPBOX_ACCESS_TOKEN || '')
  }, [dispatch])

  // handle app state changes
  useEffect(() => {
    if (appState === 'background' && !isLocked) {
      dispatch(appSlice.actions.updateLastIdle())
      return
    }

    const isActive = appState === 'active'
    const now = Date.now()
    const expiration = now - authInterval
    const lastIdleExpired = lastIdle && expiration > lastIdle

    // pin is required and last idle is past user interval, lock the screen
    const shouldLock =
      isActive && isPinRequired && !isRequestingPermission && lastIdleExpired

    if (shouldLock) {
      dispatch(appSlice.actions.lock(true))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appState])

  // hide splash screen
  useAsync(async () => {
    if (isRestored) {
      await SplashScreen.hideAsync()
    }
  }, [isRestored])

  useEffect(() => {
    // Hide splash after 5 seconds, deal with the consequences?
    const timeout = setTimeout(() => {
      SplashScreen.hideAsync()
    }, 5000)
    return () => clearInterval(timeout)
  }, [dispatch])

  const colorAdaptedTheme = useMemo(
    () => ({
      ...theme,
      // colors: colorScheme === 'light' ? lightThemeColors : darkThemeColors,
      colors: darkThemeColors,
    }),
    [],
  )

  return (
    <GestureHandlerRootView style={globalStyles.container}>
      <SolanaProvider
        cluster="devnet"
        rpcEndpoint={Config.SOLANA_RPC_ENDPOINT || ''}
        heliumWallet={heliumWallet}
        solanaStatusOverride="complete"
      >
        <OnboardingProvider
          baseUrl={
            Config.ONBOARDING_BASE_URL ||
            'https://onboarding.web.test-helium.com/api'
          }
        >
          <HotspotBleProvider>
            <ThemeProvider theme={colorAdaptedTheme}>
              <BottomSheetModalProvider>
                <SafeAreaProvider>
                  {/* TODO: Will need to adapt status bar for light/dark modes */}
                  {Platform.OS === 'ios' && (
                    <StatusBar barStyle="light-content" />
                  )}
                  {Platform.OS === 'android' && (
                    <StatusBar translucent backgroundColor="transparent" />
                  )}
                  <NavigationContainer ref={navigationRef}>
                    <AppLinkProvider>
                      <NavigationRoot />
                    </AppLinkProvider>
                  </NavigationContainer>
                </SafeAreaProvider>
                <SecurityScreen
                  visible={appState !== 'active' && appState !== 'unknown'}
                />
              </BottomSheetModalProvider>
            </ThemeProvider>
          </HotspotBleProvider>
        </OnboardingProvider>
      </SolanaProvider>
    </GestureHandlerRootView>
  )
}

export default App
