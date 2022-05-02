export const supportedLangs = ["en"] as const;
export type LangType = typeof supportedLangs[number];

export const SUPPORTED_LANGUAGUES = [{ label: "English", value: "en" }] as {
  label: string;
  value: LangType;
}[];
