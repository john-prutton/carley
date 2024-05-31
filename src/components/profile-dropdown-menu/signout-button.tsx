"use client"

import { useState } from "react"

import { LucideLogOut } from "lucide-react"

import { Spinner } from "../spinner"
import { Button } from "../ui/button"
import { DropdownMenuItem } from "../ui/dropdown-menu"
import { trySignout } from "./actions"

export function SignoutButton() {
  const [pending, setPending] = useState(false)

  async function handleSignout(e: Event) {
    e.preventDefault()

    setPending(true)
    await trySignout()
    setPending(false)
  }

  return (
    <DropdownMenuItem onSelect={handleSignout} className="[all:unset]">
      <Button variant={"destructive"} size="sm" className="w-full">
        {!pending ? (
          <LucideLogOut className="mr-2" size={16} />
        ) : (
          <Spinner className="mr-2" size={16} />
        )}

        <span>Sign out</span>
      </Button>
    </DropdownMenuItem>
  )
}
