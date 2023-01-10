import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import defaultScreenOptions from '../../../navigation/defaultScreenOptions'
import HotspotsScreen from './HotspotsScreen'
import { HotspotStackParamList } from './hotspotTypes'
import HotspotScreen from './HotspotScreen'

const HotspotsStack = createStackNavigator<HotspotStackParamList>()

const Hotspots = () => {
  return (
    <HotspotsStack.Navigator
      headerMode="none"
      screenOptions={defaultScreenOptions}
    >
      <HotspotsStack.Screen name="HotspotsScreen" component={HotspotsScreen} />
      <HotspotsStack.Screen name="HotspotScreen" component={HotspotScreen} />
    </HotspotsStack.Navigator>
  )
}

export default Hotspots
