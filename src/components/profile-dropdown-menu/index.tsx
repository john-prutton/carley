import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

import { Button } from "../ui/button"
import { ProfileIcon } from "./profile-icon"
import { SignoutButton } from "./signout-button"

export function ProfileDropdownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className="size-fit p-0">
          <ProfileIcon className="animate-in zoom-in-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <SignoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
