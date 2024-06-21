import { intlFormatDistance } from "date-fns/intlFormatDistance"
import { startOfDay } from "date-fns/startOfDay"
import { subMilliseconds } from "date-fns/subMilliseconds"

export const getCutoffDate = (delta: number) =>
  startOfDay(subMilliseconds(new Date(), delta))

export const humanizeTimeFrame = (a: Date, b: Date = new Date()) =>
  intlFormatDistance(a, b)
