import { trySignup } from "./actions"

export default async function Page({
  searchParams: { error }
}: {
  searchParams: { error?: string }
}) {
  return (
    <div>
      <h1>Login</h1>
      {error && <p className="rounded bg-red-200 text-red-500">{error}</p>}
      <form action={trySignup}>
        <label>
          Username
          <input type="text" name="username" />
        </label>
        <label>
          Password
          <input type="password" name="password" />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
