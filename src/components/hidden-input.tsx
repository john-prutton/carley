"use client"

import { useState } from "react"

import { LucideEye, LucideEyeOff } from "lucide-react"

import { Input, InputProps } from "./ui/input"
import { Toggle } from "./ui/toggle"

export function HiddenInput(props: InputProps) {
  const [pressed, setPressed] = useState(false)

  return (
    <div className="flex flex-row gap-1">
      <Input
        placeholder="********"
        {...props}
        type={pressed ? "text" : "password"}
      />
      <Toggle pressed={pressed} onPressedChange={setPressed}>
        {!pressed ? <LucideEye /> : <LucideEyeOff />}
      </Toggle>
    </div>
  )
}
