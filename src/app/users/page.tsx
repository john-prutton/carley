import { getAllUsers } from "@/data-access/queries"

export default async function Page() {
  const users = await getAllUsers()

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.id}</li>
        ))}
      </ul>
    </div>
  )
}
