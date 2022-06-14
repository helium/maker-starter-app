import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import defaultScreenOptions from '../../navigation/defaultScreenOptions'
import HmDashboardScreen from './HmDashboardScreen'
import { HmDashboardStackParamList } from './hmDashboardTypes'

const HmDashboardStack = createStackNavigator<HmDashboardStackParamList>()

const HmDashboard = () => {
  return (
    <HmDashboardStack.Navigator
      headerMode="none"
      screenOptions={defaultScreenOptions}
    >
      <HmDashboardStack.Screen
        name="HmDashboardScreen"
        component={HmDashboardScreen}
      />
    </HmDashboardStack.Navigator>
  )
}

export default HmDashboard
