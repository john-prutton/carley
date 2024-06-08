export function urlFromBase(url: string) {
  return new URL(url, process.env.BASE_URL!)
}
