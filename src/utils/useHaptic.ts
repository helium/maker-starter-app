import {
  impactAsync,
  notificationAsync,
  ImpactFeedbackStyle,
  NotificationFeedbackType,
} from "expo-haptics";

export type FeedbackStyle = "light" | "medium" | "heavy";
export type NotificationStyle = "success" | "warning" | "error";

const impactStyles: Record<string, ImpactFeedbackStyle> = {
  light: ImpactFeedbackStyle.Light,
  medium: ImpactFeedbackStyle.Medium,
  heavy: ImpactFeedbackStyle.Heavy,
};

const notificationStyles: Record<string, NotificationFeedbackType> = {
  success: NotificationFeedbackType.Success,
  warning: NotificationFeedbackType.Warning,
  error: NotificationFeedbackType.Error,
};

const useHaptic = () => {
  const triggerImpact = (feedbackStyle: FeedbackStyle = "medium") => {
    impactAsync(impactStyles[feedbackStyle]);
  };

  const triggerNotification = (notificationStyle: NotificationStyle = "success") => {
    notificationAsync(notificationStyles[notificationStyle]);
  };

  const triggerNavHaptic = () => {
    triggerImpact("light");
  };
  return { triggerImpact, triggerNotification, triggerNavHaptic };
};

export default useHaptic;
