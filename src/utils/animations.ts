import { FadeIn, FadeOut } from 'react-native-reanimated'

export const EnterDelayedFade = FadeIn.delay(500).duration(500)
export const FadeInSlow = FadeIn.duration(1200)
export const FadeOutSlow = FadeOut.duration(1200)
export const DelayedFadeIn = FadeIn.delay(100).duration(700)
