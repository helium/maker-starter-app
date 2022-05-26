import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import defaultScreenOptions from '../../navigation/defaultScreenOptions'
import SupportScreen from './SupportScreen'
import { SupportStackParamList } from './supportTypes'

const SupportStack = createStackNavigator<SupportStackParamList>()

const Support = () => {
  return (
    <SupportStack.Navigator
      headerMode="none"
      screenOptions={defaultScreenOptions}
    >
      <SupportStack.Screen name="SupportScreen" component={SupportScreen} />
    </SupportStack.Navigator>
  )
}

export default Support
