import { intlFormatDistance, startOfDay, subMilliseconds } from "date-fns"

export const getCutoffDate = (delta: number) =>
  startOfDay(subMilliseconds(new Date(), delta))

export const humanizeTimeFrame = (a: Date, b: Date = new Date()) =>
  intlFormatDistance(a, b)
