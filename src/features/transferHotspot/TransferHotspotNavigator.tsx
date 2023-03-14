import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import defaultScreenOptions from '../../navigation/defaultScreenOptions'
import HotspotTxnsSubmitScreen from '../hotspots/setup/HotspotTxnsSubmitScreen'
import TransferHotspot from './TransferHotspot'

const TransferHotspotStack = createStackNavigator()

const Transfer = () => {
  return (
    <TransferHotspotStack.Navigator
      headerMode="none"
      screenOptions={{ ...defaultScreenOptions }}
    >
      <TransferHotspotStack.Screen
        name="TransferHotspotScreen"
        component={TransferHotspot}
      />
      <TransferHotspotStack.Screen
        name="HotspotTxnsSubmitScreen"
        component={HotspotTxnsSubmitScreen}
      />
    </TransferHotspotStack.Navigator>
  )
}

export default Transfer
