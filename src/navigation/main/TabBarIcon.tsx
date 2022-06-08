import React, { memo } from 'react'
import Cog from '@assets/images/cog.svg'
import Hotspot from '@assets/images/homeShortcut.svg'
import Support from '@assets/images/support.svg'
import HmDashboard from '@assets/images/hmDashboard.svg'
import Box from '../../components/Box'
import { MainTabType, TabBarIconType } from './tabTypes'
import { useColors } from '../../theme/themeHooks'

type Props = {
  name: MainTabType
} & TabBarIconType

const Icon = ({
  size,
  color,
  name,
}: {
  color: string
  size: number
  name: MainTabType
}) => {
  if (name === 'Hotspots') {
    return <Hotspot height={size} width={size} color={color} />
  }
  if (name === 'Support') {
    return <Support height={size} width={size} color={color} />
  }
  if (name === 'HmDashboard') {
    return <HmDashboard height={size} width={size} color={color} />
  }
  return <Cog color={color} height={size} width={size} />
}

const TabBarIcon = ({ name, focused, size }: Props) => {
  const { white, grayDark } = useColors()
  const color = focused ? white : grayDark

  return (
    <Box
      alignItems="center"
      flex={1}
      justifyContent="center"
      padding="xxxs"
      paddingTop="s"
    >
      <Icon size={size} color={color} name={name} />
    </Box>
  )
}

export default memo(TabBarIcon)
