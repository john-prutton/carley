import Link from "next/link"

import { ProfileDropdownMenu } from "../profile-dropdown-menu"

export function Navbar() {
  return (
    <nav className="flex flex-row items-center justify-between rounded-b-xl border border-t-transparent bg-white p-2 drop-shadow">
      <Link href={"/"} className="flex flex-row items-center ">
        <span className="mr-1 scale-150 text-lg">🍍</span>
        <span className="scale-90 text-xl font-black leading-[100%]">
          Carley
        </span>
      </Link>

      <ProfileDropdownMenu />
    </nav>
  )
}
