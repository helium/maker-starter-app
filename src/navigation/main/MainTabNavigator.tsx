import React, { useEffect, memo, useMemo, useCallback } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import Hotspots from '../../features/hotspots/root/HotspotsNavigator'
import { TabBarIconType, MainTabType, RootNavigationProp } from './tabTypes'
import TabBarIcon from './TabBarIcon'
import More from '../../features/moreTab/MoreNavigator'
import { RootState } from '../../store/rootReducer'
import { useColors } from '../../theme/themeHooks'
import { useAppDispatch } from '../../store/store'
import { wp } from '../../utils/layout'
import appSlice from '../../store/user/appSlice'

const MainTab = createBottomTabNavigator()

const MainTabs = () => {
  const { surfaceContrast } = useColors()
  const navigation = useNavigation<RootNavigationProp>()
  const {
    app: { isLocked, isSettingUpHotspot },
  } = useSelector((state: RootState) => state)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!isLocked) return
    navigation.navigate('LockScreen', { requestType: 'unlock', lock: true })
  }, [isLocked, navigation])

  useEffect(() => {
    if (!isSettingUpHotspot) return

    dispatch(appSlice.actions.startHotspotSetup())
    navigation.navigate('HotspotSetup')
  }, [isSettingUpHotspot, dispatch, navigation])

  const sceneContainerStyle = useMemo(
    () => ({
      opacity: isLocked ? 0 : 1,
    }),
    [isLocked],
  )

  const tabBarOptions = useMemo(
    () => ({
      showLabel: false,
      style: {
        backgroundColor: surfaceContrast,
        paddingHorizontal: wp(12),
      },
    }),
    [surfaceContrast],
  )

  const screenOptions = useCallback(
    ({ route }) => ({
      tabBarIcon: ({ focused, color, size }: TabBarIconType) => {
        return (
          <TabBarIcon
            name={route.name as MainTabType}
            focused={focused}
            color={color}
            size={Math.min(size, 22)}
          />
        )
      },
    }),
    [],
  )

  return (
    <MainTab.Navigator
      sceneContainerStyle={sceneContainerStyle}
      initialRouteName="Hotspots"
      tabBarOptions={tabBarOptions}
      screenOptions={screenOptions}
    >
      <MainTab.Screen name="Hotspots" component={Hotspots} />
      <MainTab.Screen name="More" component={More} />
    </MainTab.Navigator>
  )
}

export default memo(MainTabs)
