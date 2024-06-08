import { Cookie } from "lucia"

import "server-only"

export * from "./sign-in"
export * from "./sign-up"

export type AuthActionSignature<TInputs, TDependencies> = (
  inputs: TInputs,
  dependencies?: TDependencies
) => Promise<Cookie>
