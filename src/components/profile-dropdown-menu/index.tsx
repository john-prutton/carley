import Link from "next/link"

import { LucideHelpCircle } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
      <DropdownMenuContent className="flex translate-y-2 flex-col gap-2">
        <DropdownMenuItem asChild>
          <Button asChild variant={"secondary"} size="sm" className="w-full">
            <Link href="https://youtu.be/gj-Z_B9WII4" target="_blank">
              <LucideHelpCircle className="mr-2" size={16} />
              Demo Video
            </Link>
          </Button>
        </DropdownMenuItem>

        <SignoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
