"use client"

import { useState } from "react"

import { LucideEye, LucideEyeOff } from "lucide-react"

import { Input, InputProps } from "./ui/input"
import { Toggle } from "./ui/toggle"

export function HiddenInput(props: InputProps) {
  const [pressed, setPressed] = useState(false)

  return (
    <div className="relative">
      <Input
        placeholder="********"
        {...props}
        type={pressed ? "text" : "password"}
      />
      <Toggle
        pressed={pressed}
        onPressedChange={setPressed}
        className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground"
        tabIndex={-1}
      >
        {!pressed ? <LucideEye /> : <LucideEyeOff />}
      </Toggle>
    </div>
  )
}
