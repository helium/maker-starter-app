import * as Haptics from "expo-haptics";

export type FeedbackStyle = "light" | "medium" | "heavy";
export type NotificationStyle = "success" | "warning" | "error";

const impactStyles: Record<string, Haptics.ImpactFeedbackStyle> = {
  light: Haptics.ImpactFeedbackStyle.Light,
  medium: Haptics.ImpactFeedbackStyle.Medium,
  heavy: Haptics.ImpactFeedbackStyle.Heavy,
};

const notificationStyles: Record<string, Haptics.NotificationFeedbackType> = {
  success: Haptics.NotificationFeedbackType.Success,
  warning: Haptics.NotificationFeedbackType.Warning,
  error: Haptics.NotificationFeedbackType.Error,
};

const useHaptic = () => {
  const triggerImpact = (feedbackStyle: FeedbackStyle = "medium") => {
    Haptics.impactAsync(impactStyles[feedbackStyle]);
  };

  const triggerNotification = (notificationStyle: NotificationStyle = "success") => {
    Haptics.notificationAsync(notificationStyles[notificationStyle]);
  };

  const triggerNavHaptic = () => {
    triggerImpact("light");
  };
  return { triggerImpact, triggerNotification, triggerNavHaptic };
};

export default useHaptic;
