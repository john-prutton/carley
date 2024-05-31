import { ProfileDropdownMenu } from "../profile-dropdown-menu"

export function Navbar() {
  return (
    <nav className="flex flex-row items-center justify-between rounded-b-xl border bg-white p-2 drop-shadow">
      <div className="flex flex-row items-center ">
        <span className="mr-1 scale-150 text-lg">🍍</span>
        <span className="scale-90 text-xl font-black leading-[100%]">
          Carley
        </span>
      </div>

      <ProfileDropdownMenu />
    </nav>
  )
}
