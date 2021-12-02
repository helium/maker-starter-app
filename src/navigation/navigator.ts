import React from 'react'
import { NavigationContainerRef } from '@react-navigation/native'
import { LockScreenRequestType } from './main/tabTypes'
import { AppLink, HotspotLink } from '../providers/appLinkTypes'

export const navigationRef = React.createRef<NavigationContainerRef>()

const lock = (params: {
  requestType: LockScreenRequestType
  scanResult: AppLink
}) => {
  navigationRef.current?.navigate('LockScreen', params)
}

const send = (params: { scanResult: AppLink }) => {
  navigationRef.current?.navigate('Send', params)
}

const viewHotspot = (address: string) => {
  navigationRef.current?.navigate('HotspotsScreen', {
    address,
    resource: 'hotspot',
  })
}

const viewValidator = (address: string) => {
  navigationRef.current?.navigate('HotspotsScreen', {
    address,
    resource: 'validator',
  })
}

const confirmAddGateway = (addGatewayTxn: string) => {
  const params = {
    addGatewayTxn,
  }

  navigationRef.current?.navigate('HotspotSetup', {
    screen: 'HotspotSetupExternalConfirmScreen',
    params,
  })
}

const submitGatewayTxns = (params: HotspotLink) => {
  navigationRef.current?.navigate('HotspotSetup', {
    screen: 'HotspotTxnsSubmitScreen',
    params,
  })
}

const goToMainTabs = () => {
  navigationRef.current?.navigate('MainTabs')
}

export default {
  lock,
  send,
  viewHotspot,
  viewValidator,
  confirmAddGateway,
  submitGatewayTxns,
  goToMainTabs,
}
